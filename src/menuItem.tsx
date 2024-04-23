import { motion } from "framer-motion"

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"]

export const MenuItem = ({ i }) => {
  const style = { border: `2px solid ${colors[i]}` }
  return (
    <motion.li
      className='mb-5 flex cursor-pointer items-center'
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className='mr-5 flex h-[40px] w-[40px] flex-shrink-0 flex-grow-[40px] rounded-full'
        style={style}
      />
      <div className='h-[20px] w-[200px] flex-1 rounded-md' style={style} />
    </motion.li>
  )
}
