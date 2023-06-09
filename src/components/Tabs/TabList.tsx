import { TabList as SanityTabList } from '@sanity/ui';
import { Tab } from './Tab';

export const TabList = ({
  providers,
  onClick,
}: {
  providers: string[];
  onClick: () => void;
}) => {
  return (
    <SanityTabList space={1}>
      {[...providers].map((provider) => (
        <Tab key={provider} provider={provider} onClick={onClick} />
      ))}
    </SanityTabList>
  );
};
