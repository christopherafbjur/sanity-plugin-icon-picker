import 'framework7-icons'
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
      const icon = convertFormat(name, {})
      return {
        provider,
        name: convertFormat(name, options),
        component: () => (
          //Cannot simply generate the F7 SVG components here yet because of a bug: https://github.com/framework7io/framework7-icons/issues/48
          <i className="f7-icons" style={iconStyle}>
            {icon}
          </i>
        ),
        tags: createTags(name, convertFormat),
      }
    })
}
