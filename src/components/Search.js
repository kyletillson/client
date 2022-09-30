import React from 'react'

export default function Search({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
        
        <input className="search-input"
        type="text"
        id='search'
        placeholder='Type a type of food...'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        />
    </div>
  )
}
