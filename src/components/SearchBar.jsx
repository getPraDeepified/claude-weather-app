import { useState, useEffect, useRef } from 'react'
import { DEBOUNCE_MS } from '../constants'

export default function SearchBar({
  onSearch,
  suggestions,
  onSelect,
  searching,
  theme,
  recentSearches = [],
  onClearRecent,
}) {
  const [query, setQuery] = useState('')
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const [focused, setFocused] = useState(false)
  const debounceRef = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => onSearch(query.trim()), DEBOUNCE_MS)
    return () => clearTimeout(debounceRef.current)
  }, [query, onSearch])

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onSearch('')
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [onSearch])

  function handleSelect(city) {
    setQuery(`${city.name}, ${city.countryCode}`)
    onSelect(city)
    setFocused(false)
  }

  const showRecent = focused && !query && recentSearches.length > 0 && suggestions.length === 0
  const activeList = suggestions.length > 0 ? suggestions : showRecent ? recentSearches : []

  function handleKeyDown(e) {
    if (!activeList.length) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightIndex((prev) => Math.min(prev + 1, activeList.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightIndex((prev) => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightIndex >= 0) {
          handleSelect(activeList[highlightIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        onSearch('')
        setFocused(false)
        break
    }
  }

  const isOpen = activeList.length > 0
  const inputClass = theme?.dark
    ? 'bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-white/50'
    : 'bg-black/10 text-gray-900 placeholder-gray-500 border-black/20 focus:border-black/40'

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <span className="absolute left-4 text-lg opacity-60" aria-hidden="true">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setHighlightIndex(-1)
          }}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search city…"
          maxLength={100}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="search-listbox"
          aria-activedescendant={highlightIndex >= 0 ? `suggestion-${highlightIndex}` : undefined}
          aria-label="Search for a city"
          autoComplete="off"
          className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-medium outline-none transition-all duration-200 ${inputClass}`}
          style={{ backdropFilter: 'blur(10px)' }}
        />
        {searching && (
          <span className="absolute right-4 text-xs opacity-50 animate-pulse" aria-hidden="true">
            …
          </span>
        )}
      </div>

      {isOpen && (
        <ul
          id="search-listbox"
          role="listbox"
          aria-label={showRecent ? 'Recent searches' : 'City suggestions'}
          className="absolute top-full mt-2 w-full rounded-2xl overflow-hidden shadow-2xl z-50"
          style={{
            background: 'rgba(15,15,25,0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {showRecent && (
            <div className="flex items-center justify-between px-4 pt-3 pb-1">
              <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
                Recent
              </span>
              {onClearRecent && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onClearRecent()
                  }}
                  className="text-white/30 hover:text-white/60 text-xs transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          )}
          {activeList.map((city, i) => (
            <li
              key={city.id}
              id={`suggestion-${i}`}
              role="option"
              aria-selected={i === highlightIndex}
              onClick={() => handleSelect(city)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 ${
                i === highlightIndex ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <span className="text-base" aria-hidden="true">
                {showRecent ? '🕐' : '📍'}
              </span>
              <div>
                <p className="text-white text-sm font-medium">{city.name}</p>
                <p className="text-white/50 text-xs">
                  {[city.region, city.country].filter(Boolean).join(', ')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
