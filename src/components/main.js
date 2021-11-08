import {Link} from "react-router-dom";
export default function Main(){
    return <>
    <div className="background" style={{background: 'linear-gradient(to right,rgb(186, 105, 233), rgb(129, 9, 209))'}}>
        <div>
        <nav className="navbar navbar-expand-lg header">
            <div className="container">
                <span className="nav-brand">Precis - The URL Shortening App</span>
                <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <Link to="/login" className="nav-link"><span className="nav-style"> <button type="button" className="btn btn-mybutton"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</button></span></Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-6 mt-3 pt-3">
                    <img src="/images/main.png" height="100%" width="100%" alt="main"/>
                </div>
                <div className="col-md-6 pt-5 mt-4">
                    <h3 className="pt-5 text-center"> Create Short URL with Precis easily!</h3>
                    <h5 className="px-5 py-4">
                        <ul>
                            <li className="my-2"> <i className="fa fa-chevron-right" aria-hidden="true"></i> Create your account for free </li>
                            <li className="my-2"> <i className="fa fa-chevron-right" aria-hidden="true"></i> Make unlimited Short URLs</li>
                            <li className="my-2"> <i className="fa fa-chevron-right" aria-hidden="true"></i> Keep track of all your URLs </li>
                        </ul>
                    </h5>
                    <div className="text-center">
                    <Link to="/signup" className="nav-link" href="#">
                    <button className="btn btn-mybutton mt-3 mb-5">Get Started <i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
       
    
    </div>
    </>
}