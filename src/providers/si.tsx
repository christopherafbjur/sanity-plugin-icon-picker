import decamelize from 'decamelize'
import * as Si from 'react-icons/si'
import {createTags} from '../utils/helpers'
import {IconObjectArray, FormatFunction} from '../types'

type SiKey = keyof typeof Si

const convertFormat: FormatFunction = (name, options = {}) => {
  if (options.outputFormat === 'react') return name

  const separator = '-'

  const prefix = name.replace(/^(SiReg|Si)(.*$)/, '$2')

  return decamelize(prefix, separator)
}

export default function (provider: string) {
  return (options = {}): IconObjectArray => {
    const icons = Object.keys(Si).map((name) => {
      const Icon = Si[name as SiKey]
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
