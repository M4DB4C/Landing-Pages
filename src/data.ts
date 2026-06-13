import { Artwork } from './types';
import { imagePaths } from './imagePaths';

export const ARTWORKS: Artwork[] = [
  {
    id: 'graphite-portrait',
    title: 'Ancião do Tempo',
    category: 'grafite',
    categoryLabel: 'Grafite',
    technique: 'Hiper-realismo (Grafite sob Papel Arches)',
    year: '2024',
    basePrice: 180,
    availability: 'disponivel',
    availabilityLabel: 'Disponível',
    description: 'Um retrato hiper-realista em grafite de um idoso expressivo, com riqueza máxima em cada textura, vinco e brilho do olhar. Captura a solenidade do tempo através de contraste rico e técnica minuciosa de sombreamento.',
    imageUrl: imagePaths.anciaoDoTempo,
    dimensions: '50x70 cm'
  },
  {
    id: 'watercolor-fluid',
    title: 'Sinfonia Fluida',
    category: 'aquarela',
    categoryLabel: 'Aquarela',
    technique: 'Aquarela e Pigmento Metálico',
    year: '2023',
    basePrice: 150,
    availability: 'disponivel',
    availabilityLabel: 'Disponível',
    description: 'Interação etérea de azuis profundos, corais suaves e filamentos de ouro líquido. Uma celebração da dinâmica dos fluidos e transparência da luz solar em pigmentos de algodão.',
    imageUrl: imagePaths.sintoniaFluida,
    dimensions: '40x55 cm'
  },
  {
    id: 'digital-structure',
    title: 'Portal Vetorial',
    category: 'digital',
    categoryLabel: 'Arte Digital',
    technique: 'Arte Vetorial Digital & Render 3D',
    year: '2024',
    basePrice: 120,
    availability: 'exposicao',
    availabilityLabel: 'Exposição',
    description: 'Estudo futurista de simetria angular, gradientes de carvão e neon azul. Uma fusão de arquitetura digital extrema e iluminação interna, criando profundidade tridimensional em tela plana.',
    imageUrl: imagePaths.portalVetorial,
    dimensions: '60x60 cm'
  },
  {
    id: 'hands-intertwined',
    title: 'Conexão Silenciosa',
    category: 'grafite',
    categoryLabel: 'Grafite',
    technique: 'Grafite e Carvão sob Papel Algodão',
    year: '2024',
    basePrice: 220,
    availability: 'disponivel',
    availabilityLabel: 'Disponível',
    description: 'Estudo anatômico majestoso mostrando duas mãos humanas entrelaçadas, enfatizando tendões, veias e o toque sutil com riqueza de detalhes luminescentes.',
    imageUrl: imagePaths.conexaoSilenciosa,
    dimensions: '50x50 cm'
  }
];

export const MOCKUPS = [
  {
    id: 'sala',
    title: 'Sala de Estar Moderna',
    imageUrl: imagePaths.salaEstarModerna,
    defaultArtwork: 'hands-intertwined',
    description: 'Ambiente com pé-direito alto, concreto natural e sofisticação minimalista.'
  },
  {
    id: 'office',
    title: 'Home Office Criativo',
    imageUrl: imagePaths.homeOfficeCriativo,
    defaultArtwork: 'watercolor-fluid',
    description: 'Estúdio focado em concentração, com iluminação lateral natural e tons terrosos.'
  },
  {
    id: 'bedroom',
    title: 'Dormitório Contemporâneo',
    imageUrl: imagePaths.dormitorioContemporaneo,
    defaultArtwork: 'digital-structure',
    description: 'Canto minimalista acolhedor com concreto aparente e iluminação de filamento quente.'
  }
];

export const ACCORDION_FAQS = [
  {
    question: 'Como funciona o licenciamento de arte digital?',
    answer: 'Ao adquirir ou licenciar uma obra do M4d-B4C Studio, você recebe arquivos em alta resolução preparados para impressão profissional e uso pessoal ou projetual conforme o tipo de licença contratado. Projetos especiais podem incluir informações de autoria, versão, licença e proveniência.'
  },
  {
    question: 'Qual é o melhor tipo de papel para imprimir as obras?',
    answer: 'Para grafite e aquarela, recomendamos papel Fine Art de algodão (giclée) com gramatura de 300g+. Para arte digital, acabamento acetinado, acrílico, metal ou impressão direta em suporte rígido podem criar presença visual mais contemporânea.'
  },
  {
    question: 'Vocês realizam encomendas personalizadas?',
    answer: 'Sim. O M4d-B4C Studio aceita um número limitado de projetos sob medida por semestre. Use o formulário de encomendas para descrever a ideia, o ambiente, as dimensões desejadas, a técnica e a finalidade de uso.'
  },
  {
    question: 'Qual o tempo de envio para as obras físicas sob demanda?',
    answer: 'O prazo depende do suporte, dimensão e tipo de moldura. Em geral, prints e molduras sob demanda exigem alguns dias úteis de produção para garantir acabamento, escala, encaixe e controle de qualidade adequados.'
  }
];
