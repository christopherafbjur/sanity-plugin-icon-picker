import * as saIcons from '@sanity/icons'
import {createTags} from '../utils/helpers'
import {ICON_WIDTH, ICON_HEIGHT} from '../constants'
import {FormatFunction} from '../types'

const convertFormat: FormatFunction = (name, options, reactName) => {
  if (options.outputFormat === 'react') return reactName || name
  return name
}

export default function (provider: string) {
  return (options = {}) =>
    Object.entries(saIcons.icons).map((icon) => {
      const name: string = icon[0]
      const reactName: string = icon[1].render.name.replace(/2$/, '')
      return {
        provider,
        name: convertFormat(name, options, reactName),
        component: () => icon[1].render({width: ICON_WIDTH, height: ICON_HEIGHT}),
        tags: createTags(name, convertFormat),
      }
    })
}
