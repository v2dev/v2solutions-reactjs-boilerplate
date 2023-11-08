import React, { useEffect, useState } from 'react';
import { Link , useLocation} from 'react-router-dom';
import API_ENDPOINTS from "../../configs/apiConfig"
import useCrudApi from "../../hooks/useCrudApi"

const EmployeeList = () => {
  const apiEndpoint = API_ENDPOINTS.EMPLOYEES
  const {  fetchData } = useCrudApi(apiEndpoint)
  const [employees, setEmployees] = useState([]);
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state && location.state.successMessage);

  useEffect(() => {
    fetchEmpData();
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 5000);

    return () => {
      clearTimeout(timer); // Clear the timer on component unmount
    };
    
  }, [successMessage]);

  const fetchEmpData = async () => {

    try {
      const response = await fetchData('')
      if (response && !response.error) {
        setEmployees(response.employees)
      } else if (response && response.error) {
        console.log("API Error:", response.error)
      } else {
        console.log("Unexpected response:", response)
      }
    } catch (error) {
      console.log("Error adding task:", error)
    }
  };

  const handleSort = async (field) => {
    await fetchData(`?sort=${field}`);
  };

  const handleFilter = async (value) => {
    await fetchData(`?filter=${value}`);
  };


  return (
    <div className="container my-5">
      
      <div className="row justify-content-center">
        <div className="col-md-12">
          <h2 className='text-center'><strong> Employee Managment </strong></h2>
          <div className="card">
            
            <div className="card-body">
              {successMessage && ( // Conditionally render the success message
                <div className="alert alert-success">
                  {successMessage}
                </div>
              )}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by Name or Designation"
                  onChange={(e) => handleFilter(e.target.value)}
                />
              </div>

              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th className="col-md-2" onClick={() => handleSort('name')}>Name</th>
                    <th className="col-md-2" onClick={() => handleSort('email')}>Email</th>
                    {/* <th className="col-md-1" onClick={() => handleSort('dob')}>Date of Birth</th> */}
                    <th className="col-md-1" onClick={() => handleSort('designation')}>Designation</th>
                    <th className="col-md-2" onClick={() => handleSort('education')}>Education</th>
                    {/* <th className="col-md-2" onClick={() => handleSort('address')}>Address</th> */}
                    <th className="col-md-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.emp_id}>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                      {/* <td>{employee.dob}</td> */}
                      <td>{employee.designation}</td>
                      <td>{employee.education}</td>
                      {/* <td>{employee.address}</td> */}
                      <td>
                        <Link  className="btn btn-primary m-1" to={`/employee/edit/${employee._id}`}>Edit</Link>
                        <button  className="btn btn-danger" >Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
