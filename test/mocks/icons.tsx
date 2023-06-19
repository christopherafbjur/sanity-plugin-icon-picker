import { FaBeer } from 'react-icons/fa';
import type { IconObject } from '../../src/types';

type MockIcon = Partial<IconObject>;

export const createMockIcon = (icon: MockIcon = {}) => ({
  provider: 'te',
  name: 'Test',
  component: () => <FaBeer />,
  tags: ['FaBeer', 'beer'],
  ...icon,
});

export const createMockIconArray = (
  numberOfIcons: number,
  icon: MockIcon = {}
) => new Array(numberOfIcons).fill(null).map(() => createMockIcon(icon));
