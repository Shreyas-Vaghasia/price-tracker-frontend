import React from 'react'
import Footer from '../components/Footer'
import NavigationBar from './../components/NavigationBar'
import axios from 'axios'
import Select from 'react-select'
import { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [vendors, setVendors] = useState([])
  const [selectedProductName, setSelectedProductName] = useState('')
  const [filteredVendors, setFilteredVendors] = useState([])
  const [todaysPrice, setTodaysPrice] = useState([])
  const [yesterdaysPrice, setYesterdaysPrice] = useState([])
  const [selectedProduct, setSelectedProduct] = useState({})
  const [isPriceZero, setIsPriceZero] = useState(false)
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  const getAllProduct = () => {
    setLoading(true)
    axios
      .get('http://localhost:8080/api/product-master')
      .then(res => {
        setProducts(res.data)
        setLoading(false)
        console.log(res.data)
      })
      .catch
      (err => {
        console.log(err)
        setLoading(false)
      })
  }
  const getAllVendor = () => {
    setLoading(true)
    axios
      .get('http://localhost:8080/api/vendor')
      .then(res => {
        setVendors(res.data)
        setLoading(false)
        console.log(res.data)
        setFilteredVendors(res.data)
        setLoading(false)
      })
      .catch
      (err => {
        console.log(err)
        setLoading(false)
      })
  }



  const fiterVendorsByProduct = (productName) => {
    let filteredVndrs = [];
    vendors.filter(vendor => {
      if (vendor.products !== undefined) {
        const products = vendor.products;
        products.filter(product => {
          if (product.productName === productName) {
            filteredVndrs.push(vendor)
            return vendor
          }
        })
      }
    })

    // let data = filteredVndrs.sort((a, b) => a.vendorName.products?.find(p => p.productName === selectedProductName).productPrice - b.vendorName.products?.find(p => p.productName === selectedProductName).productPrice)

    // console.log(data)


    let sortedProducts = filteredVndrs.sort((a, b) => a.products?.find(p => p.productName === productName).productPrice - b.products?.find(p => p.productName === productName).productPrice)


    setFilteredVendors(sortedProducts)


  }


  useEffect(() => {


    getAllProduct()
    getAllVendor()
  }, [])

  useEffect(() => {
    if (selectedProductName) {
      setLoading(true)


      // let filteredVndrs = [];
      // for (let index = 0; index < vendors.length; index++) {
      //   if (vendors[index].products !== undefined) {
      //     const products = vendors[index].products;

      //     for (let index = 0; index < products.length; index++) {

      //       const product = products[index];

      //       if (product.productName === selectedProductName) {


      //         if (vendors[index].products !== undefined) {
      //           filteredVndrs.push(vendors[index])
      //           setTodaysPrice(product.productPrice)
      //           setYesterdaysPrice(product.lastPrice)

      //           console.log(product)
      //         }
      //       }
      //     }
      //   }
      // }
      fiterVendorsByProduct(selectedProductName)



      // filteredVndrs.sort((a, b) => a.vendorName.products?.find(p => p.productName === selectedProductName).productPrice - b.vendorName.products?.find(p => p.productName === selectedProductName).productPrice)
      setSelectedProduct(products.find(p => p.productName === selectedProductName))
      setLoading(false)

    }
  }, [selectedProductName])

  return (
    <div>
      <NavigationBar />

      {
        loading ? <div className="spinner-border text-primary" role="status"> Loading </div> : <div className='container'>
          <div className='row mt-3'>
            <div className='col-md-6'>
              <h1>Home Page</h1>
            </div>
            <div className='col-md-6'>
              <Select
                options={products && products.map(product => {
                  return {
                    value: product.productName,
                    label: product.productName
                  }
                })}
                className="basic-single"
                classNamePrefix="select"
                onChange={e => {
                  setSelectedProductName(e.value)
                }}


              />
            </div>
          </div>
          <div className="row">

            {
              selectedProductName ? (
                <div className="col-md-12">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Vendor Name</th>
                        <th scope="col">Vendor Phone</th>
                        <th scope="col">Vendor Email</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVendors && filteredVendors.map((vendor, index) => {
                        let p = vendor.products?.find(p => p.productName === selectedProductName)
                        let newPrice = 0;

                        // console.log(p)
                        // console.log(selectedProduct)
                        // console.log(vendor.products?.find(p => p.productName === selectedProductName)?.productPrice)


                        return (
                          <tr key={index}>
                            <td>{vendor.vendorName}</td>
                            <td>{vendor.contactNumber}</td>
                            <td>{vendor.emailId}</td>
                            <td>{vendor.products?.find(
                              p => p.productName === selectedProductName
                            )?.productPrice === 0 ? (
                              <div className='input-group mb-3'>
                                <input
                                  type='text'
                                  className='form-control'
                                  placeholder='Enter Price'
                                  aria-label='Enter Price'
                                  hidden={isPriceZero}
                                  onChange={e => {
                                    newPrice = e.target.value
                                  }}
                                />
                                <button
                                  className='btn btn-outline-secondary'
                                  type='button'
                                  id='button-addon2'
                                  onClick={() => {
                                    axios
                                      .put(
                                        `http://localhost:8080/api/product/${vendor.products?.find(
                                          p => p.productName === selectedProductName
                                        )?.productId}`,
                                        {
                                          productName: selectedProductName,
                                          productPrice: newPrice,
                                        }
                                      )
                                      .then(res => {
                                        console.log(res.data)
                                        getAllVendor()
                                      })
                                      .catch(err => {
                                        console.log(err)
                                      })
                                  }}
                                >
                                  Update
                                </button>
                              </div>

                            ) : vendor.products?.find(
                              p => p.productName === selectedProductName
                            )?.productPrice}</td>
                            <td>
                              <button className='btn btn-primary'
                                onClick={toggle}
                              >Edit price</button>
                              <Modal isOpen={modal} toggle={toggle} >
                                <ModalHeader toggle={toggle}>Update Price</ModalHeader>
                                <ModalBody>
                                  <div className='input-group mb-3'>
                                    <input
                                      type='text'
                                      className='form-control'
                                      placeholder='Enter Price'
                                      aria-label='Enter Price'
                                      onChange={e => {
                                        newPrice = e.target.value
                                      }}

                                    />
                                    <button
                                      className='btn btn-outline-secondary'
                                      type='button'
                                      id='button-addon2'
                                      onClick={() => {
                                        axios
                                          .put(
                                            `http://localhost:8080/api/product/${vendor.products?.find(
                                              p => p.productName === selectedProductName
                                            )?.productId}`,
                                            {
                                              productName: selectedProductName,
                                              productPrice: newPrice,
                                            }
                                          )
                                          .then(res => {
                                            console.log(res.data)
                                            getAllVendor()
                                          })
                                          .catch(err => {
                                            console.log(err)
                                          })

                                        setModal(!modal);
                                      }


                                      }
                                    >
                                      Update
                                    </button>
                                  </div>
                                </ModalBody>
                                <ModalFooter>

                                  <Button color="secondary" onClick={toggle}>
                                    Cancel
                                  </Button>
                                </ModalFooter>
                              </Modal>
                            </td>




                          </tr>
                        )
                      })
                      }
                      {
                        filteredVendors.length === 0 &&
                        <tr>
                          <td colSpan="5" className='fs-1'>No Data Found</td>
                        </tr>


                      }
                    </tbody>
                  </table>
                </div>
              ) : <div className="col-md-12">
                <h2> Please select a product from the dropdown first .</h2>
              </div>
            }


          </div>
        </div >
      }
      <Footer />

    </div >
  )
}


export default HomePage
