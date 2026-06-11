import React, { useState } from 'react';
import { Send, CheckCircle2, ChevronRight, PenTool, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomProjectRequest } from '../types';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    technique: 'grafite' as 'grafite' | 'aquarela' | 'digital',
    dimensions: 'Grande (50x70cm)',
    description: '',
    newsletter: true
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Por favor, informe seu nome.';
    if (!form.email.trim()) {
      newErrors.email = 'Por favor, informe seu e-mail.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Insira um e-mail válido.';
    }
    if (!form.phone.trim()) newErrors.phone = 'Por favor, informe seu WhatsApp.';
    if (!form.description.trim()) newErrors.description = 'Conte um pouco sobre o projeto dos seus sonhos.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // Mock log the custom request parameters
      console.log('Premium Custom Project Request submitted: ', form);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      technique: 'grafite',
      dimensions: 'Grande (50x70cm)',
      description: '',
      newsletter: true
    });
    setSubmitted(false);
    setErrors({});
  };

  return (
    <section id="contact" className="max-w-[1280px] mx-auto px-4 md:px-16 py-16 scroll-mt-24">
      <div className="flex flex-col lg:flex-row gap-12 items-stretch">
        
        {/* Left Side: Creative Editorial Content */}
        <div className="flex-1 flex flex-col justify-between p-6 md:p-8 bg-surface-container rounded-xl border border-outline-variant/30 relative overflow-hidden">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#dac1bc] uppercase block mb-2">
              Projetos Especiais & Encomendas
            </span>
            <h3 className="font-display text-3xl md:text-5xl text-primary font-bold tracking-tight mb-6">
              Vamos transformar seu espaço?
            </h3>
            <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed max-w-lg mb-8">
              O artista aceita encomendas sob demanda para retratos hiper-realistas, aquarelas decorativas exclusivas ou artes digitais sob medida para salas corporativas, hotéis ou lares que apreciam a excelência artística. 
            </p>

            {/* Quality indicators list */}
            <div className="space-y-4 max-w-md">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 flex-shrink-0">
                  <PenTool size={11} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-primary">Técnica Original Manual ou Digital</h4>
                  <p className="text-xs text-on-surface-variant font-sans mt-0.5 leading-relaxed">
                    Você acompanha todas as fases do esboço, sombreamento e finalização através de relatórios visuais digitais privados.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1 flex-shrink-0">
                  <Sparkles size={11} />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-primary">Autenticidade Consagrada</h4>
                  <p className="text-xs text-on-surface-variant font-sans mt-0.5 leading-relaxed">
                    Cada trabalho encomendado é de peça única assinado e acompanhado por um registro de proveniência criptográfico.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-outline-variant/30 text-xs text-on-surface-variant font-sans italic flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span>Disponível para projetos internacionais de licenciamento.</span>
            <span className="text-[#dac1bc] font-mono not-italic uppercase tracking-wider text-[10px]">
              Agenda Curatorial: Ativa
            </span>
          </div>

          {/* Subtly textured amber vector orb in the background */}
          <div className="absolute top-2/3 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Right Side: The Premium Inputs Form */}
        <div className="flex-1 bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/30">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div>
                  <h4 className="font-display text-xl font-bold text-primary mb-1">
                    Solicitar Orçamento de Projeto
                  </h4>
                  <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                    Preencha os campos abaixo e entraremos em contato via WhatsApp/E-mail em até 24 horas úteis.
                  </p>
                </div>

                {/* 1. Nome Completo */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                    Seu Nome Completo
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ex: Pedro Henrique Silva"
                    className="bg-transparent border-b border-outline/40 focus:border-primary focus:outline-none py-2 text-sm text-on-surface transition font-sans placeholder-on-surface-variant/30"
                  />
                  {errors.name && (
                    <span className="text-[10px] text-error font-medium mt-1 uppercase tracking-wide">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* 2. E-mail e Telefone (Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                      E-mail para Contato
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Ex: pedro@email.com"
                      className="bg-transparent border-b border-outline/40 focus:border-primary focus:outline-none py-2 text-sm text-on-surface transition font-sans placeholder-on-surface-variant/30"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-error font-medium mt-1 uppercase tracking-wide">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                      WhatsApp / Celular
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Ex: (11) 99999-8888"
                      className="bg-transparent border-b border-outline/40 focus:border-primary focus:outline-none py-2 text-sm text-on-surface transition font-sans placeholder-on-surface-variant/30"
                    />
                    {errors.phone && (
                      <span className="text-[10px] text-error font-medium mt-1 uppercase tracking-wide">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* 3. Escolha Técnica (Editorial Segmented buttons) */}
                <div>
                  <label className="block text-[10px] font-sans font-bold uppercase tracking-wider text-on-surface-variant mb-2">
                    Técnica Artística de Preferência
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['grafite', 'aquarela', 'digital'] as const).map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => setForm({ ...form, technique: tech })}
                        className={`py-2 px-3 border text-center text-xs rounded font-sans uppercase font-bold tracking-wider transition cursor-pointer ${
                          form.technique === tech
                            ? 'bg-primary text-on-primary border-primary'
                            : 'border-outline-variant/30 text-on-surface-variant hover:border-primary/50'
                        }`}
                      >
                        {tech === 'grafite' && 'Grafite'}
                        {tech === 'aquarela' && 'Aquarela'}
                        {tech === 'digital' && 'Digital'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Escolha de Dimensões desejadas */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                    Dimensões da Obra / Tamanho Estimado
                  </label>
                  <select
                    value={form.dimensions}
                    onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                    className="bg-transparent border-b border-outline/40 focus:border-primary focus:outline-none py-2 text-sm text-on-surface transition font-sans"
                  >
                    <option value="Pequeno (30x30cm - Quadrado)">Pequeno (30x30cm - Quadrado)</option>
                    <option value="Médio (40x55cm)">Médio (40x55cm)</option>
                    <option value="Grande (50x70cm)">Grande (50x70cm - Recomendado)</option>
                    <option value="Monumental (80x100cm)">Monumental (80x100cm)</option>
                    <option value="Sob Medida / Parede Inteira">Sob Medida / Parede Inteira</option>
                  </select>
                </div>

                {/* 5. Descrição / Escopo */}
                <div className="flex flex-col">
                  <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-on-surface-variant mb-1">
                    Descrição da Obra Desejada (Tema, Elementos, Paleta de Cores)
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Descreva sua visão no detalhe. Ex: Um retrato realista do meu pai em papel algodão cinza escuro, focado na iluminação de contraste do rosto..."
                    className="bg-transparent border-b border-outline/40 focus:border-primary focus:outline-none py-2 text-sm text-on-surface transition font-sans placeholder-on-surface-variant/30 resize-none"
                  />
                  {errors.description && (
                    <span className="text-[10px] text-error font-medium mt-1 uppercase tracking-wide">
                      {errors.description}
                    </span>
                  )}
                </div>

                {/* Submit button bar */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary py-4 rounded font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary-container transition shadow-sm cursor-pointer"
                  >
                    Enviar Solicitação Segura <Send size={12} />
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Success Panel Screen */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold text-primary">
                    Inquérito Recebido!
                  </h4>
                  <p className="font-sans text-xs text-on-surface-variant mt-2 max-w-sm mx-auto leading-relaxed">
                    Olá <strong>{form.name}</strong>, sua proposta de encomendar uma obra em <strong>{form.technique.toUpperCase()}</strong> foi catalogada sob o registro número <strong>#EN-2026-94</strong>. 
                  </p>
                  <p className="font-sans text-xs text-on-surface-variant mt-3 max-w-sm mx-auto leading-relaxed italic border-l-2 border-primary/30 pl-3">
                    "Em menos de 24 horas, o artista ou nosso curador entrará em contato via WhatsApp/e-mail para dar seguimento ao esboço."
                  </p>
                </div>

                <div className="pt-4 flex flex-col gap-2">
                  <button
                    onClick={resetForm}
                    className="w-full bg-primary text-on-primary py-3 font-sans text-xs font-bold uppercase tracking-wider rounded hover:bg-primary-container transition cursor-pointer"
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
