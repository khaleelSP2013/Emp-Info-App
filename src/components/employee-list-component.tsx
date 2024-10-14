import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { employeeState, productFilteredState, searchTermState } from '../state/employeeState'
import { Employee } from '../models/employee';

interface EmployeeListProps {
    onEdit: (employee: Employee) => void;
  }
const EmployeeList:React.FC<EmployeeListProps> = ({onEdit}) => {
    const [employee, setEmployees] = useRecoilState(employeeState);  
    const searchTerm = useRecoilValue(searchTermState); 
    const positionFilter=useRecoilValue(productFilteredState);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const filteredEmployees = employee.filter(employee => {
        const matchesName = employee.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPosition = positionFilter === 'All' || employee.position === positionFilter;
        return matchesName && matchesPosition;
      });

    const sortedEmployees = [...filteredEmployees].sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });

    const handleSort = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
      };

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2; // Adjust as needed  

    // Calculate total pages
    const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  // Get current items
    const indexOfLastEmployee = currentPage * itemsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
    const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);


    const deleteEmployee = (id: number) => {
        const updatedEmployees = employee.filter((employee) => employee.id !== id);
        setEmployees(updatedEmployees);
      };
    return (
      <>
       <button className="button is-primary" onClick={handleSort}>
        Sort by Name ({sortOrder === 'asc' ? 'Descending' : 'Ascending'})
      </button>
      
      <button className="button is-primary">
        Total Employees :{currentEmployees.length}
      </button>
          {
            currentEmployees.map((e)=>
            <div className="box box__custom">
            <p className="subtitle is-4">{e.name}</p>
            <h5 className="subtitle is-6">{e.position}</h5>
                <button
                  className="button button-edit is-warning"
                  onClick={() => onEdit(e)}
                >
                  Edit
                </button>
                <button
                  className="button button-delete is-danger"
                  onClick={() => deleteEmployee(e.id)}
                >
                  Delete
                </button>
            </div>
        
            )
           }
      <div className="pagination is-centered">
        <button 
          className="pagination-previous" 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          className="pagination-next" 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <p className="has-text-centered">Page {currentPage} of {totalPages}</p>
    </>
    
    )
}

export default EmployeeList
