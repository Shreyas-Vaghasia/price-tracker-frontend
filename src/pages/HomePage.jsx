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
import { EditProducts } from '../components/EditProducts'

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

    </div >
  )
}


export default HomePage
