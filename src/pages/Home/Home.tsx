import { ModeToggle } from "@/components/ui/mode-toggle";

export function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2>Hello from Edwin!</h2>
      <ModeToggle />
    </div>
  );
}
