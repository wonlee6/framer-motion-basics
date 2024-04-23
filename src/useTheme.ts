import { useCallback, useLayoutEffect } from "react"

const useTheme = () => {
    const handleDarkMode = useCallback(() => {
        const theme = localStorage.getItem("theme")
        if (
          theme === "dark" ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          localStorage.setItem("theme", "light")
          document.documentElement.classList.remove("dark")
        } else {
          localStorage.setItem("theme", "dark")
          document.documentElement.classList.add("dark")
        }
      }, [])
    
      useLayoutEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme === "dark") {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }, [])

      return {
        handleDarkMode
      }
}

export default useTheme