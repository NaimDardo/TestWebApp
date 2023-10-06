import React, { useState, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { Cloudinary } from "@cloudinary/url-gen";
//import logo from '../../images/logo-full.png'
import { ListGroup } from "react-bootstrap";
import {
    loadingToggleAction,
    signupAction,
} from '../../store/actions/AuthActions';
import 'react-phone-number-input/style.css'
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import axios from 'axios';
// import { removeClass } from '@syncfusion/ej2-base';

function Register(props) {

    const [image, setImage] = useState("");
    const uploadImage = async () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "hffwpnin")
        data.append("cloud_name", "ddp3ftywy")
        return fetch("https://api.cloudinary.com/v1_1/ddp3ftywy/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                return (data.url)
            })
            .catch(err => console.log(err))
    }
    const [email, setEmail] = useState('');
    const [value, setValue] = useState('');


    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('DOC');
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);

    };


    //******************************** */







    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function onSignUp(e) {
        e.preventDefault();
        let urlImage = await uploadImage()

        const elements = e.target.elements
        let data = {}
        for (let item in elements) {
            if (isNaN(item) && !['item', 'namedItem', 'length'].includes(item)) {
                data[item] = elements[item].value
            }
        }
        data = { ...data, urlImage }
        let error = false;
        const errorObj = { ...errorsObj };
        if (e.target.email.value === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }

        if (e.target.password.value === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }

        setErrors(errorObj);

        if (error) return;
        dispatch(loadingToggleAction(true));

        dispatch(signupAction(data, navigate));

    }
    return (

        <div className='authincation h-100 p-meddle'>
            <div className='container h-100'>
                <div className='row justify-content-center h-100 align-items-center'>
                    <div className='col-md-9'>
                        <div className='authincation-content'>
                            <div className='row no-gutters'>
                                <div className='col-xl-12'>
                                    <div className='auth-form'>
                                        {/* <div className='text-center mb-3'>
                                            <img src={logo} alt="" />
                                        </div> */}

                                        <h4 className='text-center mb-4 '>Sign up your account</h4>
                                        {props.errorMessage && (
                                            <div className='bg-red-300 text-danger border border-red-900 p-1 my-2'>
                                                {props.errorMessage}
                                            </div>
                                        )}
                                        {props.successMessage && (
                                            <div className='bg-green-300 text-green-900 p-1 my-2' style={{ "color": '#4caf50' }}>
                                                {props.successMessage}
                                            </div>
                                        )}
                                        <form onSubmit={onSignUp}>
                                            <div className='form-group'>
                                                <label className='mb-1 '>
                                                    <strong>Email</strong>
                                                </label>
                                                <input type="email" className="form-control"
                                                    value={email}
                                                    name="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 '>
                                                    <strong>Password</strong>
                                                </label>
                                                <input type="password" className="form-control"
                                                    value={password}
                                                    name="password"
                                                    onChange={(e) =>
                                                        setPassword(e.target.value)
                                                    }
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 '>
                                                    <strong>Role</strong>
                                                </label>
                                                <select name="role" value={selectedOption} onChange={handleOptionChange} className='form-control'>
                                                    <option value="DOC">Doctor</option>
                                                    <option value="HOS">Hospital Agent</option>
                                                    <option value="DN">Nursery Admin</option>
                                                </select>
                                            </div>
                                            <div className='form-group'>
                                                        <label className='mb-1 '>
                                                            <strong>Birth Date</strong>
                                                        </label>
                                                        <input type="date" className="form-control" name="birthdate" />
                                            </div>
                                            <div className='form-group'>
                                                        <label className='mb-1 '>
                                                            <strong>Gender</strong>
                                                        </label>
                                                        <select className='form-control' name='gender'>
                                                            <option value="Male">N/</option>
                                                            <option value="Female">Female</option>
                                                            <option value="N/">Male</option>
                                                        </select>
                                            </div>
                                            <div className='form-group'>
                                                        <label className='mb-1 '>
                                                            <strong>FullName</strong>
                                                        </label>
                                                        <input type='text' className='form-control' placeholder='FullName' name='FullName' />
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 '><strong>Phone number</strong></label>
                                                <div className='form-control' >
                                                    <PhoneInputWithCountrySelect name="tel" value={value} onChange={setValue} />

                                                </div>
                                            </div>

                                            {selectedOption === 'DOC' && (
                                                <>
                                                    <div className="row">
                                                        <div className='form-group' style={{ "width": "50%", marginLeft: "2%" }}>
                                                            <label className='mb-1 '>
                                                                <strong> Office Address</strong>
                                                            </label>
                                                            <input type='text' className='form-control' placeholder='Office Adress' name='Adress' />
                                                        </div>
                                                        <div className='form-group' style={{ "width": "15%", marginLeft: "3%" }}>
                                                            <label className='mb-1 '>
                                                                <strong> City</strong>
                                                            </label>
                                                            <input type='text' className='form-control' placeholder='City' name='City' />

                                                        </div>
                                                        <div className='form-group' style={{ "width": "25%", marginLeft: "3%" }}>
                                                            <label className='mb-1 '>
                                                                <strong> PostCode</strong>
                                                            </label>
                                                            <input type='text' className='form-control' placeholder='Postal Code' name='PostCode' />

                                                        </div>

                                                    </div>
                                                </>
                                            )}



                                            {selectedOption === 'HOS' && (
                                                <>
                                                    <div className='form-group'>
                                                        <label className='mb-1 '>
                                                            <strong> Hospital Name</strong>
                                                        </label>
                                                        <input type='text' className='form-control' placeholder='Hospital Name' name='HosName' />

                                                    </div>
                                                    <div className="row">
                                                        <div className='form-group' style={{ "width": "50%", marginLeft: "2%" }}>
                                                            <label className='mb-1 '>
                                                                <strong> Address</strong>
                                                            </label>
                                                            <input type='text' className='form-control' placeholder='Hospital Adress' name='Adress' />
                                                        </div>
                                                        <div className='form-group' style={{ "width": "15%", marginLeft: "3%" }}>
                                                            <label className='mb-1 '>
                                                                <strong> City</strong>
                                                            </label>
                                                            <input type='text' className='form-control' placeholder='City' name='City' />

                                                        </div>
                                                        <div className='form-group' style={{ "width": "25%", marginLeft: "3%" }}>
                                                            <label className='mb-1 '>
                                                                <strong> PostCode</strong>
                                                            </label>
                                                            <input type='text' className='form-control' placeholder='Postal Code' name='PostCode' />

                                                        </div>

                                                    </div>
                                                </>
                                            )}

                                            {selectedOption === 'DN' && (
                                                 <>
                                                 <div className='form-group'>
                                                     <label className='mb-1 '>
                                                         <strong> Nursery Name</strong>
                                                     </label>
                                                     <input type='text' className='form-control' placeholder='Nursery Name' name='NursName' />

                                                 </div>
                                                 <div className="row">
                                                     <div className='form-group' style={{ "width": "50%", marginLeft: "2%" }}>
                                                         <label className='mb-1 '>
                                                             <strong> Address</strong>
                                                         </label>
                                                         <input type='text' className='form-control' placeholder='Nursery Adress' name='Adress' />
                                                     </div>
                                                     <div className='form-group' style={{ "width": "15%", marginLeft: "3%" }}>
                                                         <label className='mb-1 '>
                                                             <strong> City</strong>
                                                         </label>
                                                         <input type='text' className='form-control' placeholder='City' name='City' />

                                                     </div>
                                                     <div className='form-group' style={{ "width": "25%", marginLeft: "3%" }}>
                                                         <label className='mb-1 '>
                                                             <strong> PostCode</strong>
                                                         </label>
                                                         <input type='text' className='form-control' placeholder='Postal Code' name='PostCode' />

                                                     </div>

                                                 </div>
                                                 <div className="row">
                                                     <div className='form-group' style={{ "width": "45%" ,marginLeft: "2%"}}>
                                                         <label className='mb-1 '>
                                                             <strong> From</strong>
                                                         </label>
                                                         <input type='text' className='form-control' placeholder='Openning Hour HH:MM' name='fromTime' />
                                                     </div>
                                                     <div className='form-group' style={{ "width": "45%",marginLeft: "6%" }}>
                                                         <label className='mb-1 '>
                                                             <strong> To</strong>
                                                         </label>
                                                         <input type='text' className='form-control' placeholder='Closing Hour HH:MM' name='toTime' />

                                                     </div>

                                                 </div>
                                                 <div className='form-group'>
                                                     <label className='mb-1 '>
                                                         <strong> Nursery Type</strong>
                                                     </label>
                                                     <input type='text' className='form-control' name='NursType' />

                                                 </div>
                                             </>
                                            )}

                                            <div className='row'>
                                                <div className='form-group' style={{ "width": "70%", marginLeft: "3%" }}>
                                                    <label className='mb-1 '>
                                                        <strong>Profile Photo</strong>
                                                    </label>
                                                    <input type="file" className="form-control" accept="image/*" onChange={(ev) => setImage(ev.target.files[0])}></input>
                                                </div>
                                            </div>

                                            {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                                            <div className='text-center mt-4'>
                                                <input type='submit' className='btn btn-primary btn-block' value='SignUp' />
                                            </div>


                                        </form>
                                        <div className='new-account mt-3 '>
                                            <p>
                                                Already have an account?{' '}
                                                <Link className='text-primary' to='/login'>
                                                    Sign in
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(Register);
