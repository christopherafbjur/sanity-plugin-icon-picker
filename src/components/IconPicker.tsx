import {useState, useEffect} from 'react'
import {ObjectInputProps, set, unset, setIfMissing} from 'sanity'
import {Card} from '@sanity/ui'
import {ICON_WIDTH, ICON_HEIGHT, LOADING_TIMER_MS} from '../constants'
import Popup from './Popup'
import SearchBar, {SearchBarOnChange} from './SearchBar'
import SearchResults, {SearchResultsOnSelectCallback} from './SearchResults'
import Tabs from './Tabs'
import Menu, {Action, MenuClickCallback} from './Menu'
import {IconContext} from 'react-icons'
import {getIcons} from '../utils/icons'
import {IconObject, IconObjectArray} from '../types'

function getIconByValue(name: string, icons: IconObjectArray) {
  const found = icons.find((icon) => icon.name === name)
  return found || null
}

const IconPicker = ({schemaType, value = {}, onChange}: ObjectInputProps) => {
  const [selected, setSelected] = useState<IconObject | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [queryResults, setQueryResults] = useState<IconObjectArray>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading) {
      setLoading(true)
    }
    const timeoutId = setTimeout(() => {
      const icons = getIcons(schemaType.options)
      const results = icons.filter((icon) => icon.name.toLowerCase().indexOf(query) >= 0)
      setSelected(getIconByValue(value.name, icons))
      setQueryResults(results)
      setLoading(false)
    }, LOADING_TIMER_MS)
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const unsetIcon = () => {
    onChange(unset())
    setSelected(null)
  }

  const setIcon: SearchResultsOnSelectCallback = (icon) => {
    if (selected && icon.name === selected.name) return unsetIcon()

    onChange([
      setIfMissing({
        _type: schemaType.name,
      }),
      set(icon.name, ['name']),
      set(icon.provider, ['provider']),
    ])

    return setSelected(icon)
  }

  const openPopup = () => {
    setIsPopupOpen(true)
  }
  const closePopup = () => {
    setIsPopupOpen(false)
    setQuery('')
  }

  const onQueryChange: SearchBarOnChange = (e) => {
    const searchQuery = e.target.value
    setQuery(searchQuery)
  }
  const handleMenuClick: MenuClickCallback = (action) => {
    if (action === Action.add) return setIsPopupOpen(true)
    if (action === Action.edit) return openPopup()
    if (action === Action.delete) return unsetIcon()
    return new Error('Unsupported action')
  }

  const onTabClick = () => {
    if (!loading) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, LOADING_TIMER_MS)
    }
  }

  const hideTabs = schemaType.options?.providers?.length === 1

  return (
    <Card>
      <IconContext.Provider value={{ style: { width: ICON_WIDTH, height: ICON_HEIGHT } }}>
        <Menu onClick={handleMenuClick} selected={selected} />

        <Popup onClose={closePopup} isOpen={isPopupOpen}>
          <SearchBar value={query} onChange={onQueryChange} />
          {hideTabs ? (
            <SearchResults
              results={queryResults}
              selected={selected}
              onSelect={setIcon}
              loading={loading}
              query={query}
            />
          ) : (
            <Tabs options={schemaType.options} onClick={onTabClick}>
              <SearchResults
                results={queryResults}
                selected={selected}
                onSelect={setIcon}
                loading={loading}
                query={query}
              />
            </Tabs>
          )}
        </Popup>
      </IconContext.Provider>
    </Card>
  )
}

export default IconPicker
