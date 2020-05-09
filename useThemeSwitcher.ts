import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEventHandler,
} from "react"

const useThemeSwitcher = (
  initialState: boolean = false
): [boolean, ChangeEventHandler<HTMLInputElement>] => {
  const [enabled, setEnabled] = useState(initialState)

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : null

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme)

      if (currentTheme === "dark") {
        setEnabled(true)
      }
    }
  }, [])

  const onChange = useCallback(e => {
    setEnabled(e.target.checked)

    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
    }
  }, [])

  return [enabled, onChange]
}
