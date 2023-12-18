/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const BaseForm = ({ inputConfig, onSubmit, validationLogic, navigate, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, name) => {
    const selectedDate = moment(date).format('YYYY-MM-DD');
    setFormData({ ...formData, [name]: selectedDate });
  };

  const validateForm = () => {
    const errors = validationLogic(formData);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const renderInput = (config) => {
    const { name, type } = config;

    if (type === 'date') {
      return (
        <DatePicker
          selected={formData[name] ? moment(formData[name], 'YYYY-MM-DD').toDate() : null}
          onChange={(date) => handleDateChange(date, name)}
          className={`form-control ${formErrors[name] ? 'is-invalid' : ''}`}
          dateFormat="dd-MM-yyyy"
        />
      );
    } else {
      return (
        <input
          type="text"
          className={`form-control ${formErrors[name] ? 'is-invalid' : ''}`}
          id={name}
          name={name}
          value={formData[name] || ''}
          onChange={handleInputChange}
        />
      );
    }
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
          {renderInput(config)}
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
