import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div style={{ marginTop: '20px' }}>
    <Link
      className="waves-effect waves-light btn-large light-blue accent-2"
      to="/Quiz"
    >
      Start Quiz
    </Link>
  </div>
);
