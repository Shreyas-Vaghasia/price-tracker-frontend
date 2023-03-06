import React from 'react'
import NavigationBar from './../components/NavigationBar'
import Footer from './../components/Footer'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Select from 'react-select'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import axiosBaseURL from '../httpCommon'

const AddVendorPage = () => {
  const navigate = useNavigate();

  let [products, setProducts] = useState([])
  let [selectedProducts, setSelectedProducts] = useState([])
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState(false)
  let [vendorName, setVendorName] = useState('')
  let [vendorContactNumber, setVendorContactNumber] = useState('')
  let [vendorEmail, setVendorEmail] = useState('')
  let [productOptions, setProductOptions] = useState([])
  let [success, setSuccess] = useState(false)
  let [vendorsList, setVendorsList] = useState([])
  let [selectedVendor, setSelectedVendor] = useState({})
  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVendorForAddingProducts, setSelectedVendorForAddingProducts] = useState({});

  const toggle = () => setModal(!modal);

  const addMoreProductsToVendor = () => {
    setLoading(true)
    setError(false)
    console.log(selectedProducts)
    const data = {
      vendorId: selectedVendorForAddingProducts.vendorId,
      vendorName: selectedVendorForAddingProducts.vendorName,
      vendorContactNumber: selectedVendorForAddingProducts.contactNumber,
      vendorEmail: selectedVendorForAddingProducts.emailId,

      products: selectedProducts.map(product => {
        if (product.value === undefined) {

        } else {
          return {
            productName: product.value
          }
        }
      })

    }
    // console.log(data)
    axiosBaseURL
      .put(`/api/vendor/${selectedVendorForAddingProducts.vendorId}`, data)
      .then(res => {
        console.log(res.data)
        setSuccess(true)
        setLoading(false)
        setSelectedProducts([])

        getAllVendors();
        getAllProducts();

        setModalOpen(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setError(true)
      })

  }

  const deleteVendor = (vendorId) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      axiosBaseURL.delete(`/api/vendor/${vendorId}`)
        .then(res => {
          console.log(res.data)
          getAllVendors();
        })
        .catch(err => {
          console.log(err)
        })
      getAllVendors();
      getAllProducts();
    }




  }

  const editVendor = (vendorId) => {

    let v = vendorsList.filter(vendor => vendor.vendorId === vendorId);
    console.log(v)
    setSelectedVendor(v[0]);

    toggle();

    getAllVendors();
    getAllProducts();

  }


  const onSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    // console.log(selectedProducts)
    const data = {
      vendorName: vendorName,
      contactNumber: vendorContactNumber,
      emailId: vendorEmail,
      products: selectedProducts.map(product => {
        if (product.value === undefined) {

        } else {
          return {
            productName: product.value
          }
        }
      })

    }
    // console.log(data)
    axiosBaseURL
      .post('/api/vendor', data)
      .then(res => {
        console.log(res.data)
        setSuccess(true)
        setLoading(false)
        setVendorName('')
        setVendorContactNumber('')
        setVendorEmail('')
        setSelectedProducts([])
        getAllVendors();
        getAllProducts();
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setError(true)
      })


  }

  const getAllVendors = () => {
    axiosBaseURL
      .get('/api/vendor')
      .then(res => {
        console.log(res.data)
        setVendorsList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const getAllProducts = () => {
    axiosBaseURL
      .get('/api/product-master')
      .then(res => {
        console.log(res.data)
        setProducts(res.data)
        setProductOptions(
          res.data.map(product => ({
            value: product.productName,
            label: product.productName
          }))
        )
      })
      .catch(err => {
        console.log(err)
      })
  }
  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axiosBaseURL.delete(`/api/product/${productId}`)
        .then(res => {
          console.log(res.data)
          editVendor(selectedVendor.vendorId);
        })
        .catch(err => {
          console.log(err)
        })
      getAllVendors();
      getAllProducts();


    }






  }

  const editProduct = (productId) => {
    navigate(`/edit-product/${productId}`)
  }


  useEffect(() => {

    getAllVendors();
    getAllProducts();

  }, [])

  return (
    <>
      {' '}
      <NavigationBar />
      <div className='container-fluid mt-4'>
        <div className='row '>
          <div className='col-md-6'>
            <h1>Add Vendor</h1>
            <div className='row'>
              {error && (
                <div className='alert alert-danger' role='alert'>
                  {error}
                </div>
              )}
              {success && (
                <div className='alert alert-success' role='alert'>
                  {'Vendor added successfully'}
                </div>
              )}
              <div className='col-md-6'>
                <form>
                  <label htmlFor='vendorName' className='form-label'>
                    Vendor Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='vendorName'
                    placeholder='Enter vendor name'
                    required
                    value={vendorName}
                    onChange={e => setVendorName(e.target.value)}
                  />
                  <label htmlFor='vendorEmail' className='form-label'>
                    Vendor Email
                  </label>
                  <input
                    type='email'
                    className='form-control'
                    id='vendorEmail'
                    placeholder='Enter vendor email'
                    required
                    value={vendorEmail}
                    onChange={e => setVendorEmail(e.target.value)}
                  />
                  <label htmlFor='vendorPhone' className='form-label'>
                    Vendor Phone
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='vendorPhone'
                    placeholder='Enter vendor phone'
                    required
                    value={vendorContactNumber}
                    onChange={e => setVendorContactNumber(e.target.value)}
                  />
                </form>
              </div>
              <div className='col-md-6'>
                <h3>Add Product</h3>
                <div className='row'>
                  <div className='col-md-6'>
                    <Select
                      defaultValue={selectedProducts}
                      isMulti
                      name='selectedProducts'
                      options={productOptions}
                      onChange={selectedProducts =>
                        setSelectedProducts(selectedProducts)
                      }
                      className='basic-multi-select'
                      classNamePrefix='select'
                    />

                    {/* <select className='form-select' name='' id='' multiple>
                  {products.map(product => (
                    <option
                      key={product.productId}
                      value={product.productName}
                      onChange={e => {
                        console.log(e.target.value)
                        setSelectedProducts(e.target.value)

                        console.log(selectedProducts)
                      }}
                    >
                      {product.productName}
                    </option>
                  ))}
                </select> */}
                  </div>
                  <div className='col-md-6'>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      onClick={onSubmit}
                    >
                      {loading && (
                        <span
                          className='spinner-border spinner-border-sm'
                          role='status'
                          aria-hidden='true'
                        ></span>
                      )}
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <h1>Vendors List</h1>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Vendor Name</th>
                  <th scope='col'>Contact Number</th>
                  <th scope='col'>Email</th>
                  {/* <th scope='col'>Products</th> */}
                  <th scope='col'>Action</th>

                </tr>
              </thead>
              <tbody>
                {vendorsList && vendorsList.map((vendor, index) => (
                  <tr key={vendor.vendorId}>
                    <th scope='row'>{index + 1}</th>
                    <td>{vendor.vendorName}</td>
                    <td>{vendor.contactNumber}</td>
                    <td>{vendor.emailId}</td>
                    {/* <td>
                      {vendor.products && vendor.products.map(product => (
                        <span key={product.productId}>{product.productName + ","}</span>
                      ))}
                    </td> */}
                    <td>
                      <button
                        type='button'
                        className='btn btn-danger p-2'
                        onClick={() => deleteVendor(vendor.vendorId)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>

                      </button>
                    </td>
                    <td >
                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={() => editVendor(vendor.vendorId)}
                      >
                        Edit
                      </button>
                    </td>
                    <td >
                      <button
                        type='button'
                        className='btn btn-success'
                        onClick={() => {
                          setSelectedVendorForAddingProducts(vendor)
                          setModalOpen(true)
                        }}
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>


        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>{
            selectedVendor ? selectedVendor.vendorName : ""
          }</ModalHeader>
          <ModalBody>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Product Name</th>
                  <th scope='col'>Product Price </th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  console.log(selectedVendor)

                }
                {
                  selectedVendor.products?.map(product => {
                    return (
                      <tr key={product.productId}>
                        <th scope='row'>{product.productId}</th>
                        <td>{product.productName}</td>
                        <td>{product.productPrice}</td>
                        <td>

                          <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => editProduct(product.productId)}
                          >
                            Edit
                          </button>

                          <button
                            type='button'
                            className='btn btn-danger mx-2'
                            onClick={() => deleteProduct(product.productId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }


              </tbody>
            </table>
          </ModalBody>

        </Modal>
        <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
          <ModalHeader toggle={() => setModalOpen(false)}>Add More Products -{selectedVendorForAddingProducts.vendorName}</ModalHeader>
          <ModalBody>
            <h6 className="h6">Select the products to add </h6>
            <Select
              defaultValue={selectedProducts}
              isMulti
              name='selectedProducts'
              options={productOptions}
              onChange={selectedProducts =>
                setSelectedProducts(selectedProducts)
              }
              className='basic-multi-select'
              classNamePrefix='select'
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => addMoreProductsToVendor()}>Submit</Button>
            <Button color="secondary" onClick={() => setModalOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>

        <Footer />
      </div>
    </>
  )
}


export default AddVendorPage
