import React from 'react'

const Footer = () => {
  return (
    <div
      className='text-center p-4'
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        display: 'inline-block',
        width: '100%',
        bottom: '0'
      }}
    >
      © 2023 Copyright:
      <a
        className='text-reset fw-bold mx-2'
        href='https://www.linkedin.com/in/shreyasvaghasia/'
        target='_blank'
      >
        Designed by Shreyas R Vaghasia
      </a>
    </div>
  )
}

export default Footer
