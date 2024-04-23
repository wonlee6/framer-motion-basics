import { motion } from "framer-motion"
import { useState } from "react"

export default function ToggleButton() {
  const [isOn, setIsOn] = useState(false)
  const toggleSwitch = () => setIsOn(!isOn)

  return (
    <>
      <div className='switch' data-isOn={isOn} onClick={toggleSwitch}>
        <motion.div className='handle' layout transition={spring} />
      </div>
    </>
  )
}

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
}
