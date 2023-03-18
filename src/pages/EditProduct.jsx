import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import NavigationBar from './../components/NavigationBar';
import { useNavigate } from 'react-router-dom';
import axiosBaseURL from '../httpCommon'
import { UserContext } from '../Context/UserContext';

const EditProduct = () => {

    const { id } = useParams()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [moq, setMoq] = useState('')
    const [packing, setPacking] = useState('')
    const [ex, setEx] = useState('')
    const [paymentTerms, setPaymentTerms] = useState('')
    const [grade, setGrade] = useState('')
    const [lastUpdated, setLastUpdated] = useState('')
    const { setCurrentUser, currentUser } = useContext(UserContext);


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
                setMoq(res.data.moq)
                setPacking(res.data.packing)
                setEx(res.data.ex)
                setPaymentTerms(res.data.paymentTerms)
                setGrade(res.data.grade)
                setLastUpdated(res.data.lastUpdated)

            })
            .catch(err => {
                console.log(err)
                setLoading(false)
                setError(err.response.data.message)
            }
            )
    }
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : '{}');
        setCurrentUser(user)

        getProduct();
    }, [])


    const handleSave = () => {

        setLoading(true)

        axiosBaseURL
            .put(
                `/api/product/${id}`,
                {
                    productPrice: price,
                    productName: name,
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
            {
                loading ? (
                    <div className='text-center'>
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                )
                    : (
                        <div className="container col-md-6 mt-4">

                            <div className=" d-flex justify-content-between">
                                <div><h3>Edit Product</h3>
                                    <span className="text-muted">
                                        Last Updated On :{lastUpdated != null ? lastUpdated.substring(0, 10) : "NA"}
                                        <br />
                                        Time : {lastUpdated != null ? lastUpdated.substring(11, 19) : "NA"}
                                    </span></div>

                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        navigate(-1)
                                    }}

                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                    </svg>
                                    Back

                                </button>
                            </div>

                            <div className=' mb-3 mt-3'>

                                <label className='form-label'>Product Name : </label>

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


                            <div className=' mb-3'>
                                <label className='form-label'>Product Price : </label>
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
                            <div className=' mb-3'>
                                <label className='form-label'>moq : </label>
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

                            </div>
                            <div className=' mb-3'>
                                <label className='form-label'> Packing : </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Price'
                                    aria-label='Enter Price'
                                    value={packing}
                                    onChange={e => {
                                        setPacking(e.target.value)
                                    }}

                                />

                            </div>
                            <div className=' mb-3'>
                                <label className='form-label'> Ex : </label>
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

                            </div>
                            <div className=' mb-3'>
                                <label className='form-label'> Payment Terms : </label>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Enter Payment Terms'
                                    aria-label='Enter Payment Terms'
                                    value={paymentTerms}
                                    onChange={e => {
                                        setPaymentTerms(e.target.value)
                                    }}

                                />

                            </div>
                            <div className=' mb-3'>
                                <label className='form-label'> Grade : </label>
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

                            </div>
                            <div className=' mb-3'>
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
                    )

            }


        </div >
    )
}

export default EditProduct