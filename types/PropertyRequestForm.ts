import type { Property } from './Property';

export type PropertyRequestForm = {
  slug: Property['slug'];
  message: string;
  email: string;
  name: string;
};
