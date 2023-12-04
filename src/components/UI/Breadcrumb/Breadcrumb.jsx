// Breadcrumb.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">HOME</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          // Check if the segment is an 'add' or 'edit' page
          const isAddOrEdit = /^(add|edit)$/.test(name);

          // Check if the last segment contains a number
          const hasNumber = /\d/.test(name);

          return (
            <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`} aria-current={isLast ? 'page' : undefined}>
              {isLast ? (
                // Omit the last section if it contains a number
                hasNumber ? null : (isAddOrEdit ? null : name.toUpperCase())
              ) : (
                // Include the ID for other pages, make "EDIT" non-clickable
                isAddOrEdit ? (
                  <>
                    <Link to="/">HOME</Link>
                    <span className="mx-1">/</span>
                    <span>{name.toUpperCase()}</span>
                  </>
                ) : (
                  <>
                    <Link to={routeTo}>{name.toUpperCase()}</Link>
                    <span className="mx-1">/</span>
                  </>
                )
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
