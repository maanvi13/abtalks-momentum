export interface TourStep {
  id: string;
  title: string;
  description: string;
  route: string;
  targetAttr?: string; // e.g. 'landing-hero', 'momentum-card'
  demoState?: 'new' | 'building' | 'recovering' | 'empty' | 'graduate';
  autoFillForm?: boolean;
  triggerSubmit?: boolean;
  durationMs?: number;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}
