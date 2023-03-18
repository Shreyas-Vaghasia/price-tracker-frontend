import React from 'react'
import NavigationBar from './../components/NavigationBar'
import Footer from './../components/Footer'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import Select from 'react-select'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import axiosBaseURL from '../httpCommon'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../Context/UserContext';

const AddVendorPage = () => {
  const navigate = useNavigate();

  let [products, setProducts] = useState([])
  let [selectedProducts, setSelectedProducts] = useState([])
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState("")

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
  const { setCurrentUser, currentUser } = useContext(UserContext)

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

    if (vendorName === '' || vendorContactNumber === '' || vendorEmail === '' || selectedProducts.length === 0) {
      setError('Please fill all the fields')
      toast.error("Please fill all the fields", {
        position: toast.POSITION.TOP_LEFT
      });

      setLoading(false)
      return;
    }

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

        toast.success("Vendor added succesfully", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
        setError(err.response.data.message)
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_LEFT
        });

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
        setError(err.response.data.message)
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
        setError(err.response.data.message)

      })
  }
  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axiosBaseURL.delete(`/api/product/${productId}`)
        .then(res => {
          console.log(res.data)
          editVendor(selectedVendor.vendorId);

          toast.success("Product deleted succesfully  !", {
            position: toast.POSITION.TOP_CENTER
          });

        })
        .catch(err => {
          console.log(err)
          setError(err.response.data.message)

          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_LEFT
          });


        })
      getAllVendors();
      getAllProducts();


    }






  }

  const editProduct = (productId) => {
    navigate(`/edit-product/${productId}`)
  }


  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('currentUser'))
    setCurrentUser(user)
    getAllVendors();
    getAllProducts();

  }, [])

  return (
    <>
      <NavigationBar />
      <div className='container-fluid mt-4'>
        <div className='row '>
          <div className='col-md-6'>
            <h1>Add Vendor</h1>
            <div className='row'>
              <ToastContainer />

              {/* {
                error && (
                  <div className='alert alert-danger alert-dismissible fade show' role='alert'>
                    {error}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

                  </div>
                )} */}
              {/* {
                success && (
                  <div className='alert alert-success' role='alert'>
                    {'Vendor added successfully'}
                  </div>
                )
              } */}
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
                  <div className='col-md-6 mt-2 mb-2'>
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
                      <div className="row justify-content-between">
                        <div className="col-md-4"><button
                          type='button'
                          className='btn btn-danger'
                          onClick={() => deleteVendor(vendor.vendorId)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                          </svg>

                        </button></div>
                        <div className="col-md-4"><button
                          type='button'
                          className='btn btn-primary'
                          onClick={() => editVendor(vendor.vendorId)}
                        >
                          {/* Edit */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                          </svg>
                        </button></div>
                        <div className="col-md-4"><button
                          type='button'
                          className='btn btn-success'
                          onClick={() => {
                            setSelectedVendorForAddingProducts(vendor)
                            setModalOpen(true)
                          }}
                        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                          </svg>
                          {/* Add */}
                        </button></div>
                      </div>



                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>


        <Modal isOpen={modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>Edit products in : {selectedProducts.vendorName}</ModalHeader>
          <ModalBody>
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
                  value={selectedVendor.vendorName}
                  onChange={e => setSelectedVendor(
                    {
                      ...selectedVendor,
                      vendorName: e.target.value
                    }

                  )}
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
                  value={selectedVendor.emailId}
                  onChange={e => setSelectedVendor(
                    {
                      ...selectedVendor,
                      emailId: e.target.value
                    }

                  )}
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
                  value={selectedVendor.contactNumber}
                  onChange={e => setSelectedVendor(
                    {
                      ...selectedVendor,
                      contactNumber: e.target.value
                    }

                  )}
                />
                <button
                  type='submit'
                  className='btn btn-primary mt-2'
                  onClick={() => {

                    //UPDATE VENDOR FOR EDITING NAME / EMAIL/ PHONE
                    axiosBaseURL.put(`api/vendor/${selectedVendor.vendorId}`, {
                      vendorName: selectedVendor.vendorName,
                      emailId: selectedVendor.emailId,
                      contactNumber: selectedVendor.contactNumber,
                      products: selectedVendor.products.map(product => {
                        return {
                          productName: product.productName,
                          productPrice: product.productPrice
                        }
                      })
                    })

                      .then(res => {
                        console.log(res.data)
                        alert('Vendor updated successfully')
                        getAllVendors()

                        setModalOpen(false)
                        toggle()
                      })
                      .catch(err => {
                        console.log(err)
                      })

                  }}
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
              </form>
            </div>
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
          <ModalHeader toggle={() => setModalOpen(false)}>Add more products to : {selectedVendorForAddingProducts.vendorName}</ModalHeader>
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
