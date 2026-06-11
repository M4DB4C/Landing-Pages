export interface Artwork {
  id: string;
  title: string;
  category: 'grafite' | 'aquarela' | 'digital';
  categoryLabel: string;
  technique: string;
  year: string;
  basePrice: number;
  availability: 'disponivel' | 'exposicao';
  availabilityLabel: 'Disponível' | 'Exposição';
  description: string;
  imageUrl: string;
  dimensions: string;
}

export type FrameColor = 'black' | 'wood' | 'white';
export type PrintSize = 'A4' | 'A3' | 'A2';
export type PaperFinish = 'matte' | 'satin' | 'fineart';

export interface FrameConfig {
  frameColor: FrameColor;
  size: PrintSize;
  finish: PaperFinish;
}

export interface CartItem {
  id: string; // unique hash of artworkId + config combo
  artwork: Artwork;
  config: FrameConfig;
  price: number;
  quantity: number;
}

export interface CustomProjectRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  technique: 'grafite' | 'aquarela' | 'digital';
  dimensions: string;
  description: string;
  status: 'pending' | 'reviewed';
}
