import React from 'react';

const Error = () => {
  return <div className='h-screen bg-e text-black' >
      <div className='content-center text-3xl relative top-2/4 text-center'>
        <h3 className='mb-3' >Sorry 🙄! the page you tried cannot be found</h3>
        <a href='/' className='btn btn-purple text-lg' > <i className="fas fa-home"></i> Go to home page </a>
      </div>
  </div>;
};

export default Error;
