import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';

const NavigationBar = () => {
  const navigate = useNavigate()
  const { setCurrentUser, currentUser } = useContext(UserContext);

  return (
    <div style={{


    }}>
      <nav className='navbar navbar-expand-lg navbar-light bg-light '>
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
            {/* display curent user */}
            {currentUser ? (

              <button type="button" class="btn btn-outline-secondary position-relative">
                {currentUser.emailId}
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {currentUser.role}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </button>
            ) : (
              <span>
                <i className='bi bi-person-circle'></i> Guest
              </span>
            )}
            {/* logout button */}

            {currentUser ? (
              <button
                className='btn btn-outline-danger mx-1'
                onClick={() => {
                  setCurrentUser(null)
                  localStorage.removeItem('currentUser')
                  navigate('/login')
                }}
              >
                <i className='bi bi-box-arrow-right'></i>Logout
              </button>
            ) : (
              <button
                className='btn btn-outline-success mx-1'
                onClick={() => {
                  navigate('/login')
                }}
              >
                <i className='bi bi-box-arrow-right'></i>Login
              </button>
            )

            }
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavigationBar
