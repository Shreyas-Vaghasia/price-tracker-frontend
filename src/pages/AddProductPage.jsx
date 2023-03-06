import React, { useEffect, useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import axios from 'axios'
import Footer from '../components/Footer'
import axiosBaseURL from '../httpCommon'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AddProductPage = () => {



  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [products, setProducts] = useState([])
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({})

  const toggle = () => setModal(!modal);

  const getAllProduct = () => {
    setLoading(true)
    axiosBaseURL.get('api/product-master')
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
    axiosBaseURL
      .post('/api/product-master', {
        productName: productName
      })
      .then(res => {
        console.log(res)
        setLoading(false)
        getAllProduct();
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
                  <th scope='col'>Action</th>
                  {/* <th scope='col'>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <th scope='row'>{index + 1}</th>
                    <td>{product.productName}</td>
                    <td>
                      <div className="row">
                        <div className="col-md-6">
                          <button className='btn btn-warning mx-1 px-2'
                            onClick={() => {

                              setSelectedProduct(product)
                              toggle()
                              console.log(product)

                            }

                            }
                          ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>Edit</button>

                        </div>
                        {/* <div className="col-md-6">
                          <button
                            className='btn btn-danger mx-1'
                            onClick={() => {
                              console.log(product.pid)
                              axiosBaseURL
                                .delete(
                                  `api/product-master/${product.pid}`
                                )
                                .then(res => {
                                  console.log(res)
                                  alert('Product deleted successfully')
                                  getAllProduct();
                                })
                                .catch(err => {
                                  console.log(err)
                                  alert('Error deleting product')
                                })
                            }}
                          >
                            Delete
                          </button>
                        </div> */}
                      </div>
                    </td>

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
              <button type='button' className='btn btn-primary' onClick={() => {

              }}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Edit Master Product Name :</ModalHeader>
        <ModalBody>
          <div className='mb-3'>
            <label htmlFor='productName' className='form-label'>
              Product Name
            </label>
            <input
              type='text'
              className='form-control'
              id='productName'
              placeholder='Enter product name'
              value={selectedProduct.productName}
              onChange={e => setSelectedProduct({ ...selectedProduct, productName: e.target.value })}
              required
            />
          </div>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {
            axiosBaseURL
              .put(
                `api/product-master/${selectedProduct.pid}`,
                selectedProduct
              )
              .then(res => {
                console.log(res)
                alert('Product updated successfully')
                getAllProduct();
              })
              .catch(err => {
                console.log(err)
                alert('Error deleting product')
              })
            toggle()
          }}>
            Save
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Footer />
    </div>
  )
}

export default AddProductPage
