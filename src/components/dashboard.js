import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import { Oval,Bars } from 'react-loading-icons';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useEffect } from 'react';
const axios = require("axios");
const SignupSchema = Yup.object().shape({
    url: Yup.string()
    .required('Required')
    .matches("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)","URL is not valid. Check if your URL starts with http:// or https://")
  });
export default function Dashboard(){
    let history = useHistory();
    let [info,setInfo] = useState({});
    let [page,setPage] = useState(0);
    let [click,setClick] = useState(0);
    let [linkdata, setLinkdata] = useState([]);
    let handlelogout = ()=>{
        axios.delete("http://localhost:3100/auth/logout",{
            headers:{
              'Content-Type': 'application/json'
            },
            withCredentials: true,
            crossDomain: true
          }).then((res) => {
            console.log(res);
            if(res.status===200){
              console.log("Logged out");
              history.push(`/login`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    useEffect(()=>{
        axios.get("http://localhost:3100/auth/authchecker",{
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          crossDomain: true
        }).then((res) => {
          console.log(res);
          if(res.status===200){
            console.log("Logged in");
            //data.setUserid(res.data.sessUser.id);
            axios.get(`http://localhost:3100/users/getdetails/${res.data.sessUser.email}`,{
                eaders:{
                    'Content-Type': 'application/json'
                  },
                  withCredentials: true,
                  crossDomain: true
            }).then((result)=>{
                setInfo(result.data);
                setLinkdata(result.data.links);
                console.log("result",result.data);
                setPage(1);
            }).catch((error) => {
                console.log(error);
                toast.error("Could not find data!");
            });
          }
        })
        .catch((error) => {
          console.log(error);
          history.push("/login");
        });
    },[history]);
    let updateClicks = (short_url)=>{
        axios.post("http://localhost:3100/users/updateclicks",{email:info.email,short_url},{
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          crossDomain: true
        }).then((res) => {
          console.log(res);
          if(res.status===200){
            console.log("updated clicks");
            console.log(res.data);
            setLinkdata(res.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return <>
    {
        page===0?
        <div className="background" style={{background: 'linear-gradient(to right,rgb(186, 105, 233), rgb(129, 9, 209))'}}>
            <p className="center"> 
                <Bars stroke="#ffffff" fill="#ffffff" strokeOpacity={1} speed={1} fillOpacity={1} strokeWidth={3} height="50rem"/>
            </p>
        </div>:
        (<div className="background" style={{background: 'linear-gradient(to right,rgb(186, 105, 233), rgb(129, 9, 209))'}}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 mt-3">
                    <span className="mx-2 heading"> Hi {info.firstname}!</span>
                    <span><button type="button" onClick={handlelogout} className="float-right btn bold btn-mybutton mx-3 mt-2">Logout </button></span>
                    </div>
                </div>
                <hr/>
            </div>
            <div className="container-fluid">
                <div className="row text-center">
                    <div className="col-sm-8 py-3">
                        <div className="card h-100 px-4">
                            <h3 className="pt-3">Create a new short URL</h3>
                            <Formik
                    initialValues={{
                        url: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values,{resetForm}) => {
                        // same shape as initial values
                        setClick(1);
                        console.log(values);
                        axios.post("http://localhost:3100/users/createurl",{
                            email:info.email,
                            url:values.url,
                        },{
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            withCredentials: true,
                            crossDomain: true
                        })
                        .then((res) => {
                            if(res.status===200){
                                console.log("url created");
                                setLinkdata(res.data);
                                toast.success("URL created successfully!")
                                setClick(0);
                                resetForm();
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            toast.error("Something went wrong!");
                            setClick(0);
                            resetForm();
                        });
                    }}
                >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="url" type="text" placeholder="Paste the URL here.." className="form-control mt-4"/>
                        {errors.url && touched.url ? <div>{errors.url}</div> : null}
                        <button type="submit" className="btn btn-primary mt-4 mb-5">{click === 0 ? <span>Submit</span>: <span>Loading... <Oval stroke="#ffffff" fill="#000000" strokeOpacity={1} speed={1} fillOpacity={1} strokeWidth={3} height="1.5rem"/></span>}</button>
                    </Form>
                )}
                </Formik>
                        </div>
                    </div>
                    <div className="col-sm-4 py-3">
                        <div className="card px-4 h-100">
                            <h4 className="pt-3">URLs created So far..</h4>
                            <h1 className="py-5">{info.links.length}</h1>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row text-center">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <div className="table-responsive">
                                <h3 className="pt-4"> Your URLs</h3>
                                {
                                    info.links.length>0?
                                    <table className="table table-bordered table-striped my-4">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th> Original URL </th>
                                    <th> Short URL</th>
                                    <th> Clicks </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    linkdata.map((items,index)=>{
                                        return <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{items.original_url}</td>
                                            <td><a rel="noreferrer" href={items.short_url} target="_blank" onClick={()=>{updateClicks(items.short_url)}}>{items.short_url}</a></td>
                                            <td>{items.clicks}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>:(
                            <h2 className="py-4"> Nothing much to show here...</h2>
                        )

                        }
                        
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>)
    }
    </>

}