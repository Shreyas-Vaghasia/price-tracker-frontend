import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'
import NavigationBar from './../components/NavigationBar';
import { useNavigate } from 'react-router-dom';
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
        axios.get(`http://localhost:8080/api/product/${id}`)
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

        axios
            .put(
                `http://localhost:8080/api/product/${id}`,
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
                <h3>Edit Product</h3>
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