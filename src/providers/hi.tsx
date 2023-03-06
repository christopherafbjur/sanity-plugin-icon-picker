import decamelize from 'decamelize'
import * as Hi from 'react-icons/hi'
import {createTags} from '../utils/helpers'
import {IconObjectArray, FormatFunction} from '../types'

type HiKey = keyof typeof Hi

const convertFormat: FormatFunction = (name, options = {}) => {
  //FORMAT REFERENCE https://github.com/tailwindlabs/heroicons
  if (options.outputFormat === 'react') return name

  const separator = '-'

  //Remove react icon prefixes/identifiers Hi
  const reactPrefix = name.replace(/^(Hi)(.*$)/, '$2')

  //Separate letters followed by numbers (decamelize defaults to omitting separation of letter followed by number)
  const prefix = reactPrefix.replace(/([a-z])([0-9])/i, `$1${separator}$2`)

  return decamelize(prefix, separator)
}

export default function (provider: string) {
  return (options = {}): IconObjectArray => {
    const icons = Object.keys(Hi).map((name) => {
      const Icon = Hi[name as HiKey]
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
