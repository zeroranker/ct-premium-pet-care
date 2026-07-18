import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="grain-overlay" />
      
      {/* Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-teal-glow/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <p className="text-eyebrow mb-4 text-teal-glow">Error 404</p>
        <h1 className="text-display text-6xl text-white md:text-8xl flex flex-wrap gap-x-4 justify-center">
          Lost in <span className="text-glow text-teal-glow">Connecticut</span>
        </h1>
        <p className="mt-8 max-w-md text-lg text-slate-400 font-light leading-relaxed">
          We couldn&apos;t find the page you were looking for. Let&apos;s get you back on the right path.
        </p>
        
        <Link 
          href="/" 
          className="btn-primary group mt-10 flex w-fit items-center gap-3 rounded-full py-4 pl-8 pr-6 text-sm font-medium tracking-wide"
        >
          <Home className="h-4 w-4" />
          Return Home
        </Link>
      </div>
    </main>
  );
}