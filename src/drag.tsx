import { useRef } from "react"
import { motion } from "framer-motion"

export default function Drag() {
  const constraintsRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)

  return (
    <>
      <motion.div className='drag-area' ref={constraintsRef} />
      <motion.div drag dragConstraints={constraintsRef} />
    </>
  )
}
