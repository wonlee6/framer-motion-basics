import "primereact/resources/themes/lara-light-indigo/theme.css" //theme
import "primereact/resources/primereact.min.css" //core css
// import "primeicons/primeicons.css" //icons
import { motion, useCycle } from "framer-motion"
import { useRef, useState } from "react"
import useTheme from "./useTheme"
import { useDimensions } from "./useDimensions"
import { Navigation } from "./navigation"
import { MenuToggle } from "./menuToggle"
import Drag from "./drag"
import Choice from "./choice"
import Card from "./card"
import Scroll from "./scroll"
import ToggleButton from "./toggle-button"

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
}

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const { handleDarkMode } = useTheme()

  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  return (
    <div className='flex h-screen flex-col gap-10 overflow-x-hidden'>
      <motion.nav
        className='absolute bottom-0 left-0 top-0 w-[300px]'
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        <motion.div
          className='absolute bottom-0 left-0 top-0 w-[300px] bg-white'
          variants={sidebar}
        />
        <Navigation />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
      <div className='flex justify-center p-4'>
        <CustomButton
          label={theme}
          onClick={() => {
            handleDarkMode()
            setTheme(theme === "dark" ? "light" : "dark")
          }}
        />
        <CustomButton label={count + ""} onClick={() => setCount(count + 1)} />
      </div>
      <section className='grid grid-cols-3 gap-10 p-10'>
        <div className='flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800'>
          <motion.div
            key={count}
            className='h-[200px] w-[200px] rounded-full bg-red-400'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        </div>
        <div className='flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800'>
          <motion.div
            className='h-[200px] w-[200px] rounded-full bg-yellow-300'
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ["0%", "0%", "50%", "50%", "0%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        </div>
        <div className='flex aspect-square items-center justify-center gap-10 rounded-lg bg-gradient-to-b from-pink-400 to-violet-400'>
          <motion.div
            className='h-[200px] w-[200px] rounded-xl bg-white'
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        </div>
        <div className='relative flex aspect-square items-center justify-center gap-10 rounded-lg bg-gradient-to-r from-yellow-400/80 to-lime-700'>
          <div className='example-container'>
            <Drag key={count} />
          </div>
        </div>
        <div className='flex aspect-square items-center justify-center gap-10 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500'>
          <Choice />
        </div>
        <div
          key={count}
          className='flex aspect-square h-[23rem] flex-col items-center justify-center rounded-lg bg-slate-800'
        >
          <div className='relative w-full overflow-y-auto pb-[100px]'>
            {food.map(([emoji, hueA, hueB]) => (
              <Card emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
            ))}
          </div>
        </div>
        <div className='relative aspect-square h-full flex-col items-center justify-center bg-yellow-50'>
          <Scroll />
        </div>
        <div className='flex aspect-square h-full items-center justify-center bg-gradient-to-r from-violet-300 to-orange-200'>
          <ToggleButton />
        </div>
      </section>
    </div>
  )
}

export default App

const food: [string, number, number][] = [
  ["🍅", 340, 10],
  ["🍊", 20, 40],
  ["🍋", 60, 90],
  ["🍐", 80, 120],
  ["🍏", 100, 140],
  ["🫐", 205, 245],
  ["🍆", 260, 290],
  ["🍇", 290, 320],
]

type Button = {
  label?: string
  onClick?: () => void
}

function CustomButton(props: Button) {
  return (
    <button
      onClick={props.onClick}
      className='rounded-md bg-[#06b6d4] px-5 py-3 text-base text-white outline-none hover:opacity-90'
      type='button'
    >
      <span className='flex-auto font-bold transition duration-200'>{props.label}</span>
    </button>
  )
}
