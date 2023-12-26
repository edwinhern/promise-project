import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SearchInput } from "@/components/ui/search-input";
import useCounter from "@/stores/useCounter";

export function HomePage() {
  const { count, increase, decrease } = useCounter();

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-red-500">{count}</h2>
        <div className="flex flex-row gap-4">
          <Button onClick={increase}>Increase</Button>
          <Button variant={"outline"} onClick={decrease}>
            Decrease
          </Button>
          <ModeToggle />
        </div>
        <SearchInput aria-placeholder="search" />
      </div>
    </>
  );
}
