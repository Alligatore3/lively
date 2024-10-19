import type { Property } from '@/types/Property';

const images = [
  'https://www.laconservancy.org/wp-content/uploads/2022/10/JapaneseHouse_KellySutherlinMcLeodArchitectureInc.jpg',
  'https://jlifeinternational.com/cdn/shop/articles/pexels-pixabay-161247.jpg?v=1623096114',
  'https://blog.japanwondertravel.com/wp-content/uploads/2022/09/traditional-japanese-house.jpg',
  'https://cdn.indesignlive.com/wp-content/uploads/1.japanarch.jpg',
  'https://media.timeout.com/images/106054872/750/422/image.jpg',
  'https://cdn.mos.cms.futurecdn.net/2QkeF8duJYqmxCSoLPBqQY-1200-80.jpg',
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
    id: crypto.randomUUID(),
    image,
    ...overrides,
  };
}
