interface ParentNodeProps {
    showForm?: boolean;
    children: ReactNode; // Allow any JSX/TSX as children
}

interface ThemeContextValue {
    theme: string;
    toggleTheme: () => void;
}