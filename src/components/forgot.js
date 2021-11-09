import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Oval } from 'react-loading-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const axios = require("axios");
const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
});
export default function Forgot(){
    let [click,setClick] = useState(0);
    return <>
    <div className="background" style={{background: 'linear-gradient(to right,rgb(186, 105, 233), rgb(129, 9, 209))'}}>
    <h1 className=" text-center pt-4"> Forgot Password</h1>
    <div className="container pt-2">
        <div className="row pt-2 text-center">
            <div className="col-md-4"></div>
            
                <div className="col-md-4 font-black text-center my-4 card-form">
                    <img src ="../images/forgot.png" height="50%" width="40%" alt="login" className="img"/>
                    <Formik
                    initialValues={{
                        email: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values,{resetForm}) => {
                        // same shape as initial values
                        setClick(1);
                        console.log(values);
                        axios.put("https://precis-backend.herokuapp.com/auth/forgot",{email:values.email},{
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true,
                            crossDomain: true
                        }).then((res) => {
                            console.log(res);
                            if(res.status===200){
                                toast.success("Password reset link has been sent to your email!");
                                setClick(0);
                                resetForm();
                            }
                        }).catch((error) => {
                            console.log(error);
                            if(error.response.status===404)
                                toast.warning("This email is not registered!");
                            else
                                toast.error("Internal server error");
                            setClick(0);
                            resetForm();
                        });
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="email" type="email" placeholder="Email" className="form-control mt-4"/>
                        {errors.email && touched.email ? <div>{errors.email} </div>: null}
                        <button type="submit" className="btn btn-mybutton mt-4 mt-3 mb-5">{click === 0 ? <span className="btn-login">Submit</span>: <span className="btn-login">Loading... <Oval stroke="#ffffff" fill="#000000" strokeOpacity={1} speed={1} fillOpacity={1} strokeWidth={3} height="1.5rem"/></span>}</button>
                    </Form>
                )}
                </Formik>
                </div>
                <div className="col-md-4"></div>
            </div>
            
            
        </div>
    </div>
    </>
}