"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const submenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setIsSubmenuOpen(false);
      }
    };

    if (isSubmenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSubmenuOpen]);

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Generador de Reportes", path: "/generador" },
    { name: "Mantenimientos", path: "/mantenimientos" },
    {
      name: "Dependencias",
      submenu: [
        { name: "Directorio", path: "/dependencias" },
        { name: "Mapa", path: "/mapa" },
      ],
    },
  ];

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setIsSubmenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 relative z-[1200]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Título */}
          <div className="shrink-0">
            <Link href="/">
              <h1 className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600 transition-colors">
                MiMG - KURS
              </h1>
            </Link>
          </div>

          {/* Links de navegación - Desktop */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item, index) => {
              if (item.submenu) {
                const isSubmenuActive = item.submenu.some(sub => pathname === sub.path);
                return (
                  <div key={index} className="relative" ref={submenuRef}>
                    <button
                      onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                        isSubmenuActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                      <svg
                        className={`w-4 h-4 transition-transform ${isSubmenuOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Submenú dropdown */}
                    {isSubmenuOpen && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        {item.submenu.map((subItem) => {
                          const isActive = pathname === subItem.path;
                          return (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              onClick={() => setIsSubmenuOpen(false)}
                              className={`block px-4 py-2 font-medium transition-colors ${
                                isActive
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              } else {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              }
            })}
          </div>

          {/* Botón hamburguesa - Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-gray-700 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Menú móvil - Pantalla completa */}
      <div
        className={`fixed inset-0 bg-white z-[1100] md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "64px" }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6 px-4">
          {navItems.map((item, index) => {
            if (item.submenu) {
              const isSubmenuActive = item.submenu.some(sub => pathname === sub.path);
              return (
                <div key={index} className="w-full max-w-sm space-y-3">
                  <button
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                    className={`w-full px-8 py-4 rounded-xl font-bold text-xl text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                      isSubmenuActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {item.name}
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${isSubmenuOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Submenú con animación */}
                  <div
                    className={`space-y-2 pl-4 overflow-hidden transition-all duration-300 ${
                      isSubmenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.submenu.map((subItem) => {
                      const isActive = pathname === subItem.path;
                      return (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          onClick={handleNavClick}
                          className={`block w-full px-6 py-3 rounded-lg font-semibold text-lg text-center transition-all duration-300 ${
                            isActive
                              ? "bg-blue-500 text-white shadow-md scale-105"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            } else {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={handleNavClick}
                  className={`w-full max-w-sm px-8 py-4 rounded-xl font-bold text-xl text-center transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                  }`}
                >
                  {item.name}
                </Link>
              );
            }
          })}
        </div>
      </div>
    </nav>
  );
}
