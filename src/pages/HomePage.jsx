import React from 'react'
import Footer from '../components/Footer'
import NavigationBar from './../components/NavigationBar'
import axios from 'axios'
import Select from 'react-select'
import { useState, useEffect } from 'react'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [vendors, setVendors] = useState([])
  const [selectedProductName, setSelectedProductName] = useState('')
  const [filteredVendors, setFilteredVendors] = useState([])
  const [todaysPrice, setTodaysPrice] = useState([])
  const [yesterdaysPrice, setYesterdaysPrice] = useState([])
  const [selectedProduct, setSelectedProduct] = useState({})
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
    filteredVndrs.sort((a, b) => a.vendorName.products?.find(p => p.productName === selectedProductName).productPrice - b.vendorName.products?.find(p => p.productName === selectedProductName).productPrice)

    setFilteredVendors(filteredVndrs)
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
          <div className='row'>
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

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Vendor Name</th>
                  <th scope="col">Vendor Phone</th>
                  <th scope="col">Vendor Email</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors && filteredVendors.map((vendor, index) => {
                  const p = vendor.products?.find(p => p.productName === selectedProductName)
                  // console.log(p)
                  // console.log(selectedProduct)
                  console.log(vendor.products?.find(p => p.productName === selectedProductName)?.productPrice)


                  return (
                    <tr key={index}>
                      <td>{vendor.vendorName}</td>
                      <td>{vendor.contactNumber}</td>
                      <td>{vendor.emailId}</td>
                      <td>{vendor.products?.find(
                        p => p.productName === selectedProductName
                      )?.productPrice}

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
        </div>
      }
      <Footer />
    </div>
  )
}


export default HomePage
