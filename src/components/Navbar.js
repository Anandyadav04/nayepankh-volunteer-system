"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e, targetId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="navbar-brand" onClick={() => setIsMenuOpen(false)}>
          <div className="navbar-logo">NP</div>
          <div>
            <div className="navbar-title">NayePankh</div>
            <div className="navbar-subtitle">Foundation</div>
          </div>
        </Link>

        {/* Mobile menu toggle button */}
        <button className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="navbar-link">About</a>
          <a href="#register" onClick={(e) => handleScroll(e, 'register')} className="navbar-link">Volunteer</a>
          <Link href="/login" className="btn btn-primary btn-sm" onClick={() => setIsMenuOpen(false)}>
            Admin Portal
          </Link>
        </div>
      </div>
    </nav>
  );
}
