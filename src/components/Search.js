import React from 'react'

export default function Search({ searchTerm, onSearchChange }) {
  return (
    <>
    
    <div className='border-head'>
      <h1 className='Header header-centered'>GET YOUR GRUB ON</h1>
    <div className="search-container">
      
        
        <input className="search-input"
        type="text"
        id='search'
        placeholder='Search by restaurant name or cuisine...'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        />
    </div>
    <h1 className='Header header-centered-bottom'>IN DENVER</h1>
    </div>
    </>
  )
}
