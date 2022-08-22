import { useState } from "react"; 
import { useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const UPDATE_USER = gql`
        mutation Mutation($data: updateUserInput!, $email: String!) {
            updateUser(data: $data, email: $email) {
                id
            }
        }`;

const UpdateUser = ()=>{
    const { user } = useSelector((state) => ({
        user: state.User,
        })
    );
    
    const [update] = useMutation(UPDATE_USER);
    const dateNow = new Date().toISOString().split('T')[0];
    const birthdayFormated = new Date(parseFloat(user.birthday));
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        birthday: birthdayFormated.toISOString().split('T')[0],
    });

    const handleUpdateUser = ()=>{
        try {
            update({
                variables: {
                    data: {
                        name: data.name,
                        phoneNumber: data.phoneNumber,
                        address: data.address,
                        birthday: data.birthday + "T00:00:00.000Z" 
                    },
                    email: data.email,
                },
            });
            toast.success("Thay đổi thông tin thành công!")
        } catch (error) {
            console.log(error)
        }
       
    }
    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 ftco-animate">
                        {/* Form Infor */}
                        <form id="checkout-form" className="billing-form bg-light p-md-5">
                            <h3 className="mb-2 billing-heading">Filling Your Information</h3>
                            <div className="row align-items-end">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="fullname">Full Name</label>
                                        <input
                                            value={data.name}
                                            onChange = {(e) => setData({
                                                    ...data,
                                                    name: e.target.value,
                                                })
                                            }
                                            id="fullname"
                                            name="fullname"
                                            type="text"
                                            placeholder="Your Fullname"
                                            className="form-control"
                                            required
                                        />
                                        <span className="form-message"></span>
                                    </div>
                                </div>
                                <div className="w-100"></div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            value={data.phoneNumber}
                                            onChange = {(e) => setData({
                                                    ...data,
                                                    phoneNumber: e.target.value,
                                                })
                                            }
                                            id="phone"
                                            name="phone"
                                            type="text"
                                            placeholder="Your Phone Number"
                                            className="form-control"
                                            required
                                        />
                                        <span className="form-message"></span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="birthday">Birthday</label>
                                        { user.birthday === "-2524521600000"?
                                        <input
                                            value={data.birthday}
                                            onChange = {(e) => setData({
                                                    ...data,
                                                    birthday: e.target.value,
                                                })
                                            }
                                            id="birthday"
                                            name="birthday"
                                            type="date"
                                            className="form-control"
                                            min="1930-01-01" max={dateNow}
                                            required
                                        />
                                        :
                                        <input
                                            readOnly={true}
                                            value={data.birthday}
                                            id="birthday"
                                            name="birthday"
                                            type="text"
                                            className="form-control"
                                        />
                                        }
                                        <span className="form-message"></span>
                                    </div>
                                </div>
                                <div className="w-100"></div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="emailaddress">Email Address</label>
                                        <input
                                            readOnly={true}
                                            value={data.email}
                                            onChange = {(e) => setData({
                                                    ...data,
                                                    email: e.target.value,
                                                })
                                            }
                                            id="emailaddress"
                                            name="emailaddress"
                                            type="text"
                                            placeholder="Your Email"
                                            className="form-control"
                                        />
                                        <span className="form-message"></span>
                                    </div>
                                </div>
                                <div className="w-100"></div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="address">Street Address</label>
                                        <input
                                            value={data.address}
                                            onChange = {(e) => setData({
                                                    ...data,
                                                    address: e.target.value,
                                                })
                                            }
                                            id="address"
                                            name="address"
                                            type="text"
                                            placeholder="Your Address"
                                            className="form-control"
                                            required
                                        />
                                        <span className="form-message"></span>
                                    </div>
                                </div>
                                <div className="w-100"></div>
                            </div>
                            <div className="d-flex justify-content-end orders-footer mt-1">
                                <button className="px-5 py-1"
                                    onClick = {
                                        async function () {
                                            await handleUpdateUser()
                                        }
                                    }
                                >Update</button>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </section>
    )
}
export default UpdateUser;