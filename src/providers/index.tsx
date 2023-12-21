import { ThemeProvider } from "@/providers/theme-provider"
import { ChildProp } from "@/types/common"

export const Providers: React.FC<ChildProp> = ({ children }) => {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </>
  )
}
