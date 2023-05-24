import * as F7 from 'framework7-icons/react'
import decamelize from 'decamelize'
import {createTags} from '../utils/helpers'
import {ICON_WIDTH, ICON_HEIGHT} from '../constants'
import {IconObjectArray, FormatFunction} from '../types'

const convertFormat: FormatFunction = (name, options = {}) => {
  if (options.outputFormat === 'react') return name

  const separator = '_'
  const prefix = name.replace(/([a-z])([0-9])/i, `$1${separator}$2`)

  return decamelize(prefix, separator)
}

const iconStyle = {width: ICON_WIDTH, height: ICON_HEIGHT, fontSize: '20px'}

export default function (provider: string) {
  return (options = {}): IconObjectArray =>
    Object.keys(F7).map((name) => {
      const Component = F7[name];
      return {
        provider,
        name: convertFormat(name, options),
        component: () => <Component style={iconStyle} />,
        tags: createTags(name, convertFormat),
      }
    })
}
