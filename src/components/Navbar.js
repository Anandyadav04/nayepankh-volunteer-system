"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    
    // If we are not on the homepage, navigate to homepage first, then scroll
    if (pathname !== "/") {
      router.push(`/#${targetId}`);
      return;
    }

    // If we are already on homepage, just scroll smoothly without changing URL
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-brand">
          <div className="navbar-logo">NP</div>
          <div>
            <div className="navbar-title">NayePankh</div>
            <div className="navbar-subtitle">Foundation</div>
          </div>
        </Link>
        <div className="navbar-links">
          <Link href="/" className="navbar-link">Home</Link>
          <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="navbar-link">About</a>
          <a href="#register" onClick={(e) => handleScroll(e, 'register')} className="navbar-link">Volunteer</a>
          <Link href="/login" className="btn btn-primary btn-sm">
            Admin Portal
          </Link>
        </div>
      </div>
    </nav>
  );
}
