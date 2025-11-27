"use client";

import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import NavigationMenu from "./NavigationMenu";
import ThemeToggleButton from "./ThemeToggleButton";
import MobileMenuToggle from "./MobileMenuToggle";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      id="headerPortfolio"
      className="sticky top-0 z-50 w-full text-black bg-zinc-50/85 dark:bg-black/85
             dark:text-white transition-colors
            border-b dark:border-gray-800 border-gray-300 backdrop-blur-sm shadow-md"
    >
      <div className="max-w-4xl mx-auto w-full px-4 py-5 transition-all duration-300 flex items-center justify-between">
        <Breadcrumbs />
        <NavigationMenu />
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
          <MobileMenuToggle
            isOpen={mobileMenuOpen}
            onToggleAction={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </div>
      <MobileMenu isOpen={mobileMenuOpen} setIsOpenAction={setMobileMenuOpen} />
    </header>
  );
}
