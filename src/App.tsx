import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PrintConfiguratorModal from './components/PrintConfiguratorModal';
import MockupShowcase from './components/MockupShowcase';
import ContactForm from './components/ContactForm';
import CartDrawer from './components/CartDrawer';
import { ARTWORKS, ACCORDION_FAQS } from './data';
import { imagePaths } from './imagePaths';
import { Artwork, FrameConfig, CartItem } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Clock, 
  Leaf, 
  Scale, 
  Sparkles, 
  Shield, 
  ArrowRight,
  Maximize2,
  PenTool,
  Fingerprint,
  FileCheck2
} from 'lucide-react';

export default function App() {
  // Navigation & Slices state
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<'tudo' | 'disponivel' | 'exposicao'>('tudo');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  
  // Shopping Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Accordion active index
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('m4db4c_studio_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error('Falha ao restaurar carrinho:', err);
      }
    }
  }, []);

  // Save cart changes
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('m4db4c_studio_cart', JSON.stringify(items));
  };

  // Add customized frame to cart
  const handleAddToCart = (artwork: Artwork, config: FrameConfig, finalPrice: number) => {
    // Unique ID combining artworkId, size, wood, and paper finish
    const itemHash = `${artwork.id}_${config.size}_${config.frameColor}_${config.finish}`;
    
    const existingIndex = cartItems.findIndex(item => item.id === itemHash);
    
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      saveCart(updated);
    } else {
      const newItem: CartItem = {
        id: itemHash,
        artwork,
        config,
        price: finalPrice,
        quantity: 1
      };
      saveCart([...cartItems, newItem]);
    }
  };

  // Cart operations
  const handleRemoveCartItem = (id: string) => {
    const filtered = cartItems.filter(item => item.id !== id);
    saveCart(filtered);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return { ...item, quantity: Math.max(1, nextQty) };
      }
      return item;
    });
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Anchor Navigation Scrolling Helper
  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Toggle FAQ blocks
  const toggleFaq = (index: number) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  // Filter the artworks
  const filteredArtworks = ARTWORKS.filter(art => {
    if (selectedCategoryFilter === 'tudo') return true;
    return art.availability === selectedCategoryFilter;
  });

  return (
    <div className="min-h-screen bg-surface selection:bg-primary-container selection:text-on-primary">
      {/* 1. Sticky Navigation Header */}
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      <main className="pt-20">
        
        {/* 2. Hero Section */}
        <section id="hero" className="relative min-h-[90vh] md:min-h-[80vh] flex flex-col md:flex-row items-center max-w-[1280px] mx-auto px-4 md:px-16 pt-8 md:pt-16 pb-16 gap-12 sm:scroll-mt-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 flex flex-col items-start gap-6 text-left"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-[11px] font-sans font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              <Sparkles size={11} className="animate-pulse" /> M4d-B4C Studio · Ateliê de Curadoria Fina
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-primary leading-[1.1] tracking-tight">
              Arte autoral para espaços que não aceitam decoração genérica
            </h1>
            
            <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-lg leading-relaxed">
              O M4d-B4C Studio cria e licencia obras entre técnica clássica, imagem computacional e curadoria humana. Prints premium, peças sob demanda e simulações em ambiente real para interiores com presença, memória e precisão visual.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4">
              <button 
                onClick={() => handleScrollToSection('gallery')}
                className="bg-primary text-on-primary px-8 py-4 font-sans font-bold text-xs tracking-widest hover:bg-primary-container leading-none transition-all uppercase rounded flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                Ver Coleção Completa <ChevronDown size={14} className="animate-bounce" />
              </button>
              <button 
                onClick={() => handleScrollToSection('about')}
                className="border border-outline text-on-surface-variant hover:text-primary hover:border-primary px-8 py-4 font-sans font-bold text-xs tracking-widest leading-none transition-all uppercase rounded flex items-center justify-center gap-2 cursor-pointer bg-surface/50"
              >
                Conhecer Autoria <ArrowRight size={13} />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 relative aspect-[4/3] md:aspect-square overflow-hidden rounded-xl border border-outline-variant/30 group cursor-pointer shadow-xl"
            onClick={() => {
              const handsArt = ARTWORKS.find(a => a.id === 'hands-intertwined');
              if (handsArt) setSelectedArtwork(handsArt);
            }}
          >
            <img 
              className="w-full h-full object-cover grayscale brightness-[0.93] group-hover:scale-105 group-hover:brightness-95 transition-all duration-1000 ease-out" 
              src={imagePaths.heroArtwork}
              alt="Estudo de mãos entrelaçadas"
              referrerPolicy="no-referrer"
            />
            {/* Subtle card vignette borders */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-left">
              <span className="font-mono text-[10px] tracking-widest text-[#dac1bc] uppercase">Obra em Destaque</span>
              <h3 className="font-display text-white text-xl font-bold">Conexão Silenciosa</h3>
              <p className="text-white/80 font-sans text-xs mt-1 flex items-center gap-1">
                Toque para Configurar Moldura <Maximize2 size={11} />
              </p>
            </div>
          </motion.div>
        </section>

        {/* 3. Author / Authorship Section */}
        <section id="about" className="bg-surface-container-low border-y border-outline-variant/20 py-20 scroll-mt-24">
          <div className="max-w-[1280px] mx-auto px-4 md:px-16 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="bg-surface rounded-xl border border-outline-variant/25 p-6 md:p-8 shadow-sm"
            >
              <span className="font-mono text-xs tracking-widest text-[#dac1bc] uppercase block mb-2">
                Autor / Autoria
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-primary font-bold tracking-tight mb-6">
                Alfonso de Orte · M4d-B4C
              </h2>
              <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed mb-5">
                O M4d-B4C Studio nasce do encontro entre desenho, fotografia, física, arte digital e leitura semântica da imagem. Cada obra é conduzida por olhar humano: composição, intenção, técnica, suporte e contexto espacial não são deixados ao acaso.
              </p>
              <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                A tecnologia entra como instrumento de expansão, não como substituta da autoria. O resultado é uma produção visual autoral para colecionadores, arquitetos, decoradores e espaços que buscam presença estética com procedência clara.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-surface p-5 rounded-xl border border-outline-variant/20 shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center border border-primary text-primary rounded-lg bg-primary/5 mb-4">
                  <PenTool size={18} />
                </div>
                <h3 className="font-display text-lg font-bold text-primary mb-2">Técnica e gesto</h3>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                  Grafite, aquarela, fotografia e composição digital tratados como linguagens de uma mesma oficina visual.
                </p>
              </div>

              <div className="bg-surface p-5 rounded-xl border border-outline-variant/20 shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center border border-primary text-primary rounded-lg bg-primary/5 mb-4">
                  <Fingerprint size={18} />
                </div>
                <h3 className="font-display text-lg font-bold text-primary mb-2">Assinatura autoral</h3>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                  Obras pensadas para carregar identidade, memória e densidade visual — não apenas preencher parede.
                </p>
              </div>

              <div className="bg-surface p-5 rounded-xl border border-outline-variant/20 shadow-sm">
                <div className="w-10 h-10 flex items-center justify-center border border-primary text-primary rounded-lg bg-primary/5 mb-4">
                  <FileCheck2 size={18} />
                </div>
                <h3 className="font-display text-lg font-bold text-primary mb-2">Proveniência</h3>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                  Cada projeto pode ser acompanhado por dados de autoria, versão, licença e contexto de uso.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Catalog Gallery Section */}
        <section id="gallery" className="max-w-[1280px] mx-auto px-4 md:px-16 py-16 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="font-mono text-xs tracking-widest text-[#dac1bc] uppercase block mb-1">
                Catálogo de Obras
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-primary font-bold tracking-tight">
                Categorias
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex gap-4 font-sans text-xs font-bold uppercase tracking-wider">
              {(['tudo', 'disponivel', 'exposicao'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedCategoryFilter(filter)}
                  className={`pb-2.5 transition cursor-pointer relative ${
                    selectedCategoryFilter === filter 
                      ? 'text-primary' 
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span>
                    {filter === 'tudo' && 'Tudo'}
                    {filter === 'disponivel' && 'Disponível'}
                    {filter === 'exposicao' && 'Exposição'}
                  </span>
                  
                  {selectedCategoryFilter === filter && (
                    <motion.div 
                      layoutId="galleryFilterBorder"
                      className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" 
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArtworks.map((artwork, idx) => (
                <motion.div
                  key={artwork.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  onClick={() => setSelectedArtwork(artwork)}
                  className="group relative flex flex-col justify-between bg-surface-container rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm hover:shadow-md cursor-pointer transition-all duration-300"
                >
                  {/* Aspect crop wrapper */}
                  <div className="aspect-[3/4] overflow-hidden bg-surface-container-low relative">
                    <img 
                      className="w-full h-full object-cover saturate-[0.85] group-hover:saturate-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Floating badge for Availability category */}
                    <div className="absolute top-4 left-4">
                      <span className={`text-[9px] font-sans font-bold tracking-widest uppercase px-2 py-1 rounded inline-block shadow-sm ${
                        artwork.availability === 'disponivel' 
                          ? 'bg-surface-container-lowest text-emerald-700 border border-emerald-100' 
                          : 'bg-primary text-on-primary'
                      }`}>
                        {artwork.availabilityLabel}
                      </span>
                    </div>

                    {/* Frame Simulator Trigger overlay on hover */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-surface/90 backdrop-blur-sm text-primary text-xs font-bold font-sans uppercase tracking-widest py-2 px-4 rounded border border-outline-variant/20 shadow-md">
                        Simular Moldura
                      </span>
                    </div>
                  </div>

                  {/* Body text information block */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-surface">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] tracking-widest text-[#dac1bc] uppercase">
                        {artwork.technique}
                      </span>
                      <h3 className="font-display text-lg font-bold text-primary group-hover:text-primary-container transition">
                        {artwork.title}
                      </h3>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-outline-variant/10 flex justify-between items-baseline">
                      <span className="text-xs text-on-surface-variant font-sans">
                        Prints a partir de
                      </span>
                      <span className="font-sans text-sm font-bold text-primary">
                        R$ {artwork.basePrice},00
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* 5. Print-on-Demand Benefits Section (Tactile cards) */}
        <section className="bg-surface-container-low py-20 border-y border-outline-variant/20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-16">
            <div className="max-w-2xl mb-16 text-left">
              <span className="font-mono text-xs tracking-widest text-[#dac1bc] uppercase block mb-1">
                Impressão, Licenciamento e Presença
              </span>
              <h2 className="font-display text-3xl md:text-5xl text-primary font-bold tracking-tight">
                Por que arte sob demanda?
              </h2>
              <p className="font-sans text-sm md:text-base text-on-surface-variant mt-3 leading-relaxed">
                O M4d-B4C Studio aproxima obra, espaço e suporte. A imagem pode nascer como arquivo digital, print fine art, peça emoldurada ou licença para projeto — sempre com intenção autoral e adequação ao ambiente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Feature 1 */}
              <div className="flex flex-col gap-4 p-6 bg-surface rounded-xl border border-outline-variant/20 shadow-sm hover:translate-y-[-2px] transition duration-300">
                <div className="w-10 h-10 flex items-center justify-center border border-primary text-primary rounded-lg bg-primary/5">
                  <Clock size={18} />
                </div>
                <h4 className="font-display text-xl font-bold text-primary">
                  Aquisição sem fricção
                </h4>
                <p className="font-sans text-[13px] text-on-surface-variant leading-relaxed">
                  Escolha a obra, simule sua presença no ambiente e avance para impressão, download ou projeto sob medida sem perder clareza sobre formato, escala e finalidade.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-4 p-6 bg-surface rounded-xl border border-outline-variant/20 shadow-sm hover:translate-y-[-2px] transition duration-300">
                <div className="w-10 h-10 flex items-center justify-center border border-primary text-primary rounded-lg bg-primary/5">
                  <Leaf size={18} />
                </div>
                <h4 className="font-display text-xl font-bold text-primary">
                  Produção consciente
                </h4>
                <p className="font-sans text-[13px] text-on-surface-variant leading-relaxed">
                  Prints e molduras podem ser produzidos sob demanda, evitando estoque decorativo sem destino e favorecendo escolhas mais precisas de suporte, papel e acabamento.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-4 p-6 bg-surface rounded-xl border border-outline-variant/20 shadow-sm hover:translate-y-[-2px] transition duration-300">
                <div className="w-10 h-10 flex items-center justify-center border border-primary text-primary rounded-lg bg-primary/5">
                  <Scale size={18} />
                </div>
                <h4 className="font-display text-xl font-bold text-primary">
                  Obra adaptável ao espaço
                </h4>
                <p className="font-sans text-[13px] text-on-surface-variant leading-relaxed">
                  Fine art, canvas, acrílico, metal ou licenciamento digital: o suporte é escolhido conforme arquitetura, luz, escala e intenção de uso.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 6. Immersive Mockup Showcase */}
        <MockupShowcase />

        {/* 7. Accordion FAQs Section */}
        <section className="bg-surface-container py-16 border-t border-outline-variant/20">
          <div className="max-w-[800px] mx-auto px-4">
            <div className="text-center mb-12">
              <span className="font-mono text-xs tracking-widest text-[#dac1bc] uppercase block mb-1">
                Dúvidas Comuns
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-primary font-bold">
                Perguntas Frequentes
              </h2>
            </div>

            <div className="space-y-3">
              {ACCORDION_FAQS.map((faq, idx) => {
                const isOpen = expandedFaqIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-outline-variant/30 rounded-lg bg-surface overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex justify-between items-center bg-surface select-none cursor-pointer"
                    >
                      <span className="font-display font-bold text-sm md:text-base text-primary">
                        {faq.question}
                      </span>
                      <ChevronDown 
                        size={16} 
                        className={`text-[#dac1bc] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="p-4 pt-1 text-xs md:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/15 font-sans bg-surface-container-lowest">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. Bespoke Custom Requests Form */}
        <ContactForm />

      </main>

      {/* 9. Elegant Editorial Gallery Footer */}
      <footer className="bg-surface-container-high border-t border-outline-variant/30 pt-16 pb-8">
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-outline-variant/20 pb-12">
          
          {/* Col 1: Brand details */}
          <div className="space-y-4">
            <h4 className="font-display text-2xl text-primary font-bold tracking-tight">
              M4d-B4C Studio
            </h4>
            <p className="font-sans text-xs text-on-surface-variant max-w-sm leading-relaxed">
              Ateliê digital de arte autoral, prints premium e projetos sob demanda. Técnica clássica, imagem computacional e curadoria humana para espaços reais.
            </p>
            <div className="flex gap-4 pt-2">
              <span className="text-[10px] text-on-surface-variant font-mono uppercase bg-surface-container px-2.5 py-1 rounded border border-outline-variant/20">
                Curadoria Humana
              </span>
              <span className="text-[10px] text-on-surface-variant font-mono uppercase bg-surface-container px-2.5 py-1 rounded border border-outline-variant/20">
                Autoria Verificável
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h5 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
              Links de Navegação
            </h5>
            <ul className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant font-sans">
              <li>
                <button onClick={() => handleScrollToSection('hero')} className="hover:text-primary transition cursor-pointer">Início</button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('gallery')} className="hover:text-primary transition cursor-pointer">Categorias</button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('about')} className="hover:text-primary transition cursor-pointer">Autoria</button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('simulator')} className="hover:text-primary transition cursor-pointer">Simulador</button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('contact')} className="hover:text-primary transition cursor-pointer">Encomendas</button>
              </li>
              <li>
                <span className="opacity-50">Certificados</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Secure Seals */}
          <div className="space-y-4 bg-surface p-5 rounded-lg border border-outline-variant/30 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="p-1 px-1.5 bg-primary/10 rounded text-primary">
                <Shield size={14} />
              </div>
              <h5 className="font-display text-sm font-bold text-primary">
                Autoria e Proveniência
              </h5>
            </div>
            <p className="text-[11px] text-on-surface-variant font-sans leading-relaxed">
              Cada obra ou projeto pode ser acompanhado por informações de autoria, versão, licença, finalidade de uso e contexto curatorial. A obra não é apenas imagem: é presença visual com procedência.
            </p>
          </div>

        </div>

        {/* Lower footer copyright details */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-on-surface-variant font-sans">
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <span className="hover:text-primary transition cursor-pointer">Política de Privacidade</span>
            <span className="text-outline-variant/40">•</span>
            <span className="hover:text-primary transition cursor-pointer">Termos de Serviço</span>
            <span className="text-outline-variant/40">•</span>
            <span className="hover:text-primary transition cursor-pointer">Termos de Licenciamento</span>
          </div>
          <div>
            © 2026 M4d-B4C Studio. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* 10. Interactive Modals & Drawers */}
      <AnimatePresence>
        {selectedArtwork && (
          <PrintConfiguratorModal 
            artwork={selectedArtwork}
            onClose={() => setSelectedArtwork(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveCartItem}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
