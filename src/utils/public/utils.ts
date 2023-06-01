import {ReactElement} from 'react'
import PROVIDERS from '../../providers'
import {IconObject} from '../../types'
import { getIcons } from '../icons'

// eslint-disable-next-line react/display-name
export const preview = ({
  provider,
  name,
}: Pick<IconObject, 'provider' | 'name'>): ReactElement | null => {
  if (!provider) return null

  const icons = PROVIDERS.find(p => provider === p.prefix)?.icons() || [];
  const found = icons.find((icon) => icon.tags.some((tag) => tag === name))
  return found?.component() || null;
}

export const migrateIconName = (name: string, provider: string, format?: 'react') => {
  const found = getIcons({outputFormat: format}).find(icon => icon.provider === provider && icon.tags.includes(name));

  if(!name){
    throw new Error(`Must specify a name! Got ${name}`)
  }
  if(!found){
    throw new Error (`Icon with name ${name} for provider ${provider} not found!`);
  }
  const [reactName, defaultName] = found.tags;
  return format === 'react' ? reactName : defaultName
}