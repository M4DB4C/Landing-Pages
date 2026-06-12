import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoM4dB4c from '../assets/logo-m4d-b4c.svg';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ cartCount, onOpenCart, onScrollToSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Coleção', id: 'gallery' },
    { label: 'Autoria', id: 'about' },
    { label: 'Simulador', id: 'simulator' },
    { label: 'Contato', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
      <div className="flex justify-between items-center w-full px-4 md:px-16 py-3 max-w-[1280px] mx-auto">
        {/* Burger menu icon on mobile - Left */}
        <div className="flex items-center gap-4">
          <button
            id="mobile-menu-toggle"
            className="md:hidden text-primary p-1 hover:bg-surface-container rounded transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <button 
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 hover:opacity-90 transition cursor-pointer"
            aria-label="M4d-B4C Studio - início"
          >
            <img
              src={logoM4dB4c}
              alt="M4d-B4C Studio"
              className="h-10 md:h-12 w-auto rounded-sm shadow-sm"
            />
            <span className="hidden lg:inline font-display text-xl text-primary font-semibold tracking-tight">
              M4d-B4C Studio
            </span>
          </button>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm tracking-wide uppercase">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onScrollToSection(link.id)}
              className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer font-medium"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Button & Cart */}
        <div className="flex items-center gap-3">
          {/* Cart Icon */}
          <button
            id="cart-button"
            onClick={onOpenCart}
            className="relative p-2.5 text-primary hover:bg-surface-container rounded transition-all cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={21} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-1.5 right-1.5 w-5 h-5 bg-primary text-on-primary font-mono text-[10px] font-bold rounded-full flex items-center justify-center border border-surface"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => onScrollToSection('contact')}
            className="bg-primary text-on-primary px-4 md:px-5 py-2.5 font-sans font-medium text-xs tracking-wider hover:bg-primary-container hover:shadow-sm active:scale-95 transition-all uppercase rounded cursor-pointer"
          >
            Encomendas
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 top-[65px] bg-black/40 z-40 md:hidden"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-[65px] left-0 bottom-0 w-[4/5] max-w-[320px] bg-surface border-r border-outline-variant/40 z-55 md:hidden flex flex-col p-6 shadow-xl"
            >
              <div className="flex flex-col gap-6 font-sans uppercase tracking-wider text-sm mt-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className="flex items-center justify-between text-left py-3 border-b border-outline-variant/20 text-on-surface font-semibold hover:text-primary transition"
                  >
                    <span>{link.label}</span>
                    <span className="text-primary font-display text-lg">→</span>
                  </button>
                ))}
              </div>

              <div className="mt-auto p-4 bg-surface-container-low rounded border border-outline-variant/30 text-center">
                <img
                  src={logoM4dB4c}
                  alt="M4d-B4C Studio"
                  className="h-14 w-auto mx-auto rounded-sm mb-3"
                />
                <p className="font-display text-primary font-semibold text-lg">M4d-B4C Studio</p>
                <p className="text-xs text-on-surface-variant font-sans mt-1">Arte autoral, prints premium e projetos sob demanda</p>
                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-[11px] uppercase tracking-widest text-[#dac1bc]">Curadoria Humana</span>
                  <p className="text-xs text-on-surface-variant font-serif italic">"Técnica clássica, imagem computacional e presença espacial."</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
