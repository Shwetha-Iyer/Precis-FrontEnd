import { useState } from "react";
import '../App.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Bars } from 'react-loading-icons';
import { useEffect } from 'react';
import { Oval } from 'react-loading-icons';
import {useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const axios = require("axios");

const SignupSchema = Yup.object().shape({
    secret: Yup.string()
    .required('Required') 
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, 'Password does not match criteria'),
  });

  const ResetSchema = Yup.object().shape({
    password: Yup.string()
    .required('Required') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(15, 'Max 15 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, 'Password does not match criteria'),
  });
export default function Resetpassword(props){
    let [page,setPage] = useState(0);
    let [click,setClick] = useState(0);
    let history = useHistory();
    useEffect(()=>{
        axios.post(`https://precis-backend.herokuapp.com/auth/resetpwdcheck/${props.match.params.token}`,{
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          crossDomain: true
        }).then((res) => {
          console.log(res);
          if(res.status===200){
            setPage(1);
          }
        })
        .catch((error) => {
          console.log(error);
          setPage(-1);
        });
    },[props.match.params.token]);
    return <>    
    {
        page === 0?
        <p className="center"> <Bars stroke="#ba69e9" fill="#ba69e9" strokeOpacity={1} speed={1} fillOpacity={1} strokeWidth={3} height="10rem"/>
        </p>:(
            page === 1?
            <div className="background" style={{background: 'linear-gradient(to right,rgb(186, 105, 233), rgb(129, 9, 209))'}}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 pt-5">
                        <h1 className="text-center color-blue pt-4 pb-4"> Secret Key Check</h1>
                    <Formik
                    initialValues={{
                        secret: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values,{resetForm}) => {
                        // same shape as initial values
                        setClick(1);
                        console.log(values);
                        axios.post(`https://precis-backend.herokuapp.com/auth/resetpwdcheck/${props.match.params.token}`,{
                            secret:values.secret,
                        },{
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true,
                            crossDomain: true
                        })
                        .then((res) => {
                            if(res.status===200){
                                console.log("success");
                                setClick(0);
                                resetForm();
                                setPage(2);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            if(error.response.status===401)
                                toast.error("Secret Key does not match");
                            else
                                toast.error("Internal Server Error");
                            setClick(0);
                            resetForm();
                        });
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="secret" type="password" placeholder="Secret Key" className="form-control mt-4"/>
                        {errors.secret && touched.secret ? <div>{errors.secret}</div> : null}
                        <button type="submit" className="btn btn-mybutton mt-4 mt-3 mb-5 btn-mar">{click === 0 ? <span>Submit</span>: <span>Loading... <Oval stroke="#ffffff" fill="#000000" strokeOpacity={1} speed={1} fillOpacity={1} strokeWidth={3} height="1.5rem"/></span>}</button>
                    </Form>
                )}
                </Formik>
                    </div>

                </div>
                <div className="col-md-4"></div>
            </div>
            </div>
            :(
                    page === 2 ?
                    <div className="background" style={{background: 'linear-gradient(to right,rgb(186, 105, 233), rgb(129, 9, 209))'}}>
                    <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 pt-5">
                        <h1 className="text-center color-blue pt-4 pb-4"> Reset Password</h1>
                    <Formik
                    initialValues={{
                        password: '',
                    }}
                    validationSchema={ResetSchema}
                    onSubmit={(values,{resetForm}) => {
                        // same shape as initial values
                        setClick(1);
                        console.log(values);
                        axios.put(`https://precis-backend.herokuapp.com/auth/resetpwd/${props.match.params.token}`,{
                            password:values.password,
                        },{
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true,
                            crossDomain: true
                        })
                        .then((res) => {
                            if(res.status===200){
                                console.log("success");
                                setClick(0);
                                toast.success("Password Changed!");
                                resetForm();
                                history.push("/login");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                                toast.error("Internal Server Error");
                            setClick(0);
                            resetForm();
                        });
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="password" type="password" placeholder="Password" className="form-control mt-4"/>
                        {errors.password && touched.password ? <div>{errors.password}</div> : null}
                        <button type="submit" className="btn btn-mybutton mt-4 mt-3 mb-5 btn-mar">{click === 0 ? <span>Submit</span>: <span>Loading... <Oval stroke="#ffffff" fill="#000000" strokeOpacity={1} speed={1} fillOpacity={1} strokeWidth={3} height="1.5rem"/></span>}</button>
                    </Form>
                )}
                </Formik>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                </div>
            </div>: <img className="center responsive" src="../images/page unavailable.jpg" alt="pageunavailable"/>
                )
            
        )   
    }
    </>
}