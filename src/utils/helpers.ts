import {PROVIDERS} from '../config'
import {FormatFunction, IconObjectArray, Provider, IconPickerOptions} from '../types'

export function getSelectedProviders(options: IconPickerOptions = {}): string[] {
  return [PROVIDERS.default.prefix, ...getAcceptedProviders(options.providers)]
}

export function getAcceptedProviders(providers: string[] = []): string[] {
  const filterOutDefault = (provider: Provider) => provider.prefix !== 'all-icons'
  const mapPrefixes = (provider: Provider) => provider.prefix
  const available: string[] = Object.values(PROVIDERS).filter(filterOutDefault).map(mapPrefixes)

  const filtered = [...providers].filter(function (e) {
    return available.indexOf(e) >= 0
  }, available)

  if (!providers.length) return available

  return filtered
}

export function providerFromPrefix(prefix: string): Provider {
  return Object.values(PROVIDERS).find((provider) => provider.prefix === prefix) as Provider
}

export function listToMatrix(
  list: IconObjectArray,
  elementsPerSubArray: number
): Array<IconObjectArray> {
  const matrix: Array<IconObjectArray> = []

  for (let i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++
      matrix[k] = []
    }
    matrix[k].push(list[i])
  }

  return matrix
}

//Creates tags that can be applied to icon objects for subset filtering with support for adding both react names and default names
export function createTags(name: string, formatFn: FormatFunction): [string, string] {
  const reactName = formatFn(name, {outputFormat: 'react'})
  const defaultName = formatFn(name, {})
  return [reactName, defaultName]
}
