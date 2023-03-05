import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const NavigationBar = () => {
  const navigate = useNavigate()

  return (
    <div style={{


    }}>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <a
            className='navbar-brand'
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            Price Tracker App
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              {/* <form className='d-flex ms-3'>
                <input
                  className='form-control me-2'
                  type='search'
                  placeholder='Enter product name... '
                  aria-label='Search'
                />
                <button className='btn btn-outline-success' type='submit'>
                  Search
                </button>
              </form> */}
            </ul>
            <button
              className='btn btn-outline-info mx-1'
              onClick={() => {
                navigate('/add-new-product')
                // window.location.href = '/add-new-product' 
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-plus-circle-fill mx-1'
                viewBox='0 0 16 16'
              >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z'></path>
              </svg>
              <i className='bi bi-plus-circle-fill'></i>Add New Product
            </button>

            <button
              className='btn btn-outline-warning mx-1'
              onClick={() => {
                // window.location.href = '/add-new-vendor'
                navigate('/add-new-vendor')
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-plus-circle-fill mx-1'
                viewBox='0 0 16 16'
              >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z'></path>
              </svg>
              <i className='bi bi-plus-circle-fill'></i>Add New Vendor
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar
