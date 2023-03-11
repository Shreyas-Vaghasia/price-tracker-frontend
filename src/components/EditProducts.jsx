import React, { useState, useEffect } from 'react'
import axiosBaseURL from '../httpCommon'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const EditProducts = ({ vendor, selectedProductName, isPriceEditing, setIsPriceEditing, getAllProduct, getAllVendor }) => {
    const [selectedProduct, setSelectedProduct] = useState(
        vendor.products?.find(p => p.productName === selectedProductName)
    )
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [price, setPrice] = useState(selectedProduct.productPrice)
    const [name, setName] = useState(selectedProduct.productName)
    const [moq, setMoq] = useState(selectedProduct.moq)
    const [packing, setPacking] = useState(selectedProduct.packing)
    const [ex, setEx] = useState(selectedProduct.ex)
    const [paymentTerms, setPaymentTerms] = useState(selectedProduct.paymentTerms)
    const [grade, setGrade] = useState(selectedProduct.grade)
    const [isUpdated, setIsUpdated] = useState(false)
    const handleSave = () => {

        setLoading(true)

        axiosBaseURL
            .put(
                `/api/product/${selectedProduct.productId}`,
                {
                    productPrice: price,
                    moq: moq,
                    packing: packing,
                    ex: ex,
                    paymentTerms: paymentTerms,
                    grade: grade,

                }
            )
            .then(res => {
                console.log(res.data)
                setLoading(false)
                setIsUpdated(true)
                toast.success("Product updated successfully -" + vendor.vendorName, {
                    position: toast.POSITION.TOP_CENTER
                });

                // alert('Product updated successfully')
                // getAllProduct()
                // getAllVendor()


            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setError(err.response.data.message)
                alert('Error updating product')
            })



    }
    return (

        <>
            {
                console.log(selectedProduct)
            }
            <td>{vendor.vendorName}
                {
                    isUpdated && <span className="badge text-bg-success">updated</span>
                }

            </td>
            <td>{vendor.contactNumber}</td>
            <td>{vendor.emailId}</td>
            <td>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Price'
                    aria-label='Enter Price'
                    value={
                        price
                    }
                    onChange={e => {
                        setPrice(e.target.value)
                    }}
                />
            </td>
            <td>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter moq'
                    aria-label='Enter moq'
                    value={moq}
                    onChange={e => {
                        setMoq(e.target.value)
                    }}
                />
            </td>
            <td>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter Packing'
                    aria-label='Enter Packing'
                    value={packing}
                    onChange={e => {
                        setPacking(e.target.value)
                    }}
                />
            </td>
            <td>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter ex'
                    aria-label='Enter ex'
                    value={ex}
                    onChange={e => {
                        setEx(e.target.value)
                    }}
                />
            </td>
            <td>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter paymentTerms'
                    aria-label='Enter paymentTerms'
                    value={paymentTerms}
                    onChange={e => {
                        setPaymentTerms(e.target.value)
                    }}
                />
            </td>
            <td>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter grade'
                    aria-label='Enter grade'
                    value={grade}
                    onChange={e => {
                        setGrade(e.target.value)
                    }}
                />
            </td>
            <td>
                <button className='btn btn-danger'
                    onClick={() => {
                        // let p = vendor.products?.find(p => p.productName === selectedProductName)
                        // setSelectedProduct(p)
                        // console.log(p)
                        // navigate(`/edit-product/${p.productId}`)

                        setIsPriceEditing(false)

                        // toggle()
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>

                </button>
                <button className='btn btn-success'
                    onClick={() => {
                        console.log(price)
                        console.log(moq)
                        console.log(packing)
                        console.log(ex)
                        console.log(paymentTerms)
                        console.log(grade)
                        console.log("selectedProduct.productId")

                        handleSave()
                        // setIsPriceEditing(false)

                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />

                    </svg>
                </button>
                <ToastContainer />

            </td>
        </>
    )
}
