import React, { useEffect, useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import axios from 'axios'
import Footer from '../components/Footer'

const AddProductPage = () => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [products, setProducts] = useState([])

  const getAllProduct = () => {
    setLoading(true)
    axios.get('http://localhost:8080/api/product-master')
      .then(res => {
        setProducts(res.data)
        setLoading(false)
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setError(err.response.data.message)

      })
  }

  useEffect(() => {

    getAllProduct();

  }, [])

  const handleSubmit = e => {

    if (productName === '') {

      alert('Please enter all the fields')

      return
    }

    setLoading(true)
    e.preventDefault()
    console.log(productName)
    axios
      .post('http://localhost:8080/api/product-master', {
        productName: productName
      })
      .then(res => {
        console.log(res)
        setLoading(false)
        alert('Product added successfully')
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setError(err.response.data.message)
        alert('Error adding product')
      })

    setProductName('')
    setProductPrice('')

    getAllProduct();
  }

  return (
    <div>
      <NavigationBar />
      <div className='container mt-3'>
        <h1>Add Product</h1>

        <div className='row'>
          <div className='col-md-6'>
            <form>
              <div className='mb-3'>
                <label htmlFor='productName' className='form-label'>
                  Product Name
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='productName'
                  placeholder='Enter product name'
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  required
                />

                {/* <label htmlFor='productPrice' className='form-label'>
                  Product Price
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='productPrice'
                  placeholder='Enter product price'
                  value={productPrice}
                  onChange={e => setProductPrice(e.target.value)}
                /> */}
                <button
                  type='submit'
                  className='btn btn-primary mt-2'
                  onClick={handleSubmit}
                >
                  {loading && (
                    <span
                      class='spinner-border spinner-border-sm'
                      role='status'
                      aria-hidden='true'
                    ></span>
                  )}
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className='col-md-6'>
            <h2>Products Available :</h2>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Product Name</th>
                  {/* <th scope='col'>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{product.productName}</td>
                    {/* <td>
                      <button className='btn btn-warning mx-1'>Edit</button>
                      <button
                        className='btn btn-danger mx-1'
                        onClick={() => {
                          console.log(product.productId)
                          axios
                            .delete(
                              `http://localhost:8080/api/product/${product.productId}`
                            )
                            .then(res => {
                              console.log(res)
                              alert('Product deleted successfully')
                            })
                            .catch(err => {
                              console.log(err)
                              alert('Error deleting product')
                            })
                        }}
                      >
                        Delete
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* modal */}
      <div
        className='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Modal title
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>...</div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button type='button' className='btn btn-primary'>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AddProductPage
