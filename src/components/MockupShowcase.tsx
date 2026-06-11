import React, { useState } from 'react';
import { Layers, Fullscreen, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ARTWORKS } from '../data';
import { Artwork } from '../types';

export default function MockupShowcase() {
  const [activeRoom, setActiveRoom] = useState<'sala' | 'office' | 'bedroom'>('sala');
  
  // Custom art loaded per room
  const [roomArts, setRoomArts] = useState<Record<string, Artwork>>({
    sala: ARTWORKS.find(a => a.id === 'hands-intertwined') || ARTWORKS[3],
    office: ARTWORKS.find(a => a.id === 'watercolor-fluid') || ARTWORKS[1],
    bedroom: ARTWORKS.find(a => a.id === 'digital-structure') || ARTWORKS[2],
  });

  const rooms = [
    {
      id: 'sala',
      title: 'Sala de Estar Moderna',
      bgImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTL52i_H5K5EcqHh5ANvNn6H1SSkicZzEueXzPuXENmJevsri_d62ttmLwQiUSQRG_r6izkKVCRlj1YNTYl72fZNwd6J-qwkb967oNEep_P_tHsmb7bHtTQzzz7EuOiz0ZBFuTPQwxhmQsJd5G7xBTzyaB629qASQXq-Rgsqh19hyDTqL1oFPXZOHRKixSvUsSwITyWSAOdKDefO-fSJgykdwLF5b_q07vgHZVuAScDulbUv1Q0_kS1q0ly1930Tb6jyXVZSPy7sU',
      overlayStyle: {
        top: '26%',
        left: '12.4%',
        width: '74.2%',
        height: '48.9%',
        transform: 'rotate(0deg)',
        boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.15)',
      },
      description: 'Paredes cruas off-white e iluminação natural indireta conferem solenidade e destaque total ao grafite em grande formato.'
    },
    {
      id: 'office',
      title: 'Home Office Criativo',
      bgImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFTiKmRQ_XHlNkz1evIiD5L2o29rlbAsmazgx9pgOf6-eYiOcVa2ibCD_cHAMCxkILnbUtgtPlfVyL1A0CVQtN4WkawMYJq6pLcqAbFe3GF47QZ9UP2A5iw593dZoTlpgBd_JbtvzoqnmiDOeEAglkHABiBT2rprRfnX-Kl7LJcy7wsV7HvpaCcPlVziL6wUVV91PTOKlFXFLJbW9SNBSdXjc1s2GZZb6se4EKgFmtY0GvPYDEZtc3D-FMNUPIWm3VEOaqMfm_HyE',
      overlayStyle: {
        top: '19.9%',
        left: '67.0%',
        width: '16.5%',
        height: '34.8%',
        transform: 'rotate(-0.5deg)',
        boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.1)',
      },
      description: 'Iluminação difusa de luminária de foco. A sutileza da aquarela introduz cor e ritmo sem sobrecarregar a mesa de trabalho.'
    },
    {
      id: 'bedroom',
      title: 'Dormitório Contemporâneo',
      bgImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI0IB5vJJfLAXyuNGuZH3k0KyQzXa4aotiIAvtiFSMJIMiBoadzxk-0T9FLUuoOfQ4LQXKMfHiACOax2iSyGcUaZNSG_Eb3fNZ1nOo28Mrx2ZkM3r2h-m5ktswHbeD4fqRtDXDNtNQhyjea1H-_hxF5nlc1Nq3zaaXbHX1UUHHE9jXkK-e5HJ1IXXYycBaaTx8sxHyCI6Gjgf2QE8xhiXnbKGCKclLRQEUioUA9f3QnMuhRFRpUtMx2huVjqDbCyvHdtCv1BBrVsI',
      overlayStyle: {
        top: '29.3%',
        left: '70.4%',
        width: '21.5%',
        height: '49.8%',
        transform: 'rotate(0.5deg)',
        boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.2)'
      },
      description: 'Ambiente soturno com cabeceira cinza e luz de filamento. Moldura de tamanho monumental traz refinamento brutalista.'
    }
  ];

  const currentRoom = rooms.find(r => r.id === activeRoom) || rooms[0];

  const handleSelectArt = (artwork: Artwork) => {
    setRoomArts(prev => ({
      ...prev,
      [activeRoom]: artwork
    }));
  };

  return (
    <section id="simulator" className="max-w-[1280px] mx-auto px-4 md:px-16 py-16 scroll-mt-24">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-mono text-xs tracking-widest text-[#dac1bc] uppercase block mb-2">
          Interatividade Avançada
        </span>
        <h2 className="font-display text-3xl md:text-5xl text-primary font-semibold tracking-tight">
          Sua Arte no Mundo Real
        </h2>
        <p className="font-sans text-sm md:text-base text-on-surface-variant mt-3 leading-relaxed">
          Selecione um ambiente residencial abaixo e clique nas obras da galeria para projetá-las instantaneamente na parede simulada com suas molduras.
        </p>
      </div>

      {/* Room Selector Tab Pills */}
      <div className="flex justify-center gap-2 md:gap-4 mb-8">
        {rooms.map(room => (
          <button
            key={room.id}
            onClick={() => setActiveRoom(room.id as 'sala' | 'office' | 'bedroom')}
            className={`px-4 py-2.5 rounded font-sans text-xs tracking-wider uppercase font-semibold transition cursor-pointer border ${
              activeRoom === room.id
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container-low text-on-surface-variant border-outline-variant/30 hover:border-primary/40'
            }`}
          >
            {room.id === 'sala' && '🛋️ '}{room.id === 'office' && '💻 '}{room.id === 'bedroom' && '🛏️ '}
            {room.title}
          </button>
        ))}
      </div>

      {/* Main Interactive Board split view */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch bg-surface-container-low p-4 md:p-8 rounded-xl border border-outline-variant/30">
        
        {/* Left Side: Mockup Live Canvas */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white shadow-md border border-outline-variant/20 select-none">
            {/* Base Environment Image */}
            <img
              src={currentRoom.bgImg}
              alt={currentRoom.title}
              className="w-full h-full object-cover z-0"
              referrerPolicy="no-referrer"
            />

            {/* Live Artwork overlay injection aligned inside original frame */}
            <AnimatePresence mode="wait">
              <motion.div
                key={roomArts[activeRoom].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute z-10 overflow-hidden"
                style={currentRoom.overlayStyle}
              >
                {/* Artwork preview itself */}
                <div className="w-full h-full relative group">
                  <img
                    src={roomArts[activeRoom].imageUrl}
                    alt={roomArts[activeRoom].title}
                    className="w-full h-full object-cover transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glass tint reflex simulation overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/40 pointer-events-none mix-blend-overlay" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2 text-[10px] text-white opacity-0 group-hover:opacity-100 transition font-mono tracking-wider">
                    {roomArts[activeRoom].title}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Active label indicator badge inside the preview */}
            <div className="absolute bottom-4 left-4 bg-surface-container-lowest/90 backdrop-blur-sm px-3.5 py-1.5 border border-outline-variant/50 rounded flex items-center gap-1.5 z-20 shadow-sm">
              <Fullscreen size={12} className="text-primary animate-pulse" />
              <span className="font-sans text-[11px] font-bold text-primary uppercase tracking-wider">
                Preview em Tempo Real
              </span>
            </div>
          </div>

          {/* Room explanation and info */}
          <div className="mt-4 p-4 border border-outline-variant/10 rounded-lg bg-surface">
            <h4 className="font-display text-lg font-bold text-primary">
              Sobre {currentRoom.title}
            </h4>
            <p className="text-xs text-on-surface-variant font-sans mt-0.5 leading-relaxed">
              {currentRoom.description}
            </p>
          </div>
        </div>

        {/* Right Side: Artwork Selection Panel */}
        <div className="w-full lg:w-96 flex flex-col gap-4">
          <div className="p-4 bg-surface rounded-lg border border-outline-variant/30">
            <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
              Curadoria Digital
            </span>
            <h4 className="font-display text-lg font-semibold text-primary mt-2">
              Escolha a Obra para Projetar
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed font-sans mt-1">
              Observe como diferentes técnicas (Grafite de alto contraste, Aquarela fluida e Arte Digital) alteram a harmonia de cores e a dramaticidade do espaço físico.
            </p>
          </div>

          {/* List of artworks to inject */}
          <div className="space-y-2 flex-1 overflow-y-auto max-h-[350px] lg:max-h-[400px] pr-1">
            {ARTWORKS.map((artwork) => {
              const isSelected = roomArts[activeRoom].id === artwork.id;
              return (
                <button
                  key={artwork.id}
                  onClick={() => handleSelectArt(artwork)}
                  className={`w-full p-2.5 rounded-lg border transition-all text-left flex items-center gap-3.5 cursor-pointer relative ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-outline-variant/20 bg-surface hover:border-primary/50'
                  }`}
                >
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-surface-container border border-outline-variant/20">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant block mb-0.5">
                      {artwork.technique}
                    </span>
                    <h5 className="font-display font-bold text-sm text-primary truncate leading-tight">
                      {artwork.title}
                    </h5>
                    <span className="text-xs text-on-surface-variant block mt-0.5 font-sans">
                      {artwork.categoryLabel} ({artwork.dimensions})
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-primary text-on-primary w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="bg-primary/5 p-3 rounded-lg border border-primary/25 flex items-start gap-2.5">
            <Sparkles size={16} className="text-primary mt-0.5 flex-shrink-0 animate-spin-slow" />
            <div className="text-[11px] text-on-surface-variant font-sans">
              <strong>Dica de Decoração:</strong> Imprimir em formato monumental (A2 ou maior) traz impacto artístico de alto valor em halls de entrada e salas.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
