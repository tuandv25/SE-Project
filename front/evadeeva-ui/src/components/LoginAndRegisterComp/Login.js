import { useState } from "react"
import { connect } from "react-redux"
import { startLogin} from '../../actions/user'
import { Link } from "react-router-dom"
import {firebase, provider,providerFaceBook } from "../../firebase/firebase"
import Popup from 'reactjs-popup';
import "../../assets/style/style.css"
import brandLogo from "../../assets/images"

function Login(){
  const [error,setError] = useState(false)
  const [errorFP,setErrorFP] = useState(false)
  const [errorMessage,setErrorMessage] = useState("")
  const [Email,setEmail]= useState("")
  const [pass,setPass] = useState("")
  const [successSent,setSuccessSent]=useState(false)

  const HandleSignInWithEmailPassword = ()=>{
      firebase.auth().signOut()
      firebase.auth().signInWithEmailAndPassword(Email, pass)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setError(true)
          setErrorMessage(errorMessage)
        })
    }
    
    const HandleSignWithGooGle = ()=>{
      firebase.auth().signInWithPopup(provider).then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(true)
        setErrorMessage(errorMessage)
      });
    }

    const HandleSignWithFacebook = ()=>{
      firebase.auth().signInWithPopup(providerFaceBook)
    }

    const HadleSentEmailForgotPass = ()=>{
      firebase.auth().sendPasswordResetEmail(Email)
      .then(() => {
        setSuccessSent(true)
      })
      .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      setErrorFP(true)
      setErrorMessage(errorMessage)
    });
    }

    return (
      <section className="ftco-section">
        <div className="container">
        <div className="row">
        <div className="col-md-6">
          <div className="pt-5">
            <Link to="/">
                <img src={brandLogo.logo} className="img-fluid" style={{width: "70%"}} alt="Eva De Eva"/>
            </Link>
          </div>
        </div>
          <div className="col-md-6">
          <div>{error && <span>{errorMessage}</span>}</div>
          <div id="customer-login">
            <div id="login" className="userbox">
              <div className="accounttype">
                <h2 className="title" />
              </div>
                <div className="clearfix large_form">
                  <input onChange={(e)=>{setEmail(e.target.value); setError(false)}}  required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" type="email" defaultvaluename="customer[email]"
                   id="customer_email" placeholder="Email" className="text" />
                </div>
                <div className="clearfix large_form">
                  <input onChange={(e)=>{setPass(e.target.value); setError(false)}}  required type="password" defaultvaluename="customer[password]" id="customer_password" placeholder="Mật khẩu" className="text" size={16} />      
                </div>
                <div className="clearfix action_account_custommer">
                  <div className="action_bottom button dark">
                    <button className="btn btn-signin" onClick={HandleSignInWithEmailPassword}>Đăng nhập</button>
                  </div>
                  <div className="req_pass">
                    <Popup trigger={<a style={{color: "black", cursor: "pointer"}}>Quên mật khẩu?</a>} modal nested>
                        {close => (
                          <div>
                              <div className="modal-header d-flex justify-content-center">
                                <h4 className="modal-title">Find Your Account</h4>
                              </div>
                              <div className="modal-body">
                              <div className="container">
                                  <div className="row justify-content-center">
                                    <form id="checkout-form" className="p-md-1" style={{width: "30rem"}}>
                                        <div className="row align-items-end">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="fullname" className="font-weight-normal">Please enter your email address to search for your account</label>
                                                    <input type="text"
                                                        onChange={(e)=>{setEmail(e.target.value); setError(false); setErrorFP(false)}}
                                                        className="form-control"
                                                        style={{fontSize: "15px"}}
                                                    />
                                                    <div>{errorFP && <span>{errorMessage}</span>}</div>
                                                    <div>{successSent && <span>Vui lòng kiểm tra email của bạn</span>}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                  </div>
                              </div>
                              </div>
                              <div className="modal-footer">
                                  <div className="d-flex justify-content-end orders-footer">
                                      <button className="ml-3 px-3 py-1 btn-success"
                                          onClick={HadleSentEmailForgotPass}
                                      >Send</button>
                                      <button className="ml-3 px-3 py-1 btn-danger"
                                          onClick={close}
                                      >Cancel</button>
                                  </div>
                              </div>
                          </div>
                        )}
                    </Popup>
                    <br/>
                    hoặc <Link to="/register" style={{color: "black"}}>Đăng ký</Link>
                  </div>
                </div>
                </div>
            <div style={{paddingTop: '15px'}} id="wrap-social-login-plus">
              <button  onClick ={HandleSignWithGooGle} className="btn-login-plus btn-google-login" id="btn-google-login-styled" style={{width: '200px', padding: '0px 10px 0px 0px', border: 'none', color: 'rgb(255, 255, 255)', fontWeight: 500, borderRadius: '5px', display: 'block', marginBottom: '8px', backgroundColor: 'rgb(221, 75, 57)', cursor:"pointer"}}>
                <div className="pre-btn-login" id = "pre_button_gg" ></div><div 
              className="label-btn-login"  style={{float: 'left', lineHeight: '40px',fontSize:'14px',textAlign:"center"}}>Đăng nhập Google</div>
              </button>
              <button className="btn-login-plus btn-facebook-login" id="btn-facebook-login-styled" style={{width: '200px',height:'40px', padding: '0px 10px 0px 0px', border: 'none', color: 'rgb(255, 255, 255)', fontWeight: 500, borderRadius: '5px', display: 'block', marginBottom: '8px', backgroundColor: 'rgb(59, 89, 152)', cursor:"pointer"}}>
                <div
               className="pre-btn-login"  id = "pre_button_fb" ></div><div 
               className="label-btn-login"onClick = {HandleSignWithFacebook} style={{float: 'left', lineHeight: '40px',fontSize:'14px'}}>Đăng nhập Facebook</div>
               </button>
            </div>
          </div>
        </div>
        </div>
        </div>
      </section>
  )
  }

  export default Login