import { Button } from "@/web/components/ui/button";
import { ModeToggle } from "@/web/components/ui/mode-toggle";
import { SearchInput } from "@/web/components/ui/search-input";
import useCounter from "@/web/stores/useCounter";

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
