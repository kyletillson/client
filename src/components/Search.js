import React from 'react'

export default function Search({ searchTerm, onSearchChange }) {
  return (
    <div className="searchbar">
        
        <input className="searchInput"
        type="text"
        id='search'
        placeholder='Type a type of food...'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        />
    </div>
  )
}
