import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-2xl font-bold tracking-tight text-blue-600"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            R
          </span>
          ResumeBuilder
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-5 border-b border-gray-100 bg-white px-5 py-5 shadow-lg md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none`}
        >
          <ul className="flex flex-col gap-4 md:flex-row md:items-center md:gap-7">
            <li><a href="/#home" onClick={closeMenu} className="font-medium text-gray-600 transition hover:text-blue-600">Home</a></li>
            <li><a href="/#templates" onClick={closeMenu} className="font-medium text-gray-600 transition hover:text-blue-600">Templates</a></li>
            <li><a href="/#pricing" onClick={closeMenu} className="font-medium text-gray-600 transition hover:text-blue-600">Pricing</a></li>
            <li><a href="/#about" onClick={closeMenu} className="font-medium text-gray-600 transition hover:text-blue-600">About</a></li>
            <li><a href="/#contact" onClick={closeMenu} className="font-medium text-gray-600 transition hover:text-blue-600">Contact</a></li>
          </ul>

          <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row md:border-0 md:pt-0">
            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-lg px-4 py-2.5 text-center font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              to="/Signup"
              onClick={closeMenu}
              className="rounded-lg bg-green-600 px-5 py-2.5 text-center font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;