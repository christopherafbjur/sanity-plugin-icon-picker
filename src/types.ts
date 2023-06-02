import {ReactElement} from 'react'

interface CustomProvider {
  title: string
  prefix: string
  icons: (options: IconPickerOptions) => IconObject[]
}
export interface IconPickerOptions {
  providers?: string[]
  outputFormat?: string
  filter?: (string | RegExp)[]
  customProviders?: CustomProvider[]
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

export interface Provider {
  prefix: string
  title: string
}

export interface ProviderConfiguration {
  title: string
  prefix: string
  icons: (options?: IconPickerOptions) => ConfigurationIconObjectArray
}
