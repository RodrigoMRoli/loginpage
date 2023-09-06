import { createContext, useEffect, useState } from "react";

export function oppositeTheme(theme: string): string {
    return theme === "light" ? "dark" : "light"
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export const ThemeProvider = ({ children }: ParentNodeProps) => {
    const currentTheme = localStorage.getItem("hp-bs-theme") ?? "light"
    const html = document.querySelector("html") as HTMLElement
    const [theme, setTheme] = useState(currentTheme)
    useEffect(() => {
        html.setAttribute("data-bs-theme", currentTheme)
    }, [])

    const toggleTheme = () => {
        const theme = currentTheme === "light" ? "dark" : "light"
        html.setAttribute("data-bs-theme", theme)
        localStorage.setItem("hp-bs-theme", theme)
        setTheme(theme);
    }

    const contextValue: ThemeContextValue = {
        theme,
        toggleTheme
    }

    return (
        <ThemeContext.Provider value={ contextValue }>
            { children }
        </ThemeContext.Provider>
    )
}