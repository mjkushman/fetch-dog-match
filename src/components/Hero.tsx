import { ReactNode, useEffect, useState } from "react";

export default function Hero({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroHeight = isScrolled ? "h-16" : "h-32";

  return (
    <div
      className={`w-full bg-neutral-50 flex items-center transition-all duration-300 ${heroHeight}`}
    >
      <div className="w-full flex items-center">
        <h1 className="text-xl ml-4">Fetch</h1>
        <div className="flex-grow flex justify-center">{children}</div>
      </div>
    </div>
  );
}
