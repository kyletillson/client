import React from 'react'

export default function Search({ searchTerm, onSearchChange }) {
  return (
    <div className="search-container">
        
        <input className="search-input"
        type="text"
        id='search'
        placeholder='Search by restaurant name or cuisine...'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        />
    </div>





  )
}
