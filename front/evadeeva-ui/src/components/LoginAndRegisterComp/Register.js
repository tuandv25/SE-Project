import {useState} from 'react'
import {firebase } from "../../firebase/firebase"
import {Link, useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import brandLogo from '../../assets/images';
import { startSetLogin} from '../../actions/user';

function Register(){
    const [ten,setTen]= useState("")
    const [ho,setHo]= useState("")
    const [Email,setEmail]= useState("")
    const [pass,setPass] = useState("")
    const [repass,setRepass] = useState("")
    const [error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")

    const history = useHistory()

    const HandleResgister = async ()=>{
      if (ten.length === 0){
        setError(true);
        setErrorMessage ("Vui lòng nhập tên")
        return
      }

      if (ho.length === 0){
        setError(true);
        setErrorMessage ("Vui lòng nhập họ")
        return
      }

      if (pass.length < 6 ){
      setError(true);
      setErrorMessage ("Mật khẩu phải có ít nhất 6 kí tự")
      return
      }
      if (pass !== repass){
        setError(true);
        setErrorMessage ("Mật khẩu không khớp")
        return
      }
      else{
        firebase.auth().createUserWithEmailAndPassword(Email, pass)
        .then((userCredential) => {
         // Signed in 
          var user = userCredential.user;
          const hoten =  ho +" " + ten
          user.updateProfile({
            displayName: hoten
        }).then(function() {
          var displayName = firebase.auth().currentUser.displayName;
          console.log(displayName)
          startSetLogin({name:displayName, email: Email})
          toast.success("Đăng kí thành công")
        });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setError(true)
          setErrorMessage(errorMessage)
        });
         }
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
        {error && <div>{errorMessage}</div>}
          <div id="customer-login">
            <div id="login" className="userbox">
              <div className="accounttype">
                <h2 className="title" />
              </div>
              <div className="clearfix large_form">
                <input minLength={"1"} onChange={(e)=>{setTen(e.target.value)}}  type="text"
                   id="customer_ten" placeholder="Nhập tên" className="text" />
                </div>
                <div className="clearfix large_form">
                  <input minLength={"1"}  onChange={(e)=>{setHo(e.target.value)}}  type="text"  
                   id="customer_ho" placeholder="Nhập họ" className="text" />
                </div>
                <div className="clearfix large_form">
                  <label htmlFor="customer_email" className="icon-field"><i className="icon-login icon-envelope " /></label>
                  <input  onChange={(e)=>{setEmail(e.target.value)}} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" type="email" defaultvaluename="customer[email]"
                   id="customer_email" placeholder="Email" className="text" />
                </div>
                <div className="clearfix large_form">
                  <label htmlFor="customer_password" className="icon-field"><i className="icon-login icon-shield" /></label>
                  <input minLength={"6"} onChange={(e)=>{setPass(e.target.value)}} required type="password" defaultvaluename="customer[password]" id="customer_password" placeholder="Mật khẩu" className="text" size={16} />      
                </div>
                <div className="clearfix large_form">
                  <input minLength={"6"} onChange={(e)=>{setRepass(e.target.value)}} required type="password" defaultvaluename="customer[password]" id="customer_password2" placeholder="Nhập lại mật khẩu" className="text" size={16} />      
                </div>
                <div className="clearfix action_account_custommer">
                  <div className="action_bottom button dark">
                    <button  className="btn btn-signin" onClick={HandleResgister} >Đăng kí</button>
                  </div>
                </div>
                </div>   
                </div> 
        </div>
      </div>
       <ToastContainer/>
      </div>
      </section>
  ) 
  }
  export default Register