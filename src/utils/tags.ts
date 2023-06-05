import type { FormatFunction } from '../types';

//Creates tags that can be applied to icon objects for subset filtering with support for adding both react names and default names
export function createTags(
  name: string,
  formatFn: FormatFunction
): [string, string] {
  const reactName = formatFn(name, { outputFormat: 'react' });
  const defaultName = formatFn(name, {});
  return [reactName, defaultName];
}
