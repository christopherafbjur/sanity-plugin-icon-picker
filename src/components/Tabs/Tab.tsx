import { Tab as SanityTab } from '@sanity/ui';
import { useOptions } from '../../hooks/useOptions';
import { configurationTitleFromProvider } from '../../utils/helpers';
import { useTabs } from './useTabs';

interface TabProps {
  provider: string;
  onClick: () => void;
}
export const Tab = ({ provider, onClick }: TabProps) => {
  const options = useOptions();
  const { selectedTabId, setSelectedTabId } = useTabs();

  const handleClick = (id: string) => {
    setSelectedTabId(id);
    onClick();
  };

  const title = configurationTitleFromProvider(provider, options);

  return (
    <SanityTab
      aria-controls={`${provider}-panel`}
      id={`${provider}-tab`}
      label={`${title}`}
      onClick={() => handleClick(provider)}
      selected={selectedTabId === provider}
    />
  );
};
