import { Toaster } from "@/web/components/ui/toaster";
import { ThemeProvider } from "@/web/providers/theme-provider";

export const Providers: React.FC<ChildProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {children}
        <Toaster />
      </ThemeProvider>
    </>
  );
};
