import { ModeToggle } from '@/components/ui/mode-toggle';

const Header = () => {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-row gap-4">
          <a href="/" className="z-10">
            Home
          </a>
          <a href="/flower" className="z-10">
            Flower
          </a>
        </div>
        <div className="z-10">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
