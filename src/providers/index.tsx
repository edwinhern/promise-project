import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";

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
