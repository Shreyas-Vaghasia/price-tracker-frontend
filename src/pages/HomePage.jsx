import React from 'react'
import Footer from '../components/Footer'
import NavigationBar from './../components/NavigationBar'
import axios from 'axios'
import Select from 'react-select'
import { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import axiosBaseURL from '../httpCommon'

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [vendors, setVendors] = useState([])
  const [selectedProductName, setSelectedProductName] = useState('')
  const [filteredVendors, setFilteredVendors] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modal, setModal] = useState(false);
  const [isPriceEditing, setIsPriceEditing] = useState(false)
  const toggle = () => setModal(!modal);
  const [datas, setDatas] = useState([]);


  const getAllProduct = () => {
    setLoading(true)
    axiosBaseURL
      .get('/api/product-master')
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
    axiosBaseURL
      .get('/api/vendor')
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

  // let headers = [
  //   { label: "Phone Numbers", key: "numbers" },
  // ];

  // let data = [
  //   {
  //     numbers: [



  //     ]
  //   },
  // ];


  // const [csvData, setCsvData] = useState(data);

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
    let allPhoneNumbers = sortedProducts.map(vendor => vendor.contactNumber)
    let vData = sortedProducts.map(vendor => {
      return {
        vendorName: vendor.vendorName,
        contactNumber: vendor.contactNumber,
      }
    })
    console.log(allPhoneNumbers)

    // let updatedData = [
    //   {
    //     numbers: [...allPhoneNumbers]
    //   }
    // ];
    //{ contactNumber: "Ahmed", vendorName: "Tomi", email: "ah@smthing.co.com" },
    // setCsvData(updatedData)
    setDatas(vData)
    console.log(vData)


    // console.log([...allPhoneNumbers])
    // data[0].numbers = [...allPhoneNumbers]
    // console.log(data)

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
      // setSelectedProduct(products.find(p => p.productName === selectedProductName))
      setLoading(false)

    }
  }, [selectedProductName, selectedProduct])

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
                        <th scope="col" className=''>Vendor Phone
                          <button className='btn btn-primary text-white'>
                            <CSVLink data={datas} filename={"vendors-contact-list.csv"} style={{
                              color: "white",
                            }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                              </svg> Download
                            </CSVLink>
                          </button>

                        </th>
                        <th scope="col">Vendor Email</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVendors && filteredVendors.map((vendor, index) => {
                        // let p = vendor.products?.find(p => p.productName === selectedProductName)
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
                            )?.productPrice}</td>
                            <td>

                              {
                                isPriceEditing ? (
                                  <><div className='input-group mb-3'>
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
                                      className='btn btn-success'
                                      type='button'
                                      id='button-addon2'
                                      onClick={() => {




                                        // axios
                                        //   .put(
                                        //     `http://localhost:8080/api/product/${vendor.products?.find(
                                        //       p => p.productName === selectedProductName
                                        //     )?.productId}`,
                                        //     {
                                        //       productName: selectedProductName,
                                        //       productPrice: newPrice,
                                        //     }
                                        //   )
                                        //   .then(res => {
                                        //     console.log(res.data)
                                        //     newPrice = 0
                                        //     getAllVendor()
                                        //     // window.location.reload()
                                        //   })
                                        //   .catch(err => {
                                        //     console.log(err)
                                        //   })

                                        // setModal(!modal);
                                      }


                                      }
                                    >
                                      Update
                                    </button>
                                    <button
                                      className='btn btn-danger'
                                      type='button'
                                      id='button-addon2'
                                      onClick={() => {
                                        setIsPriceEditing(false)
                                      }}

                                    >Cancel
                                    </button>

                                  </div></>
                                ) : (
                                  <> <button className='btn btn-primary'
                                    onClick={() => {


                                      let p = vendor.products?.find(p => p.productName === selectedProductName)
                                      setSelectedProduct(p)
                                      console.log(p)
                                      navigate(`/edit-product/${p.productId}`)

                                      // setIsPriceEditing(true)

                                      toggle()
                                    }}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                    Edit price

                                  </button> </>
                                )
                              }
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
                                        axiosBaseURL
                                          .put(
                                            `/api/product/${selectedProduct.productId}`,
                                            {
                                              productName: selectedProductName,
                                              productPrice: newPrice,
                                            }
                                          )
                                          .then(res => {
                                            console.log(res.data)
                                            getAllVendor()
                                            window.location.reload()
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
