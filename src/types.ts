import {ReactElement} from 'react'

export interface IconPickerOptions {
  providers?: string[]
  outputFormat?: string
  filter?: (string | RegExp)[]
}

export interface IconObject {
  provider: string
  name: string
  component: () => ReactElement
  tags: [string, string]
}

export type IconObjectArray = Array<IconObject>

export type FormatFunction = (
  name: string,
  options: IconPickerOptions,
  reactName?: string
) => string

export interface Provider {
  prefix: string
  title: string
}
