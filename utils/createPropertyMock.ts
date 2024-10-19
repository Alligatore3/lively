import type { Property } from '@/types/Property';

const images = [
  'https://images.unsplash.com/photo-1623634068161-7f4b68a4a159?q=80&w=4142&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1661964280088-b34b10530616?q=80&w=3771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1646719861969-6c767255190e?q=80&w=4148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1700049378269-a1dae6a3cd89?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1723698634159-849048be3cf3?q=80&w=4051&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1613954100945-fb1a8a1ee41f?q=80&w=3776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1698877036155-dd730fc2ca5b?q=80&w=4031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1723669629708-0de9b27820b5?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

function randomElementWithFairness(values: string[]) {
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

function randomValueInRange(min: number, max: number): number {
  const range = max - min + 1;
  return Math.floor(Math.random() * range) + min;
}

export function createPropertyMock(overrides?: Partial<Property>): Property {
  const image = randomElementWithFairness(images);

  return {
    address: '15 S Aurora Ave, Miami',
    price: randomValueInRange(100, 900),
    bedroom: randomValueInRange(1, 9),
    rooms: randomValueInRange(1, 9),
    mq: randomValueInRange(30, 200),
    image,
    ...overrides,
  };
}
