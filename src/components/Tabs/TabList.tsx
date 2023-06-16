import { TabList as SanityTabList } from '@sanity/ui';
import { Tab } from './Tab';

export const TabList = ({ providers }: { providers: string[] }) => {
  return (
    <SanityTabList space={1}>
      {[...providers].map((provider) => (
        <Tab key={provider} provider={provider} />
      ))}
    </SanityTabList>
  );
};
