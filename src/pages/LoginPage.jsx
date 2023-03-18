import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
} from 'mdb-react-ui-kit';
import { useContext, useState } from 'react';
// import { UserContext } from '../App';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const LoginPage = () => {

    const { setCurrentUser, currentUser } = useContext(UserContext);

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            toast.error('Please fill all the fields');
            return;
        }
        axios.post('http://localhost:5000/api/auth/login', {
            emailId: email,
            password: password
        })
            .then(res => {
                console.log(res.data);
                setCurrentUser(res.data);
                toast.success('Login Successfull');
                //set user in local storage
                localStorage.setItem('currentUser', JSON.stringify(res.data));
                console.log(currentUser);
                navigate('/add-new-product')
            }
            )
            .catch(err => {
                console.log(err);
                toast.error('Invalid Credentials');
            }
            )

    }

    return (
        <div>
            <div className="my-5 gradient-form container">

                <div className='row'>
                    <ToastContainer />
                    <div col='6' className="mb-5 col">
                        <div className="d-flex flex-column ms-5">

                            <div className="text-center">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                    style={{ width: '185px' }} alt="logo" />
                                <h4 className="mt-1 mb-5 pb-1">Askhar Chemicals India PVT LTD</h4>
                            </div>

                            <p>Please login to your account</p>


                            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />

                            <div className="text-center pt-1 mb-5 pb-1">
                                <button className="mb-4 w-100 gradient-custom-2 btn text-white "
                                    onClick={(event) => {

                                        handleSubmit(event);
                                        // navigate('/')
                                        // window.location.href = '/add-new-product' 

                                    }
                                    }
                                >
                                    Sign in
                                </button>
                            </div>


                        </div>

                    </div>

                    <MDBCol col='6' className="mb-5">
                        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

                            <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                <h4 class="mb-4">We are more than just a company</h4>
                                <p class="small mb-0">
                                    We, AKSHAR GROUP, Are A Decade-old, Family-Owned
                                    Chemical Manufacturer, Distributor, and Exporter
                                    (Industrial & Agro Chemicals). We understand the needs
                                    of Domestic and International Markets.
                                </p>
                                <br />
                                <p class="small mb-0">
                                    WWW.AKSHARINTERNATIONAL.IN
                                </p>
                            </div>
                        </div>

                    </MDBCol>

                </div>


            </div>
        </div>
    );
}
export default LoginPage;
