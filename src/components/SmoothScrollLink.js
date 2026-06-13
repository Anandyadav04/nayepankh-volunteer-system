"use client";

import { usePathname, useRouter } from "next/navigation";

export default function SmoothScrollLink({ targetId, className, children, isButton = false }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleScroll = (e) => {
    e.preventDefault();
    
    if (pathname !== "/") {
      router.push(`/#${targetId}`);
      return;
    }

    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isButton) {
    return (
      <button onClick={handleScroll} className={className}>
        {children}
      </button>
    );
  }

  return (
    <a href={`#${targetId}`} onClick={handleScroll} className={className}>
      {children}
    </a>
  );
}
