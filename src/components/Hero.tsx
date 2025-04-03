import { ReactNode, useEffect, useState } from "react";
import Wordmark from "@/assets/wordmark.svg?react";

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
      className={`w-full bg-neutral-50 flex items-center relative transition-all duration-300 ${heroHeight}`}
    >
      <div >
        <Wordmark className="h-8 ml-4" aria-label="Fetch Wordmark">
          <title>Fetch</title>
        </Wordmark>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">{children}</div>
    </div>
  );
}
