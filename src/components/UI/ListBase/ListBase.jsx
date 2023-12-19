/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import useCrudApi from '../../../hooks/useCrudApi';
const ListBase = ({
  apiEndpoint,
  listColumns,
  rowsPerPageOptions = [5, 10, 20],
  defaultRowsPerPage = 5,
  editRoutePattern,
  onEditClick,
}) => {
    
  const { fetchData, deleteData } = useCrudApi(apiEndpoint);
  const [data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const [sortColumn, setSortColumn] = useState(listColumns[0].key);
  const [sortOrder, setSortOrder] = useState('asc');
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [confirmDelete, setConfirmDelete] = useState(false); // Add this line
  
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
    fetchAndSetData(1);
  }, [rowsPerPage]);

  const fetchAndSetData = async (page = 1, filterValue = '') => {
    try {
      const response = await fetchData(`?page=${page}&limit=${rowsPerPage}&sort=${sortOrder}&sortedColumn=${sortColumn}&filter=${filterValue}`);
      if (response && !response.error) {
        setData(response.data); 
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

  const handleDelete = async () => {
    // Add your delete logic here
    if (confirmDelete) {
      try {
        const response = await deleteData(confirmDelete._id);
        if (response && !response.error) {
          setSuccessMessage('Item deleted successfully.');
          setConfirmDelete(false);
          fetchAndSetData(currentPage);
        } else if (response && response.error) {
          console.log('API Error:', response.error);
        } else {
          console.log('Unexpected response:', response);
        }
      } catch (error) {
        console.log('Error deleting item:', error);
      }
    }
  };



  const handleRowsPerPageChange = (value) => {
    const newRowsPerPage = parseInt(value);
    setRowsPerPage(newRowsPerPage);
  };

  const handleSortAndFilter = async (field, value = '') => {
    const newSortOrder = sortColumn === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(field);
    setSortOrder(newSortOrder);

    await fetchAndSetData(currentPage, value);
  };

  const renderColumnContent = (column, item) => {
    const { key, type } = column;
    const value = item[key];

    switch (type) {
      case 'number':
        return <span>{value}</span>; // You can customize formatting for numbers
      case 'date':
        return <span>{moment(value).format('DD-MM-YYYY')}</span>; // Format date using moment.js
      default:
        return <span>{value}</span>; // Assume string type by default
    }
  };
  


  const renderTableRows = () => {
  return data && data.map((item) => (
    <tr key={item.emp_id}>
      {listColumns.map((column) => (
        <td key={column.key}>{renderColumnContent(column, item)}</td>
      ))}
      <td>
        {editRoutePattern && (
          <Link className="btn btn-primary m-1" to={`${editRoutePattern}/${item._id}`}>
            Edit
          </Link>
        )}
        {onEditClick && (
          <button
            className="btn btn-primary m-1"
            onClick={() => onEditClick(item)}
          >
            Edit
          </button>
        )}
        <button
          className="btn btn-danger"
          onClick={() => {
             setConfirmDelete(item);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
};



  return (
    <div className="my-1">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Filter by ${listColumns[0].label}`}
                  onChange={(e) => handleSortAndFilter(listColumns[0].key, e.target.value)}
                />
              </div>

              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    {listColumns.map((column) => (
                      <th key={column.key} onClick={() => handleSortAndFilter(column.key)}>
                        {column.label} {sortColumn === column.key && (sortOrder === 'asc' ? '▲' : '▼')}
                      </th>
                    ))}
                    <th>Actions</th>
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
                  {rowsPerPageOptions.map((option) => (
                    <button
                      key={option}
                      className={`btn ${rowsPerPage === option ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => handleRowsPerPageChange(option)}
                    >
                      {option}
                    </button>
                  ))}

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
                        <p>Are you sure you want to delete this item?</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setConfirmDelete(item)}
                        >
                          Cancel
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>
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

export default ListBase;
