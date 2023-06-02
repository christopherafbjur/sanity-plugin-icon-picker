import {ReactElement} from 'react'

export interface IconPickerOptions {
  providers?: string[]
  outputFormat?: string
  filter?: (string | RegExp)[]
  configurations?: ProviderConfiguration[]
}

export interface IconObject {
  provider: string
  name: string
  component: () => ReactElement
  tags: [string, string]
}

export type ConfigurationIconObject = Omit<IconObject, 'provider'>

type ConfigurationIconObjectArray = Array<ConfigurationIconObject>

export type IconObjectArray = Array<IconObject>

export type FormatFunction = (
  name: string,
  options: IconPickerOptions,
  reactName?: string
) => string

export interface ProviderConfiguration {
  title: string
  provider: string
  icons: (options?: IconPickerOptions) => ConfigurationIconObjectArray
}
