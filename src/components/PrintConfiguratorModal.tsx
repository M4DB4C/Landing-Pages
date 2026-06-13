import React, { useState } from 'react';
import { X, Check, Heart, ShieldCheck, Download, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Artwork, FrameConfig, FrameColor, PrintSize, PaperFinish } from '../types';

interface PrintConfiguratorModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onAddToCart: (artwork: Artwork, config: FrameConfig, finalPrice: number) => void;
}

export default function PrintConfiguratorModal({ artwork, onClose, onAddToCart }: PrintConfiguratorModalProps) {
  if (!artwork) return null;

  // Selected state
  const [frameColor, setFrameColor] = useState<FrameColor>('black');
  const [size, setSize] = useState<PrintSize>('A3');
  const [finish, setFinish] = useState<PaperFinish>('matte');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [addedSuccessfully, setAddedSuccessfully] = useState<boolean>(false);

  // Price Calculation
  const sizePriceAddons = { A4: 0, A3: 45, A2: 95 };
  const finishPriceAddons = { matte: 0, satin: 20, fineart: 55 };
  const framePriceAddons = {
    black: 50,
    wood: 65,
    white: 50
  };

  const finalPrice = artwork.basePrice + sizePriceAddons[size] + finishPriceAddons[finish] + framePriceAddons[frameColor];

  const handleAdd = () => {
    onAddToCart(artwork, { frameColor, size, finish }, finalPrice);
    setAddedSuccessfully(true);
    setTimeout(() => {
      setAddedSuccessfully(false);
      onClose();
    }, 1500);
  };

  // Dimensions label
  const dimensionsMap = {
    A4: '21 x 29.7 cm',
    A3: '29.7 x 42 cm',
    A2: '42 x 59.4 cm',
  };

  // Border styling depending on frame setting
  const getFrameColorStyles = () => {
    switch (frameColor) {
      case 'wood':
        return 'border-[14px] border-[#a17a52] shadow-[0_15px_30px_rgba(113,98,82,0.3)] bg-stone-100 ring-2 ring-amber-900/10';
      case 'white':
        return 'border-[14px] border-[#ede7e5] shadow-[0_15px_30px_rgba(0,0,0,0.1)] bg-white ring-1 ring-black/5';
      case 'black':
      default:
        return 'border-[14px] border-[#1d1b1a] shadow-[0_15px_30px_rgba(0,0,0,0.25)] bg-slate-50 ring-1 ring-white/10';
    }
  };

  return (
    <div className="fixed inset-0 z-100 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-charcoal/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-6 lg:p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative transform overflow-hidden rounded-xl bg-surface text-left shadow-2xl transition-all w-full max-w-4xl border border-outline-variant/30 flex flex-col md:flex-row h-auto max-h-[90vh] md:max-h-[85vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface-container/80 text-on-surface-variant hover:text-primary transition-colors cursor-pointer border border-outline-variant/10"
            aria-label="Fecar modal"
          >
            <X size={18} />
          </button>

          {/* Left Column: Visual Artwork Frame Preview */}
          <div className="w-full md:w-1/2 bg-surface-container-low p-6 md:p-10 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-outline-variant/20 overflow-y-auto">
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-primary/10 text-primary text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-1 rounded">
                Simulador Vivo
              </span>
            </div>

            <div className="w-full max-w-xs md:max-w-md flex flex-col items-center justify-center py-6">
              {/* Dynamic Frame Wrapper */}
              <motion.div 
                layout
                className={`relative w-full aspect-[3/4] flex items-center justify-center transition-all duration-300 ${getFrameColorStyles()}`}
              >
                {/* Simulated Passe-Partout (White Matting Board) */}
                <div className="w-full h-full p-4 bg-[#fbf9f6] flex items-center justify-center shadow-inner relative">
                  {/* Subtle inner paper shadow */}
                  <div className="absolute inset-4 shadow-inner pointer-events-none opacity-30 border border-black/5" />
                  
                  {/* Artwork Image */}
                  <img 
                    src={artwork.imageUrl} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover shadow-sm select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              {/* Sizing Indicator & Details */}
              <div className="mt-8 text-center bg-surface/50 border border-outline-variant/20 rounded px-4 py-2 flex items-center gap-3">
                <span className="font-mono text-xs text-on-surface-variant uppercase">
                  Moldura: <strong className="text-primary font-sans">{frameColor === 'black' ? 'Charcoal Black' : frameColor === 'wood' ? 'Carvalho Natural' : 'Branco Neve'}</strong>
                </span>
                <div className="h-3 w-px bg-outline-variant/40" />
                <span className="font-mono text-xs text-on-surface-variant uppercase">
                  Dimensões: <strong className="text-primary font-sans">{dimensionsMap[size]}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Configurator Tools */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Header Title */}
              <div className="flex justify-between items-start gap-4 mb-2">
                <div>
                  <span className="font-mono text-xs tracking-widest text-[#dac1bc] uppercase block mb-1">
                    {artwork.technique} — {artwork.year}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-primary font-semibold leading-tight">
                    {artwork.title}
                  </h3>
                </div>
                
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  type="button"
                  aria-label={isLiked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  title={isLiked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  className={`p-2 rounded-full border transition cursor-pointer ${isLiked ? 'bg-red-50 text-red-500 border-red-200' : 'text-on-surface-variant hover:text-primary border-outline-variant/40'}`}
                >
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6 font-sans">
                {artwork.description}
              </p>

              {/* Form Options */}
              <div className="space-y-6">
                
                {/* 1. Escolha o Tamanho */}
                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-on-surface-variant tracking-wider mb-2">
                    1. Escolha as Dimensões
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['A4', 'A3', 'A2'] as PrintSize[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`p-3 border text-center rounded transition cursor-pointer flex flex-col justify-between h-20 ${
                          size === s
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-outline-variant/30 text-on-surface hover:border-primary/50'
                        }`}
                      >
                        <span className="text-sm font-bold block">{s}</span>
                        <span className="text-[10px] text-on-surface-variant block leading-tight">{dimensionsMap[s]}</span>
                        <span className="text-[10px] font-mono text-[#dac1bc] block">
                          {sizePriceAddons[s] === 0 ? 'Base' : `+R$ ${sizePriceAddons[s]}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Escolha o Acabamento de Moldura */}
                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-on-surface-variant tracking-wider mb-2">
                    2. Acabamento da Moldura de Madeira
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['black', 'wood', 'white'] as FrameColor[]).map((col) => (
                      <button
                        key={col}
                        onClick={() => setFrameColor(col)}
                        className={`p-2 border text-center rounded transition cursor-pointer flex flex-col items-center gap-1 ${
                          frameColor === col
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-outline-variant/30 text-on-surface hover:border-primary/50'
                        }`}
                      >
                        {/* Frame color sphere preview indicator */}
                        <div className={`w-4 h-4 rounded-full border shadow-sm ${
                          col === 'black' ? 'bg-[#1d1b1a]' : col === 'wood' ? 'bg-[#a17a52]' : 'bg-white'
                        }`} />
                        <span className="text-xs font-sans capitalize mt-1">
                          {col === 'black' ? 'Preto' : col === 'wood' ? 'Carvalho' : 'Branco'}
                        </span>
                        <span className="text-[9px] font-mono text-[#dac1bc] block leading-tight">
                          +R$ {framePriceAddons[col]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Escolha o Papel */}
                <div>
                  <label className="block text-xs font-sans uppercase font-bold text-on-surface-variant tracking-wider mb-2">
                    3. Qualidade do Papel de Impressão
                  </label>
                  <div className="space-y-2">
                    {(['matte', 'satin', 'fineart'] as PaperFinish[]).map((pap) => (
                      <button
                        key={pap}
                        onClick={() => setFinish(pap)}
                        className={`w-full p-2.5 border rounded text-left transition cursor-pointer flex items-start gap-3 ${
                          finish === pap
                            ? 'border-primary bg-primary/5'
                            : 'border-outline-variant/30 text-on-surface hover:border-primary/50'
                        }`}
                      >
                        <div className="mt-1">
                          <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                            finish === pap ? 'border-primary bg-primary' : 'border-outline-variant/50'
                          }`}>
                            {finish === pap && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold capitalize text-on-surface">
                              {pap === 'matte' ? 'Fosco Premium (230g)' : pap === 'satin' ? 'Semicetim Satin (260g)' : 'Fine Art Algodão Giclée (310g)'}
                            </span>
                            <span className="text-xs font-mono text-primary font-bold">
                              {finishPriceAddons[pap] === 0 ? 'Base' : `+R$ ${finishPriceAddons[pap]}`}
                            </span>
                          </div>
                          <p className="text-[11px] text-on-surface-variant mt-0.5 leading-tight font-sans">
                            {pap === 'matte' && 'Textura suave, zero reflexos. Ideal para grafites com alto contraste.'}
                            {pap === 'satin' && 'Leve brilho que realça tons de cor e profundidade nas aquarelas.'}
                            {pap === 'fineart' && 'Classe museográfica de altíssima longevidade. Algodão Arches puro.'}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality certificate */}
                <div className="bg-surface-container p-3 rounded border border-outline-variant/20 flex gap-2.5 items-start">
                  <ShieldCheck size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-[11px] text-on-surface-variant font-sans">
                    <strong>Certificado de Autenticidade:</strong> Todos os nossos prints acompanham assinatura digitalizada do artista no verso e selo holográfico numerado exclusivo.
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Actions Purchase Bar */}
            <div className="border-t border-outline-variant/30 pt-4 mt-6 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-widest font-mono">
                  Valor Total
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-primary font-sans">
                    R$ {finalPrice},00
                  </span>
                  <span className="text-[10px] text-[#dac1bc] font-mono">BRL</span>
                </div>
              </div>

              <button
                onClick={handleAdd}
                disabled={addedSuccessfully}
                className={`flex-1 py-3 px-6 rounded font-sans text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer select-none ${
                  addedSuccessfully
                    ? 'bg-emerald-600 text-white'
                    : artwork.availability === 'exposicao' && size === 'A2'
                    ? 'bg-primary text-on-primary hover:bg-primary-container'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
              >
                {addedSuccessfully ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <Check size={15} /> Adicionado • R$ {finalPrice}
                  </span>
                ) : (
                  <span>Adicionar ao Carrinho</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
