import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { employeeState } from '../state/employeeState';
import { Employee } from '../models/employee';

interface EmployeeFormProps{
    selectedEmployee:Employee | null,
    onCancel:()=> void
}
const positions = ["All", "Manager", "Developer", "Designer","Technical Lead","Principal Engineer "]; 

const EmployeeForm: React.FC<EmployeeFormProps> = ({selectedEmployee,onCancel}) => {
    const [employees, setEmployees] = useRecoilState(employeeState);
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [errors, setErrors] = useState<{ name?: string; position?: string }>({});


    const validateForm = () => {
      const newErrors: { name?: string; position?: string } = {};
      if (!name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!position.trim()) {
        newErrors.position = 'Position is required';
      }
      return newErrors;
    };
  
    useEffect(()=>{
        if(selectedEmployee){
            setName(selectedEmployee.name);
            setPosition(selectedEmployee.position)
        }else{
            setName('');
            setPosition('')
        }
    },[selectedEmployee])

    const handlerSubmit=(e: React.FormEvent)=>{
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
        if(selectedEmployee){
            const updateEmplyee=employees.map((e)=>
                e.id==selectedEmployee.id? {...e,name,position}:e
            )
            setEmployees(updateEmplyee)
        }else{
            const newEmployee:Employee={
                id: employees.length + 1,
               name,
               position
           }
           setEmployees([...employees,newEmployee]);
           setName('');
           setPosition('');
        }
        onCancel();
    }
  return (
    <>

<div className="container">
      <div className="section">
        <div className="card">
          <div className="card-header">
          
            <p className="card-header-title">Employee Info -Using  Recoil State Management</p>
          </div>
          <div className="card-content">
            <form onSubmit={handlerSubmit}>
              <div className="columns">
                <div className="column is-3">
                <label htmlFor="name">Employee Name</label>
                  <input
                    className={`input form-control ${errors.name ? 'is-invalid' : ''}`}
                    type="text"
                    placeholder="Enter Employee Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) {
                        setErrors({ ...errors, name: undefined });
                      }
                    }}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="column is-3">
                <label htmlFor="position">Select Employee Position</label>
                  <div className="select is-fullwidth">
                    <select
                      value={position}
                      className={`input form-control ${errors.position ? 'is-invalid' : ''}`}
                      onChange={(e) => {
                        setPosition(e.target.value);
                        if (errors.position) {
                          setErrors({ ...errors, position: undefined });
                        }
                      }}
                    >
                      {positions.map((position) => (
                      <option key={position} value={position}>
                          {position}
                    </option>
              ))}
                    </select>
                  </div>
                  {errors.position && <div className="invalid-feedback">{errors.position}</div>}
                </div>
            
                <div className="column is-3"></div>
              </div>
              <button className="button is-primary" type="submit">
        {selectedEmployee ? 'Update Employee' : 'Add Employee'}
        </button>
        <button
          className="button is-primary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
            </form>
          </div>
        </div>
      </div>
    </div>

      {/* <div className="container">
      <form onSubmit={handlerSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            placeholder="Enter Position"
            value={position}
            onChange={(e)=>setPosition(e.target.value)}
          />
        </div>

        <button className="button is-primary" type="submit">
        {selectedEmployee ? 'Update Employee' : 'Add Employee'}
        </button>
        <button
          className="button is-primary"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </div> */}
    </>
  )
}

export default EmployeeForm
