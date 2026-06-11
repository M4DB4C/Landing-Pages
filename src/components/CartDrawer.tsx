import React from 'react';
import { X, Trash2, ShieldCheck, ArrowRight, ShoppingBag, Plus, Minus, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart
}: CartDrawerProps) {
  
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Trigger simulated purchase checkout success
  const [checkoutComplete, setCheckoutComplete] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCheckoutComplete(true);
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setCheckoutComplete(false);
    onClearCart();
    onClose();
  };

  const getFrameColorLabel = (col: string) => {
    switch (col) {
      case 'wood': return 'Molar Carvalho Natural';
      case 'white': return 'Molar Branco Neve';
      case 'black':
      default: return 'Molar Charcoal Preto';
    }
  };

  const getFinishLabel = (fin: string) => {
    switch (fin) {
      case 'satin': return 'Semi-cetim Satin (260g)';
      case 'fineart': return 'Fine Art Algodão (Giclée)';
      case 'matte':
      default: return 'Fosco Premium (230g)';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-charcoal/60 backdrop-blur-sm z-90"
          />

          {/* Cart Panel Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] bg-surface border-l border-outline-variant/30 shadow-2xl z-100 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <h3 className="font-display text-xl font-bold text-primary">
                  Carrinho de Compras
                </h3>
                <span className="bg-primary/15 text-primary text-xs px-2.5 py-0.5 rounded-full font-mono">
                  {cartItems.length}
                </span>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors cursor-pointer"
                aria-label="Collapse cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Interactive Checkout Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {checkoutComplete ? (
                /* Checkout Success Splash Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                    <ShieldCheck size={36} />
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-bold text-primary">
                      Compra Simulada!
                    </h4>
                    <p className="font-sans text-xs text-on-surface-variant mt-2 max-w-sm mx-auto leading-relaxed">
                      Obrigado por apoiar a cultura e arte premium! Em nossa simulação de e-commerce, o pedido foi processado com sucesso. Seu link para download instantâneo foi gerado.
                    </p>
                  </div>

                  <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/30 text-left space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant">Status do Pedido:</span>
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Aprovado</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono border-t border-outline-variant/20 pt-2">
                      <span className="text-on-surface-variant">Código:</span>
                      <span className="font-bold text-primary">#AST-49938-2026</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono border-t border-outline-variant/20 pt-2">
                      <span className="text-on-surface-variant">Valor:</span>
                      <span className="font-bold text-primary">R$ {totalPrice},00</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCloseSuccess}
                    className="w-full bg-primary text-on-primary py-3 font-sans font-bold text-xs uppercase tracking-wider rounded hover:bg-primary-container transition cursor-pointer"
                  >
                    Encerrar e Esvaziar Carrinho
                  </button>
                </motion.div>
              ) : cartItems.length === 0 ? (
                /* Empty Cart Screen */
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto text-on-surface-variant">
                    <ShoppingBag size={28} />
                  </div>
                  <div>
                    <p className="font-display text-lg font-bold text-primary">O carrinho está vazio</p>
                    <p className="text-xs text-on-surface-variant mt-1.5 max-w-xs mx-auto leading-relaxed">
                      Explore nossa galeria e selecione suas obras prediletas. Você pode configurar molduras de madeira e tipos de papel em tempo real!
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-primary/10 hover:bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded transition cursor-pointer"
                  >
                    Navegar Coleção
                  </button>
                </div>
              ) : (
                /* Cart Item Cards list */
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 bg-surface-container rounded-lg border border-outline-variant/20 flex gap-4 relative"
                    >
                      {/* Thumbnail frame view */}
                      <div className="w-20 h-24 rounded border border-outline-variant/30 flex-shrink-0 bg-white overflow-hidden relative p-1.5 flex items-center justify-center">
                        <img
                          src={item.artwork.imageUrl}
                          alt={item.artwork.title}
                          className="w-full h-full object-cover shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Config values */}
                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="font-display font-bold text-sm text-primary leading-tight truncate">
                          {item.artwork.title}
                        </h4>
                        
                        <div className="text-[10px] text-on-surface-variant space-y-0.5 mt-1 font-sans">
                          <p>
                            Dimensão: <strong className="text-[#dac1bc] font-mono">{item.config.size}</strong> ({item.config.size === 'A4' ? '21x29cm' : item.config.size === 'A3' ? '29x42cm' : '42x59cm'})
                          </p>
                          <p className="truncate">
                            Moldura: <strong className="text-on-surface">{getFrameColorLabel(item.config.frameColor)}</strong>
                          </p>
                          <p className="truncate">
                            Papel: <strong>{getFinishLabel(item.config.finish)}</strong>
                          </p>
                        </div>

                        {/* Quantity Counter Switcher */}
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 border border-outline-variant/30 rounded text-on-surface hover:text-primary transition cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="font-mono text-xs w-6 text-center font-bold">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 border border-outline-variant/30 rounded text-on-surface hover:text-primary transition cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>

                      {/* Actions Right block */}
                      <div className="flex flex-col justify-between items-end">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-on-surface-variant hover:text-red-500 rounded-full hover:bg-red-50 transition-colors cursor-pointer-none"
                          aria-label="Excluir item"
                        >
                          <Trash2 size={14} />
                        </button>
                        
                        <span className="font-sans text-xs font-bold text-primary block mt-2">
                          R$ {item.price * item.quantity},00
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom calculation summary bar */}
            {!checkoutComplete && cartItems.length > 0 && (
              <div className="p-6 border-t border-outline-variant/30 bg-surface-container-low space-y-4">
                <div className="space-y-1.5 font-sans">
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Taxa de Embalagem Premium</span>
                    <span className="font-mono text-emerald-600 font-semibold bg-emerald-50 px-1 rounded border border-emerald-100">Grátis</span>
                  </div>
                  <div className="flex justify-between text-xs text-on-surface-variant pt-1 border-t border-outline-variant/10">
                    <span>Frete Exclusivo com Seguro</span>
                    <span className="font-mono text-emerald-600 font-semibold bg-emerald-50 px-1 rounded border border-emerald-100">Grátis</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-primary pt-2.5 border-t border-outline-variant/20">
                    <span>Subtotal</span>
                    <span className="font-mono">R$ {totalPrice},00</span>
                  </div>
                </div>

                {/* Simulated payment button */}
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-primary text-on-primary py-3.5 rounded font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary-container disabled:opacity-80 transition-all cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-1.5 animate-pulse">
                      Processando Transação...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <CreditCard size={15} /> Finalizar Pedido <ArrowRight size={14} />
                    </span>
                  )}
                </button>

                {/* Reassurance badge */}
                <div className="text-[10px] text-on-surface-variant flex items-center justify-center gap-1.5 text-center pt-1 font-sans">
                  <ShieldCheck size={12} className="text-emerald-600" />
                  Ambiente Protegido com Criptografia SSL 256 bits.
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
