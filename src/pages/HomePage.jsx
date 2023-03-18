import React from 'react'
import Footer from '../components/Footer'
import NavigationBar from './../components/NavigationBar'
import axios from 'axios'
import Select from 'react-select'
import { useState, useEffect, useContext } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CSVLink } from "react-csv";
import { useNavigate } from "react-router-dom";
import axiosBaseURL from '../httpCommon'
import { EditProducts } from '../components/EditProducts'

import { UserContext } from '../Context/UserContext';
import {
  WhatsappShareButton,
  EmailShareButton,

} from "react-share";

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
  const { setCurrentUser, currentUser } = useContext(UserContext)
  const [whatsappmessage, setWhatsappmessage] = useState('')

  const [shareModal, setShareModal] = useState(false);
  const shareToggle = () => setShareModal(!shareModal);
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
  // Hook
  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      if (typeof window === "undefined") {
        return initialValue;
      }
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }

  useEffect(() => {
    //get current user from local storage
    let user = JSON.parse(localStorage.getItem('currentUser'))
    setCurrentUser(user)
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
  }, [selectedProductName, selectedProduct, isPriceEditing])

  return (
    <div>
      <NavigationBar />
      {
        loading ? (
          <div className='text-center'>
            <div className="spinner-border " role="status">  </div>
          </div>
        ) :
          <div className='container'>
            <div className='row mt-3'>
              <div className='col-md-6 d-flex'>
                <h1>Home Page</h1>
                <div>
                  <button
                    className='btn btn-sm btn-primary mx-3 mt-3'
                    onClick={() => {
                      window.location.reload()
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                      <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                    </svg>
                    Refresh
                  </button>
                </div>

              </div>
              <div className='col-md-6'>



                <Select
                  options={
                    products && products.map(product => {
                      return {
                        value: product.productName,
                        label: product.productName
                      }
                    }
                    )
                  }
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
                            {
                              console.log("currentUser", currentUser)
                            }

                            {
                              currentUser && currentUser.role == 'ADMIN' ? (

                                <button className='btn btn-primary text-white'>

                                  <CSVLink data={datas} filename={"vendors-contact-list.csv"} style={{
                                    color: "white",
                                  }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                    </svg>
                                    {/* Download */}
                                  </CSVLink>

                                </button>

                              ) :
                                <div></div>
                            }


                          </th>
                          <th scope="col">Vendor Email</th>
                          <th scope="col">Price</th>
                          <th scope="col">moq</th>
                          <th scope="col">Packing</th>
                          <th scope="col">Ex</th>
                          <th scope="col">Payment Terms</th>
                          <th scope="col">Grade/Brand</th>
                          <th scope="col">Action</th>


                        </tr>
                      </thead>
                      <tbody>
                        {
                          filteredVendors && filteredVendors.map((vendor, index) => {
                            // let p = vendor.products?.find(p => p.productName === selectedProductName)
                            let newPrice = 0;


                            // console.log(p)
                            // console.log(selectedProduct)
                            // console.log(vendor.products?.find(p => p.productName === selectedProductName)?.productPrice)
                            return (
                              <tr key={index}>
                                {
                                  isPriceEditing ?
                                    (
                                      <EditProducts vendor={vendor}
                                        selectedProductName={selectedProductName}
                                        isPriceEditing={isPriceEditing}
                                        setIsPriceEditing={setIsPriceEditing}
                                        getAllProduct={getAllProduct}
                                        getAllVendor={getAllVendor}
                                      />
                                    ) :
                                    (
                                      <>
                                        <td>{vendor.vendorName}</td>
                                        <td>{vendor.contactNumber}</td>
                                        <td>{vendor.emailId}</td>
                                        <td>
                                          {
                                            vendor.products?.find(
                                              p => p.productName === selectedProductName
                                            )?.productPrice
                                          }
                                        </td>


                                        <td>
                                          {
                                            vendor.products?.find(
                                              p => p.productName === selectedProductName
                                            )?.moq
                                          }
                                        </td>
                                        <td>
                                          {
                                            vendor.products?.find(
                                              p => p.productName === selectedProductName
                                            )?.packing
                                          }
                                        </td>
                                        <td>
                                          {
                                            vendor.products?.find(
                                              p => p.productName === selectedProductName
                                            )?.ex
                                          }
                                        </td>
                                        <td>
                                          {
                                            vendor.products?.find(
                                              p => p.productName === selectedProductName
                                            )?.paymentTerms
                                          }
                                        </td>
                                        <td>
                                          {
                                            vendor.products?.find(
                                              p => p.productName === selectedProductName
                                            )?.grade
                                          }
                                        </td>
                                        <td>
                                          <button className='btn btn-primary'
                                            onClick={() => {
                                              // let p = vendor.products?.find(p => p.productName === selectedProductName)
                                              // setSelectedProduct(p)
                                              // console.log(p)
                                              // navigate(`/edit-product/${p.productId}`)

                                              setIsPriceEditing(true)

                                              // toggle()
                                            }}
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                              <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                            Edit
                                          </button>

                                          <button className='btn btn-warning mx-1'
                                            onClick={() => {
                                              //send entire row data to whatsapp
                                              let data = {
                                                vendorName: vendor.vendorName,
                                                contactNumber: vendor.contactNumber,
                                                emailId: vendor.emailId,
                                                price: vendor.products?.find(
                                                  p => p.productName === selectedProductName
                                                )?.productPrice,
                                                moq: vendor.products?.find(
                                                  p => p.productName === selectedProductName
                                                )?.moq,
                                                packing: vendor.products?.find(
                                                  p => p.productName === selectedProductName
                                                )?.packing,
                                                ex: vendor.products?.find(
                                                  p => p.productName === selectedProductName
                                                )?.ex,
                                                paymentTerms: vendor.products?.find(
                                                  p => p.productName === selectedProductName
                                                )?.paymentTerms,
                                                grade: vendor.products?.find(
                                                  p => p.productName === selectedProductName
                                                )?.grade,

                                              }

                                              let message = `
                                              Vendor Name: ${data.vendorName},
                                              Contact Number: ${data.contactNumber},
                                              Email Id: ${data.emailId} ,
                                              Price: ${data.price} ,
                                              moq: ${data.moq} ,
                                              Packing: ${data.packing} ,
                                              ex: ${data.ex} ,
                                              Payment Terms: ${data.paymentTerms} ,
                                              Grade: ${data.grade} \n                                              
                                              `;
                                              console.log(message)
                                              setWhatsappmessage(message)
                                              shareToggle()

                                            }
                                            }
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                                              <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                                            </svg>
                                          </button>
                                        </td>
                                      </>
                                    )
                                }
                              </tr>
                            )
                          })
                        }
                        {
                          filteredVendors.length === 0 &&
                          <tr>
                            <td colSpan="10" className='fs-1 text-center'>No Data Found</td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </div>
                )
                  :
                  (
                    <div className="col-md-12">
                      <h2> Please select a product from the dropdown first or searh by typing </h2>
                    </div>
                  )
              }


            </div>
          </div >
      }
      <Footer />
      {/* Share Modal */}
      <Modal isOpen={shareModal} toggle={shareToggle} >
        <ModalHeader toggle={shareToggle}>Share</ModalHeader>
        <ModalBody>



          <Button
            color="outline-primary mx-1"
          >
            <WhatsappShareButton
              url={whatsappmessage}
              title={"Vendor Details"}
              separator=":: "
            >
              <svg viewBox="0 0 64 64" width="32" height="32"><circle cx="32" cy="32" r="31" fill="#25D366"></circle><path d="m42.32286,33.93287c-0.5178,-0.2589 -3.04726,-1.49644 -3.52105,-1.66732c-0.4712,-0.17346 -0.81554,-0.2589 -1.15987,0.2589c-0.34175,0.51004 -1.33075,1.66474 -1.63108,2.00648c-0.30032,0.33658 -0.60064,0.36247 -1.11327,0.12945c-0.5178,-0.2589 -2.17994,-0.80259 -4.14759,-2.56312c-1.53269,-1.37217 -2.56312,-3.05503 -2.86603,-3.57283c-0.30033,-0.5178 -0.03366,-0.80259 0.22524,-1.06149c0.23301,-0.23301 0.5178,-0.59547 0.7767,-0.90616c0.25372,-0.31068 0.33657,-0.5178 0.51262,-0.85437c0.17088,-0.36246 0.08544,-0.64725 -0.04402,-0.90615c-0.12945,-0.2589 -1.15987,-2.79613 -1.58964,-3.80584c-0.41424,-1.00971 -0.84142,-0.88027 -1.15987,-0.88027c-0.29773,-0.02588 -0.64208,-0.02588 -0.98382,-0.02588c-0.34693,0 -0.90616,0.12945 -1.37736,0.62136c-0.4712,0.5178 -1.80194,1.76053 -1.80194,4.27186c0,2.51134 1.84596,4.945 2.10227,5.30747c0.2589,0.33657 3.63497,5.51458 8.80262,7.74113c1.23237,0.5178 2.1903,0.82848 2.94111,1.08738c1.23237,0.38836 2.35599,0.33657 3.24402,0.20712c0.99159,-0.15534 3.04985,-1.24272 3.47963,-2.45956c0.44013,-1.21683 0.44013,-2.22654 0.31068,-2.45955c-0.12945,-0.23301 -0.46601,-0.36247 -0.98382,-0.59548m-9.40068,12.84407l-0.02589,0c-3.05503,0 -6.08417,-0.82849 -8.72495,-2.38189l-0.62136,-0.37023l-6.47252,1.68286l1.73463,-6.29129l-0.41424,-0.64725c-1.70875,-2.71846 -2.6149,-5.85116 -2.6149,-9.07706c0,-9.39809 7.68934,-17.06155 17.15993,-17.06155c4.58253,0 8.88029,1.78642 12.11655,5.02268c3.23625,3.21036 5.02267,7.50812 5.02267,12.06476c-0.0078,9.3981 -7.69712,17.06155 -17.14699,17.06155m14.58906,-31.58846c-3.93529,-3.80584 -9.1133,-5.95471 -14.62789,-5.95471c-11.36055,0 -20.60848,9.2065 -20.61625,20.52564c0,3.61684 0.94757,7.14565 2.75211,10.26282l-2.92557,10.63564l10.93337,-2.85309c3.0136,1.63108 6.4052,2.4958 9.85634,2.49839l0.01037,0c11.36574,0 20.61884,-9.2091 20.62403,-20.53082c0,-5.48093 -2.14111,-10.64081 -6.03239,-14.51915" fill="white"></path></svg>

            </WhatsappShareButton>
          </Button>

          <Button
            color="outline-primary  mx-1"
          >
            <EmailShareButton
              url={whatsappmessage}
              title={"Vendor Details"}
              separator=":: "
            >
              <svg viewBox="0 0 64 64" width="32" height="32"><circle cx="32" cy="32" r="31" fill="#7f7f7f"></circle><path d="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z" fill="white"></path></svg>

            </EmailShareButton>
          </Button>
        </ModalBody>
        <ModalFooter>

          <Button color="secondary" onClick={shareToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div >
  )
}


export default HomePage
