import { useContext } from 'react'
import { ThemeContext, oppositeTheme } from "../../context/ThemeContext"

export default function Lights() {
    const {theme, toggleTheme} = useContext(ThemeContext) as ThemeContextValue

    return (
        <div className="fixed-top">
            <button type="button" className={`btn btn-sm ${theme === "light" ? "btn-dark" : "btn-light"}`} onClick={() => {
                toggleTheme()
            }}> {oppositeTheme(theme).toUpperCase()} MODE </button>
        </div>
    )
}