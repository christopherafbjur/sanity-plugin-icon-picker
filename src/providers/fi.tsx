import decamelize from 'decamelize'
import {createTags} from '../utils/helpers'
import * as Fi from 'react-icons/fi'
import {IconObjectArray, FormatFunction} from '../types'

type FiKey = keyof typeof Fi

const convertFormat: FormatFunction = (name, options = {}) => {
  if (options.outputFormat === 'react') return name

  const separator = '-'

  //Remove react icon prefixes/identifiers Fi
  const reactPrefix = name.replace(/^(Fi)(.*$)/, '$2')

  //Separate letters followed by numbers (decamelize defaults to omitting separation of letter followed by number)
  const prefix = reactPrefix.replace(/([a-z])([0-9])/i, `$1${separator}$2`)

  return decamelize(prefix, separator)
}

export default function (provider: string) {
  return (options = {}): IconObjectArray => {
    const icons = Object.keys(Fi).map((name) => {
      const Icon = Fi[name as FiKey]
      return {
        provider,
        name: convertFormat(name, options),
        component: () => <Icon />,
        tags: createTags(name, convertFormat),
      }
    })
    return icons
  }
}
