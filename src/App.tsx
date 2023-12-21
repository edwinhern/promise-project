import { ModeToggle } from "./components/ui/mode-toggle";

function App() {
  return (
    <>
      <div className="flex h-screen flex-row items-center justify-center gap-4">
        <h2 className="text-red-500">hello world!</h2>
        <ModeToggle />
      </div>
    </>
  );
}

export default App;
