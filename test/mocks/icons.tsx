import { FaBeer } from 'react-icons/fa';

export const mockIcon = {
  provider: 'te',
  name: 'Test',
  component: () => <FaBeer />,
  tags: ['FaBeer', 'beer'],
};

export const mockIconArray = new Array(10).fill(null).map(() => mockIcon);

export const createMockIconArray = (
  numberOfIcons: number,
  { provider }: { provider: string } = { provider: 'te' }
) =>
  new Array(numberOfIcons).fill(null).map(() => ({
    provider: provider,
    name: 'Test',
    component: () => <FaBeer />,
    tags: ['FaBeer', 'beer'],
  }));
