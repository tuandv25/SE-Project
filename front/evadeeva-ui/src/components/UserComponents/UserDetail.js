import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import { gql, useMutation } from '@apollo/client'
import { ToastContainer, toast } from 'react-toastify';
import { connect, useSelector } from 'react-redux'
import { cancelOrder, startLogin, stopLogin } from '../../actions/user'
import currencyFormat from '../../utils/displayPrice'

import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style/style.css"

const DELETE_ORDER = gql`
    mutation Mutation($deleteOrderId: Int!) {
        deleteOrder(id: $deleteOrderId) {
            id
        }
    }
`
const UserDetail = ({user, sale, logout, product, cancelOrder}) => {
    const [showFile, setShowFile] = useState(false);
    const [showVoucher, setShowVoucher] = useState(false);
    const [showOrder, setShowOrder] = useState(true);
    const [waitConfirm, setWaitConfirm] = useState(1);
    const [typeOfVoucher, setTypeOfVoucher] = useState(1);
    const [status, setStatus] = useState('Chờ xử lý');
    const arrOrder = user.orders.filter(item => item.status === status) || [];
    const [deleteOrder] = useMutation(DELETE_ORDER, {
        onCompleted: (data) => {
            toast.success('Hủy thành công');
            setWaitConfirm(4);
            setStatus('Hủy đơn hàng');
        }
    })

    const {vouchers, vouchersPremium, point } = useSelector((state) => ({
        vouchers: state.Voucher,
        vouchersPremium: state.VoucherPremium,
        point: state.User.point,
        })
    );
    const today = new Date();
    var vouchersPremiumCtn = 0;
    var vouchersCtn = 0;
    vouchers.map((voucher) => {
        vouchersCtn++;
    });
    vouchersPremium.map((voucher) => {
        if(voucher.condition <= point) {
            vouchersPremiumCtn++;
        }
    });

    const birthdayFormated = new Date(parseFloat(user.birthday));
    if (!user.email) {
        return (
            <section className="ftco-section ftco-cart">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center ftco-animate">
                        <Link to="/login" type="button" className="btn btn-primary py-3 px-5">
                            Login to Continue
                        </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    return (
        <section className="ftco-section">
            <div className="container">
                <div className="row">
                    <div className="sidebar-wrap col-sm-2" style={{border: "none"}}>
                        <div className="list-group list-group-flush">
                            <button className="list-group-item list-group-item-action" style={{outline: "none"}}
                                onClick={() => {setShowVoucher(false);setShowFile(true);setShowOrder(false)}}>Your Infor</button>
                            <button className="list-group-item list-group-item-action" style={{outline: "none"}}
                                onClick={() => {setShowVoucher(false);setShowFile(false);setShowOrder(true)}}>Your Orders</button>
                            <button className="list-group-item list-group-item-action" style={{outline: "none"}}
                                onClick={() => {setShowVoucher(true);setShowFile(false);setShowOrder(false)}}>Your Vouchers</button>
                            <Popup trigger={<button className="list-group-item list-group-item-action" style={{outline: "none"}}>Logout</button>} modal nested>
                                {close => (
                                    <div>
                                        <div className="modal-header text-uppercase" style={{background: '#dc3545'}}>
                                            <h6 className="modal-title d-flex justify-content-center" style={{color: "#fff", fontSize: "18px"}}>Confirm Logout</h6>
                                        </div>                                                                
                                        <div className="modal-footer">
                                            <button className="btn-light" style={{outline: 'none'}} onClick={logout}>OK</button>
                                            <button className="btn-light" style={{outline: 'none'}} onClick={close}>Cancel</button>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        <div className="container-fluid">
                            <div>
                            {
                                showFile && (
                                    <div>
                                        <h1 className="mt-2">Your Information</h1>
                                        <div className="row">
                                            <div className="col-md-8">
                                            <ul>
                                                <li>Tên Khách Hàng: {user.name}</li>
                                                <li>Điểm: {user.point} <span className="fas fa-award"></span></li>
                                                <li>Số Điện Thoại: {user.phoneNumber}</li>
                                                <li>Sinh Nhật: {birthdayFormated.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}</li>
                                                <li>Email: {user.email}</li>
                                                <li>Địa Chỉ: {user.address}</li>
                                            </ul>
                                            </div>
                                            <div className="col-md-4">
                                                { user.point >= 10000 &&
                                                    <img className="img-thumbnail" style={{width: "9rem"}} src="https://theiyafoundation.org/wp-content/uploads/2018/02/gold_membership2.jpg"/>
                                                }
                                                { user.point >= 5000 && user.point < 10000 &&
                                                    <img className="img-thumbnail" style={{width: "9rem"}} src="https://theiyafoundation.org/wp-content/uploads/2018/02/silver_membership2.jpg"/>
                                                }
                                                { user.point >= 2000 && user.point < 5000 &&
                                                    <img className="img-thumbnail" style={{width: "9rem"}} src="https://theiyafoundation.org/wp-content/uploads/2018/02/bronze_membership1.jpg"/>
                                                }
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="d-flex justify-content-start orders-footer mt-1">
                                        <button className="px-3 py-1">
                                            <Link to="/update-information" style={{color: '#333'}}>Update Your Information</Link>
                                        </button>
                                        </div>
                                    </div>
                                )
                            }
                            </div>
                            <div>
                            {
                                showVoucher && (
                                    <div>
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item" onClick={() => {
                                                setTypeOfVoucher(1)
                                            }}>
                                                <button style={{outline: "none"}} className={typeOfVoucher===1?'nav-link active':'nav-link'}>Voucher</button>
                                            </li>
                                            <li className="nav-item" onClick={() => {
                                                setTypeOfVoucher(2)
                                            }}>
                                                <button style={{outline: "none"}} className={typeOfVoucher===2?'nav-link active':'nav-link'}>Voucher Premium</button>
                                            </li>
                                            <li className="nav-item" onClick={() => {
                                                setTypeOfVoucher(3)
                                            }}>
                                                <button style={{outline: "none"}} className={typeOfVoucher===3?'nav-link active':'nav-link'}>Voucher Birthday</button>
                                            </li>
                                        </ul>
                                        {typeOfVoucher === 1 && (
                                            vouchersCtn === 0? (
                                                <h6 className="mt-3">Bạn không có mã giảm giá nào</h6>
                                            ) : (
                                                <div className="mt-3">{vouchers.map((voucher, index) => (
                                                    voucher.expireAt >= today ?
                                                    <div className="mt-2">
                                                        <div className="font-weight-bold">Tên Mã Giảm Giá: {voucher.name}</div>
                                                        {   
                                                            voucher.disCount !== 0 ?
                                                            <div className="font-italic">Giảm {currencyFormat(voucher.disCount)} VNĐ/1 sản phẩm</div>
                                                            :
                                                            <div className="font-italic">Giảm {voucher.disCount2}% tổng hóa đơn</div>
                                                        }
                                                        <div className="font-weight-light">Điều Kiện: Đơn tối thiểu {currencyFormat(voucher.condition)}đ</div>
                                                        <hr/>
                                                    </div>
                                                    :
                                                    <></>
                                                ))}
                                                </div>
                                            )
                                        )}
                                        {typeOfVoucher === 2 && (
                                            vouchersPremiumCtn === 0? (
                                                <h6 className="mt-3">Bạn không có mã giảm giá nào</h6>
                                            ) : (
                                                <div className="mt-3">{vouchersPremium.map((voucher, index) => 
                                                    (voucher.condition <= point && voucher.expireAt >= today)?
                                                    <div className="mt-2">
                                                        <div className="font-weight-bold">Tên Mã Giảm Giá: {voucher.name}</div>
                                                        {
                                                            voucher.disCount !==0 ?
                                                            <div className="font-italic">Giảm {currencyFormat(voucher.disCount)} VNĐ</div>
                                                            :
                                                            <div className="font-italic">Giảm {currencyFormat(voucher.disCount2)}% các sản phẩm loại {voucher.categoryId}
                                                            </div>
                                                        }
                                                        <div className="font-weight-light">Điều Kiện: Điểm tối thiểu {currencyFormat(voucher.condition)} điểm</div>
                                                        <hr/>
                                                    </div> : <></>
                                                )}</div>
                                            )
                                        )}
                                    </div>
                                )
                            }
                            </div>
                            <div>
                            {
                                showOrder && (
                                    <div>
                                    <ul className="nav nav-tabs">
                                    <li className="nav-item" onClick={() => {
                                        setWaitConfirm(1)
                                        setStatus('Chờ xử lý')
                                    }}>
                                        <button style={{outline: "none"}} className={waitConfirm===1?'nav-link active':'nav-link'}>Chờ xử lý</button>
                                    </li>
                                    <li className="nav-item" onClick={() => {
                                        setWaitConfirm(2)
                                        setStatus('Đang giao hàng')
                                    }}>
                                        <button style={{outline: "none"}} className={waitConfirm===2?'nav-link active':'nav-link'}>Đang giao hàng</button>
                                    </li>
                                    <li className="nav-item" onClick={() => {
                                        setWaitConfirm(3)
                                        setStatus('Đã giao hàng')
                                    }}>
                                        <button style={{outline: "none"}} className={waitConfirm===3?'nav-link active':'nav-link'}>Đã giao hàng</button>
                                    </li>
                                    <li className="nav-item" onClick={() => {
                                        setWaitConfirm(4)
                                        setStatus('Hủy đơn hàng')
                                    }}>
                                        <button style={{outline: "none"}} className={waitConfirm===4?'nav-link active':'nav-link'}>Đơn đã hủy</button>
                                    </li>
                                    </ul>
                                        {arrOrder.length === 0? (
                                        <h6 className="mt-3">Bạn không có đơn hàng nào</h6>
                                        ) : (
                                            arrOrder.map(item => {
                                            const nameProArr = item.namePro.split(" & ").filter(element => {
                                                if (element === "") return false;
                                                else return true;
                                            });
                                            const arrProduct = nameProArr.map((pro) => {
                                                return {
                                                    infor: pro,
                                                    img: product.find((item) => item.codePro === pro.slice(pro.length-10, pro.length)),
                                                }
                                            })
                                            return (
                                                <div className="bg-light px-3 py-3 mb-3">
                                                    {
                                                        arrProduct.map((order, index) => {
                                                            var createdAt = new Date(parseFloat(item.createdAt));
                                                            var updatedAt = new Date(parseFloat(item.updatedAt));
                                                            const inforArr = order.infor.split("-");
                                                            return (
                                                                <ul>
                                                                    <li className="row mt-3" style={{listStyle: "none"}} key={index}>
                                                                        <img src={order.img.img_1} alt="Img" className="col-sm-2"/>
                                                                        <div className="d-flex flex-column col-sm-10">
                                                                            <div className="d-flex justify-content-between" style={{width:'100%'}}>
                                                                                <div>
                                                                                    <h6 className="pl-1">{order.img.name}</h6>
                                                                                    <h6 className="pl-1">Color: {order.img.color}</h6>
                                                                                    <h6 className="pl-1">Size: {inforArr[0]}</h6>
                                                                                    <h6 className="pl-1">Số Lượng: {inforArr[1]}</h6>
                                                                                    <h6 className="pl-1">Ngày đặt: {createdAt.toLocaleString()}</h6>
                                                                                </div>
                                                                                <div>
                                                                                    {
                                                                                        ((sale && order.img.categoryId === sale.categoryId && (sale.expireAt >= today)) || (sale && sale.categoryId === 0 && (sale.expireAt >= today))) ?
                                                                                        <h6>${currencyFormat((order.img.price - order.img.price * sale.disCount / 100) * parseInt(inforArr[1]))}</h6>
                                                                                        :
                                                                                        <h6>${currencyFormat((order.img.price) * parseInt(inforArr[1]))}</h6>
                                                                                    }
                                                                                    
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            )
                                                        })
                                                    }
                                                    <hr/>
                                                    <div className="d-flex justify-content-end">
                                                        <h6>Tổng số tiền: <span style={{color: "#f1b8c4", fontWeight: "bold", fontSize: "23px"}}>${currencyFormat(item.price)}</span></h6>
                                                    </div>
                                                    <div className="d-flex justify-content-end orders-footer mt-1">
                                                        <a className="px-5 py-1" href="https://www.facebook.com/groups/evadeeva.outlet" target="_blank" style={{color: "#333", backgroundColor: "#f1b8c4"}}>Đánh giá</a>
                                                    {
                                                        waitConfirm === 1 &&
                                                        <button type="button" className="ml-3 px-5 py-1" onClick={() => {
                                                            deleteOrder({variables:{deleteOrderId: item.id}})
                                                            cancelOrder(item.id);
                                                        }}>Hủy đơn hàng</button>
                                                    }
                                                    </div>
                                                </div>
                                            )
                                        })

                                    )
                                    }
                                    </div>
                                )
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </section>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.User,
        product: [
            ...state.Product,
            ...state.Accessory
        ],
        sale: state.Event
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(stopLogin()),
        cancelOrder: (id) => dispatch(cancelOrder(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
