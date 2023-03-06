import {ReactElement} from 'react'
import PROVIDERS from '../../providers'
import {IconObject} from '../../types'

// eslint-disable-next-line react/display-name
export const preview = ({
  provider,
  name,
}: Pick<IconObject, 'provider' | 'name'>): ReactElement | null => {
  if (!provider) return null

  const icons = PROVIDERS[provider]()
  const found = icons.find((icon) => icon.tags.some((tag) => tag === name))
  return found?.component()
}
