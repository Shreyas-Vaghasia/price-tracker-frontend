import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import NavigationBar from './../components/NavigationBar';
import { useNavigate } from 'react-router-dom';
import axiosBaseURL from '../httpCommon'

const EditProduct = () => {

    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate();

    const getProduct = () => {
        setLoading(true)
        axiosBaseURL.get(`/api/product/${id}`)
            .then(res => {
                setProduct(res.data)
                setLoading(false)
                console.log(res.data)

                setPrice(res.data.productPrice)
                setName(res.data.productName)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setError(err.response.data.message)
            }
            )
    }
    useEffect(() => {
        getProduct();
    }, [])


    const handleSave = () => {

        setLoading(true)

        axiosBaseURL
            .put(
                `/api/product/${id}`,
                {
                    productPrice: price,
                    productName: name
                }
            )
            .then(res => {
                console.log(res.data)
                setLoading(false)
                alert('Product updated successfully')
                navigate('/')


            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setError(err.response.data.message)
                alert('Error updating product')
            })



    }

    return (
        <div className=''>
            <NavigationBar />
            <div className="container col-md-6 mt-4">
                <div className=" d-flex justify-content-between">
                    <h3>Edit Product</h3>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            navigate(-1)
                        }}

                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                        Back

                    </button>
                </div>

                <div className='input-group mb-3'>

                    <input
                        type='text'
                        className='form-control'
                        placeholder='Enter Price'
                        aria-label='Enter Price'
                        value={name}
                        onChange={e => {
                            setPrice(e.target.value)
                        }}

                    />

                </div>

                <div className='input-group mb-3'>
                    <input
                        type='text'
                        className='form-control'
                        placeholder='Enter Price'
                        aria-label='Enter Price'
                        value={price}
                        onChange={e => {
                            setPrice(e.target.value)
                        }}

                    />

                </div>
                <div className='input-group mb-3'>
                    <button
                        className='btn btn-primary'
                        type='button'
                        id='button-addon2'
                        onClick={() => {
                            handleSave()
                        }}
                    >
                        Update
                    </button>
                </div>

            </div>

        </div >
    )
}

export default EditProduct