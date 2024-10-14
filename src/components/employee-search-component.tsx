import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { employeeState, productFilteredState, searchTermState } from '../state/employeeState'
import '../search.style.css'
const EmployeeSearch = () => {
    const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
    
  return (
    <div>
       <h3 className="subtitle is-6 mb-2">Search </h3>
      <input
        type="text"
        className="input"
        placeholder="Search your name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
       
    </div>
  )
}

export default EmployeeSearch
