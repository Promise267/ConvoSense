import React from 'react'

export default function Searchbar() {
  return (
    <>
    <div className="bg-orange-100 p-3">
        <input
            className="w-full p-3 rounded-md text-center appearance-none focus:outline-none"
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            />
    </div>
    </>
  )
}
