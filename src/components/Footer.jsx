import React from 'react'

const Footer = () => {
  return (
    <div
      className='text-center p-2'
      style={{
        backgroundColor: 'rgba(0, 0, 0, 1)',
        display: 'inline-block',
        width: '100%',
        bottom: '0',
        position: 'fixed',
        left: 0,
        color: 'white',
      }}
    >
      © 2023 Copyright:
      <a
        className='text-reset fw-bold mx-2'
        href='https://www.linkedin.com/in/shreyasvaghasia/'
        target='_blank'
        rel="noreferrer"
      >
        Designed by Shreyas R Vaghasia
      </a>
    </div>
  )
}

export default Footer
