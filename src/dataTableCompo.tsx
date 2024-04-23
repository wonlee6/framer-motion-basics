import { useState, useEffect, useRef } from "react"
import {
  DataTable,
  DataTableExpandedRows,
  DataTableRowEvent,
  DataTableValueArray,
} from "primereact/datatable"
import { Column } from "primereact/column"
import { Rating } from "primereact/rating"
import { Button } from "primereact/button"
import { Tag } from "primereact/tag"
import { Toast } from "primereact/toast"
import { ProductService } from "./data"

interface Order {
  id: string
  productCode: string
  date: string
  amount: number
  quantity: number
  customer: string
  status: string
  orders?: Order[]
}

interface Product {
  id: string
  code: string
  name: string
  description: string
  image: string
  price: number
  category: string
  quantity: number
  inventoryStatus: string
  rating: number
  orders?: Order[]
}

export default function RowExpansionDemo() {
  const [products, setProducts] = useState<Product[]>([])
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined)
  const toast = useRef<Toast>(null)

  useEffect(() => {
    // setProducts(ProductService.getCustomData())
    ProductService.getProductsWithOrdersSmall().then((data) => setProducts(data))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onRowExpand = (event: DataTableRowEvent) => {
    toast.current?.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    })
  }

  const onRowCollapse = (event: DataTableRowEvent) => {
    toast.current?.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
      life: 3000,
    })
  }

  const expandAll = () => {
    const _expandedRows: DataTableExpandedRows = {}

    products.forEach((p) => (_expandedRows[`${p.id}`] = true))

    setExpandedRows(_expandedRows)
  }

  const collapseAll = () => {
    setExpandedRows(undefined)
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", { style: "currency", currency: "USD" })
  }

  const amountBodyTemplate = (rowData: Order) => {
    return formatCurrency(rowData.amount)
  }

  const statusOrderBodyTemplate = (rowData: Order) => {
    return (
      <Tag
        value={rowData.status.toLowerCase()}
        severity={getOrderSeverity(rowData)}
      ></Tag>
    )
  }

  const searchBodyTemplate = () => {
    return <Button icon='pi pi-search' />
  }

  const imageBodyTemplate = (rowData: Product) => {
    return (
      <img
        src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`}
        alt={rowData.image}
        width='64px'
        className='shadow-4'
      />
    )
  }

  const priceBodyTemplate = (rowData: Product) => {
    return formatCurrency(rowData.price)
  }

  const ratingBodyTemplate = (rowData: Product) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />
  }

  const statusBodyTemplate = (rowData: Product) => {
    return (
      <Tag value={rowData.inventoryStatus} severity={getProductSeverity(rowData)}></Tag>
    )
  }

  const getProductSeverity = (product: Product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success"

      case "LOWSTOCK":
        return "warning"

      case "OUTOFSTOCK":
        return "danger"

      default:
        return null
    }
  }

  const getOrderSeverity = (order: Order) => {
    switch (order.status) {
      case "DELIVERED":
        return "success"

      case "CANCELLED":
        return "danger"

      case "PENDING":
        return "warning"

      case "RETURNED":
        return "info"

      default:
        return null
    }
  }

  const allowExpansion = (rowData: Product) => {
    if (!rowData.orders || rowData.orders.length === 0) {
      return false
    }
    return rowData.orders.length > 0
  }

  const rowExpansionTemplate = (data: any) => {
    return (
      <div className='p-3'>
        <DataTable
          dataKey='id'
          value={data.orders}
          rowExpansionTemplate={rowExpansionTemplate}
          // expandableRowGroups
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          // onRowExpand={onRowExpand}
          // onRowCollapse={onRowCollapse}
        >
          <Column expander={allowExpansion} style={{ width: "5rem" }} />
          <Column field='id' header='Id' sortable></Column>
          <Column field='customer' header='Customer' sortable></Column>
          <Column field='date' header='Date' sortable></Column>
          <Column
            field='amount'
            header='Amount'
            body={amountBodyTemplate}
            sortable
          ></Column>
          <Column
            field='status'
            header='Status'
            body={statusOrderBodyTemplate}
            sortable
          ></Column>
          <Column headerStyle={{ width: "4rem" }} body={searchBodyTemplate}></Column>
        </DataTable>
      </div>
    )
  }

  const header = (
    <div className='justify-content-end flex flex-wrap gap-2'>
      <Button icon='pi pi-plus' label='Expand All' onClick={expandAll} text />
      <Button icon='pi pi-minus' label='Collapse All' onClick={collapseAll} text />
    </div>
  )

  return (
    <div className='card'>
      <Toast ref={toast} />
      <DataTable
        value={products}
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
        onRowExpand={onRowExpand}
        onRowCollapse={onRowCollapse}
        rowExpansionTemplate={rowExpansionTemplate}
        dataKey='id'
        header={header}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column expander={allowExpansion} style={{ width: "5rem" }} />
        <Column field='name' header='Name' sortable />
        <Column header='Image' body={imageBodyTemplate} />
        <Column field='price' header='Price' sortable body={priceBodyTemplate} />
        <Column field='category' header='Category' sortable />
        <Column field='rating' header='Reviews' sortable body={ratingBodyTemplate} />
        <Column
          field='inventoryStatus'
          header='Status'
          sortable
          body={statusBodyTemplate}
        />
      </DataTable>
    </div>
  )
}
