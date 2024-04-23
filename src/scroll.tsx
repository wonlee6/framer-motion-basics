import { motion, useScroll, useSpring } from "framer-motion"
import { LoremIpsum } from "./LoremIpsum"
import { useRef } from "react"

export default function Scroll() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ container: ref })
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  return (
    <div ref={ref} className='relative h-full w-full overflow-y-auto'>
      <motion.div className='progress-bar' style={{ scaleX }} />
      <h1>
        <code>useScroll</code> with spring smoothing
      </h1>
      <LoremIpsum />
    </div>
  )
}
