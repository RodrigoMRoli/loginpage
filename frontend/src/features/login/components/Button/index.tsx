import { useContext } from "react"
import { ThemeContext, oppositeTheme } from "../../../shared/context/ThemeContext"

interface AttButton extends Properties {
    type: "button" | "submit" | "reset" | undefined
}

export default function Button(props:AttButton) {
    const {theme} = useContext(ThemeContext) as ThemeContextValue
    return (
        <button type={ props.type } className={`btn btn-${oppositeTheme(theme)} btn-outline-${theme} w-100`}>{ props.value?.toLocaleUpperCase() }</button>
    )
}