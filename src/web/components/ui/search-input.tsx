import { cn } from "@/web/lib/utils";

import { Input } from "./input";
import { toast } from "./use-toast";

interface SearchProps extends React.HTMLAttributes<HTMLFormElement> {}

export function SearchInput({ className, ...props }: SearchProps) {
  function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    return toast({
      title: "Not implemented",
      description: "We're still working on the search.",
    });
  }

  return (
    <form onSubmit={onSubmit} className={cn(className)} {...props}>
      <Input type="search" placeholder={props["aria-placeholder"]} className="w-full sm:w-64" />
    </form>
  );
}
