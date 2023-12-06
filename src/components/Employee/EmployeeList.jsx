import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import API_ENDPOINTS from '../../configs/apiConfig';
import useCrudApi from '../../hooks/useCrudApi';
import moment from 'moment';

const EmployeeList = () => {
  const apiEndpoint = API_ENDPOINTS.EMPLOYEES;
  const { fetchData, deleteData } = useCrudApi(apiEndpoint);
  const [employees, setEmployees] = useState([]);
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state && location.state.successMessage);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [rowsPerPage, setRowsPerPage] = useState(5); // Set the default value as per your requirement



  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAndSetData();
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage]);
  useEffect(() => {
    // This effect will run after the state has been updated
    fetchAndSetData(1); // Fetch data for the first page when rowsPerPage changes
  }, [rowsPerPage]); // Run the effect whenever rowsPerPage changes
  
  const fetchAndSetData = async (page = 1, filterValue = '') => {
    try {
      const response = await fetchData(`?page=${page}&limit=${rowsPerPage}&sort=${sortOrder}&sortedColumn=${sortColumn}&filter=${filterValue}`);
      if (response && !response.error) {
        setEmployees(response.employees);
        setTotalPages(response.totalPages);
        setCurrentPage(page);
      } else if (response && response.error) {
        console.log('API Error:', response.error);
      } else {
        console.log('Unexpected response:', response);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };
  const handleRowsPerPageChange = (e) => {

    const newRowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(newRowsPerPage);

  };


  const handleSortAndFilter = async (field, value = '') => {
    
    const newSortOrder = sortColumn === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(field);
    setSortOrder(newSortOrder);

    await fetchAndSetData(currentPage, value);
  };

  const handleDelete = async () => {
    if (deletingEmployee) {
      try {
        const response = await deleteData(`${deletingEmployee._id}`);
        if (response && !response.error) {
          setSuccessMessage('Employee deleted successfully.');
          setConfirmDelete(false);
          setDeletingEmployee(null);
          fetchAndSetData(currentPage);
        } else if (response && response.error) {
          console.log('API Error:', response.error);
        } else {
          console.log('Unexpected response:', response);
        }
      } catch (error) {
        console.log('Error deleting employee:', error);
      }
    }
  };

  const renderTableRows = () => {
    return employees.map((employee) => (
      <tr key={employee.emp_id}>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{moment(employee.dob).format('DD-MM-YYYY')}</td> {/* Format dob here */}

        <td>{employee.designation}</td>
        <td>{employee.education}</td>
        <td>
          <Link className="btn btn-primary m-1" to={`/employee/edit/${employee._id}`}>
            Edit
          </Link>
          <button className="btn btn-danger" onClick={() => { setDeletingEmployee(employee); setConfirmDelete(true); }}>
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  

  return (
    <div className=" my-1">
      <div className="row justify-content-center">
        <div className="col-md-12">
          
          <div className="card">
            <div className="card-body">
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Filter by Name "
                  onChange={(e) => handleSortAndFilter('name', e.target.value)}
                />
              </div>

              <table className="table table-bordered table-striped">
                <thead>
                <tr>
                  <th className="col-md-2" onClick={() => handleSortAndFilter('name')}>
                    Name {sortColumn === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className="col-md-2" onClick={() => handleSortAndFilter('email')}>
                    Email {sortColumn === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className="col-md-1" onClick={() => handleSortAndFilter('dob')}>
                    Date of Birth {sortColumn === 'dob' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className="col-md-1" onClick={() => handleSortAndFilter('designation')}>
                    Designation {sortColumn === 'designation' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className="col-md-2" onClick={() => handleSortAndFilter('education')}>
                    Education {sortColumn === 'education' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                  <th className="col-md-2">Actions</th>
                </tr>

                </thead>
                <tbody>{renderTableRows()}</tbody>

              </table>

              <div className="d-flex justify-content-between mb-3">
                <nav aria-label="Page navigation">
                  <ul className="pagination ">
                    {[...Array(totalPages).keys()].map((page) => (
                      <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => fetchAndSetData(page + 1)}>
                          {page + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                <div className="mb-3">
                  <label htmlFor="rowsPerPage" className="form-label mr-2">
                    Row Per Page:
                  </label>
                  <select
                    id="rowsPerPage"
                    className="form-control"
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>

              </div>



              {confirmDelete && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Confirmation</h5>
                        <button
                          type="button"
                          className="close"
                          onClick={() => setConfirmDelete(false)}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>Are you sure you want to delete this employee?</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setConfirmDelete(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
