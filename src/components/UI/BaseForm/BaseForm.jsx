import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const BaseForm = ({ inputConfig, onSubmit, validationLogic, navigate, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [datePicker, setDatePicker] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (inputConfig.some((config) => config.type === 'date')) {
        const dobDate = moment(initialData.dob, 'YYYY-MM-DD').toDate();
        setDatePicker(dobDate);
      }
    }
  }, [initialData, inputConfig]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    const selectedDate = moment(date).format('YYYY-MM-DD');
    setFormData({ ...formData, dob: selectedDate });
    setDatePicker(date);
  };

  const validateForm = () => {
    const errors = validationLogic(formData);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {inputConfig.map((config) => (
        <div key={config.name} className="mb-3">
          <label htmlFor={config.name} className="form-label">
            {config.label}
          </label>
          {config.type === 'date' ? (
            <DatePicker
              selected={datePicker}
              onChange={handleDateChange}
              className={`form-control ${formErrors[config.name] ? 'is-invalid' : ''}`}
              dateFormat="dd-MM-yyyy"
            />
          ) : (
            <input
              type="text"
              className={`form-control ${formErrors[config.name] ? 'is-invalid' : ''}`}
              id={config.name}
              name={config.name}
              value={formData[config.name] || ''}
              onChange={handleInputChange}
            />
          )}
          {formErrors[config.name] && (
            <div className={`invalid-feedback ${formErrors[config.name] ? 'd-block' : ''}`}>
              {formErrors[config.name]}
            </div>
          )}
        </div>
      ))}
      <div className="d-flex justify-content-between">
      {navigate && (
        <button type="button" className="btn btn-danger ml-2" onClick={() => navigate()}>
          Cancel
        </button>
        
      )}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      
      </div>
    </form>
  );
};

export default BaseForm;
