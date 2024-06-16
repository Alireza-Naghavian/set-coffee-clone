import React from 'react'
import { IoIosSearch } from 'react-icons/io'

function SearchFields({placeholder,type="text"}:{placeholder:string,type:string}) {
  return (
    <div className="input-group relative w-full flex justify-between">
    <input
      type={type}
      className="focus:outline-none w-full px-2 py-3 
      placeholder:text-main placeholder:font-Shabnam_M 
        tracking-tighter focus-within:shadow-none"
      placeholder={placeholder}
    />
    <IoIosSearch
      className="text-main absolute left-0 flex mt-3 ml-2"
      size={22}
    />
  </div>
  )
}

export default SearchFields