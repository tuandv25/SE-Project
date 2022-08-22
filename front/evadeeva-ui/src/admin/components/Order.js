import Header from "../../components/HomeComponents/Header"
import { connect } from "react-redux"
import { useState } from "react";
import currencyFormat from "../../utils/displayPrice";
import { useMutation, gql } from "@apollo/client";
import PageLoading from "../../pages/PageLoading";
import { Redirect } from "react-router";
import { updateHistoryOrder } from "../../actions/order";
import { ExportReactCSV } from '../components/ExportCSV'
const UPDATE = gql`
        mutation Mutation($data: updateOrderInput!, $updateOrderId: Int!) {
            updateOrder(data: $data, id: $updateOrderId) {
            id
            status
            userId
            price
            }
        }
`

const UPDATE_USER = gql`
    mutation Mutation($data: updateUserInput!, $userId: Int) {
        updateUser(data: $data, userId: $userId) {
            id
        }
    }
`

const Order = ({ order, updateHistoryOrder }) => {
    const [showDelivered, setShowDelivered] = useState(false)
    const [showDelivering, setShowDelivering] = useState(false)
    const [showPending, setShowPending] = useState(true)
    const [showCanceled, setShowCanceled] = useState(false)
    const [updateUser] = useMutation(UPDATE_USER);
    const [updateOrder, { loading, error, data }] = useMutation(UPDATE, {
        onCompleted: (data) => {
            updateHistoryOrder(data.updateOrder.id, { status: data.updateOrder.status })
            if (data.updateOrder.status === "Đã giao hàng") {
                updateUser({
                    variables: {
                        userId: data.updateOrder.userId,
                        data: {
                            point: parseInt(data.updateOrder.price / 1000, 10)
                        }
                    }
                })
            }
        }
    })
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let isDisable = false
    const stateOrder = ['Đã giao hàng', 'Đang giao hàng', 'Chờ xử lý', 'Hủy đơn hàng']
    const [stateCurrent, setStateCurrent] = useState(stateOrder[2])
    const monthCurrent = new Date().getMonth() + 1
    const yearCurrent = new Date().getFullYear()
    const [valueState, setValueState] = useState({ delivered: stateOrder[0], delivering: stateOrder[1], pending: stateOrder[2], canceled: stateOrder[3], month: monthCurrent, year: yearCurrent })
    const orderCurrent = order.filter((item) => {
        return item.status === stateCurrent && new Date(parseFloat(item.createdAt)).getMonth() + 1 === parseInt(valueState.month) && new Date(parseFloat(item.createdAt)).getFullYear() === parseInt(valueState.year)
    })
    const handleShowDelivered = () => {
        setShowDelivered(true)
        setShowDelivering(false)
        setShowPending(false)
        setShowCanceled(false)
        setStateCurrent(stateOrder[0])
    }
    const handleShowDelivering = () => {
        setShowDelivered(false)
        setShowDelivering(true)
        setShowPending(false)
        setShowCanceled(false)
        setStateCurrent(stateOrder[1])
    }
    const handleShowPending = () => {
        setShowDelivered(false)
        setShowDelivering(false)
        setShowPending(true)
        setShowCanceled(false)
        setStateCurrent(stateOrder[2])
    }
    const handleShowCanceled = () => {
        setShowDelivered(false)
        setShowDelivering(false)
        setShowPending(false)
        setShowCanceled(true)
        setStateCurrent(stateOrder[3])
    }
    const handleChangeState = (item, status) => {
        updateOrder({
            variables: {
                updateOrderId: item.id,
                data: {
                    status
                }
            }
        })
    }

    if (loading) {
        return <PageLoading />
    }
    if (error) {
        alert("Có lỗi xảy ra, vui lòng thử lại");
        <Redirect to="/admin-order" />
    }
    return (
        <div>
            <Header />
            <section className="ftco-section">
                <div className="row">
                    <div className="col-sm-8">
                        <button type="button" className={`mx-1 btn btn-outline-secondary ${showPending && "active"}`} onClick={handleShowPending}>Đang Xử Lý</button>
                        <button type="button" className={`mx-1 btn btn-outline-secondary ${showDelivering && "active"}`} onClick={handleShowDelivering}>Đang Giao</button>
                        <button type="button" className={`mx-1 btn btn-outline-secondary ${showDelivered && "active"}`} onClick={handleShowDelivered}>Đã Giao</button>
                        <button type="button" className={`mx-1 btn btn-outline-secondary ${showCanceled && "active"}`} onClick={handleShowCanceled}>Đã Hủy</button>
                        {showDelivered &&
                            <ExportReactCSV className="mx-1 btn btn-outline-secondary" csvData={orderCurrent} fileName={`Doanh thu ${valueState.month}/${valueState.year}`} />
                        }
                    </div>
                    <div className="col-sm-4 d-flex mb-2">
                        {showPending && <h3 className="title-revenue">Đơn Hàng</h3>}
                        {showDelivering && <h3 className="title-revenue">Đơn Hàng</h3>}
                        {showDelivered && <h3 className="title-revenue">Doanh Thu</h3>}
                        {showCanceled && <h3 className="title-revenue">Đơn Hàng</h3>}
                        <select className="form-select ml-2" value={valueState.month} onChange={(e) => { setValueState({ ...valueState, month: e.target.value }) }} >
                            {months.map((month, index) => {
                                return (
                                    <option value={`${month}`} key={index}>{month}</option>
                                )
                            })}
                        </select>
                        <select className="form-select ml-1" value={valueState.year} onChange={(e) => { setValueState({ ...valueState, year: e.target.value }) }}>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
                        {showDelivered &&
                            <div className="d-flex">
                                <h3 className="px-1"> : </h3>
                                <h3 className="">{currencyFormat(orderCurrent.reduce((total, num) => {
                                    let time = new Date(parseFloat(num.createdAt))
                                    return (time.getMonth() + 1) === Number(valueState.month) && (num.status === "Đã giao hàng") ? (parseInt(parseInt(num.price) + total)) : (total)
                                }, 0))}đ</h3>
                            </div>
                        }
                    </div>
                </div>
                <div className="table-product">
                    <div>
                        {showPending &&
                            <table className="table">
                                <thead className="thead-primary">
                                    <tr className="text-center">
                                        <th>STT</th>
                                        <th>ID</th>
                                        <th>Đơn Hàng</th>
                                        <th>Mã Khách Hàng</th>
                                        <th>Giá</th>
                                        <th>Ngày Tạo</th>
                                        <th>Ngày Cập Nhật</th>
                                        <th>Trạng Thái</th>
                                    </tr>
                                </thead>
                                {orderCurrent.length > 0 ?
                                    <tbody className="table-body">
                                        {orderCurrent.map((item, index) => {
                                            var createdAt = new Date(parseFloat(item.createdAt));
                                            var updatedAt = new Date(parseFloat(item.updatedAt));
                                            const nameProArr = item.namePro.split(" & ").filter(element => {
                                                if (element === "") return false;
                                                else return true;
                                            });
                                            return (
                                                <tr key={index}>
                                                    <td className='content'>{index + 1}</td>
                                                    <td className='content'>{item.id}</td>
                                                    <td className='content'>
                                                        {
                                                            nameProArr.map((item) => {
                                                                return (<div>{item}</div>)
                                                            })
                                                        }
                                                    </td>
                                                    <td className='content'>{item.userId}</td>
                                                    <td className='content'>{currencyFormat(item.price)}đ</td>
                                                    <td className='content'>{createdAt.toLocaleString()}</td>
                                                    <td className='content'>{updatedAt.toLocaleString()}</td>
                                                    <td className='content'>
                                                        <select className="form-select  mb-3 select-option-status" value={stateOrder[2]} onChange={(e) => handleChangeState(item, e.target.value)}>
                                                            <option value={stateOrder[0]} disabled={!isDisable}>{stateOrder[0]}</option>
                                                            <option value={stateOrder[1]} disabled={isDisable}>{stateOrder[1]}</option>
                                                            <option value={stateOrder[2]} disabled={isDisable}>{stateOrder[2]}</option>
                                                            <option value={stateOrder[3]} disabled={isDisable}>{stateOrder[3]}</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    : <span><h6 className="mx-2 my-2">Không tìm thấy sản phẩm</h6></span>
                                }
                            </table>}
                        {showDelivering &&
                            <table className="table">
                                <thead className="thead-primary">
                                    <tr className="text-center">
                                        <th>STT</th>
                                        <th>ID</th>
                                        <th>Đơn Hàng</th>
                                        <th>Mã Khách Hàng</th>
                                        <th>Giá</th>
                                        <th>Ngày Tạo</th>
                                        <th>Ngày Cập Nhật</th>
                                        <th>Trạng Thái</th>
                                    </tr>
                                </thead>
                                {orderCurrent.length > 0 ?
                                    <tbody className="table-body">
                                        {orderCurrent.map((item, index) => {
                                            var createdAt = new Date(parseFloat(item.createdAt));
                                            var updatedAt = new Date(parseFloat(item.updatedAt));
                                            const nameProArr = item.namePro.split(" & ").filter(element => {
                                                if (element === "") return false;
                                                else return true;
                                            });
                                            return (
                                                <tr key={index}>
                                                    <td className='content'>{index + 1}</td>
                                                    <td className='content'>{item.id}</td>
                                                    <td className='content'>
                                                        {
                                                            nameProArr.map((item) => {
                                                                return (<div>{item}</div>)
                                                            })
                                                        }
                                                    </td>
                                                    <td className='content'>{item.userId}</td>
                                                    <td className='content'>{currencyFormat(item.price)}đ</td>
                                                    <td className='content'>{createdAt.toLocaleString()}</td>
                                                    <td className='content'>{updatedAt.toLocaleString()}</td>
                                                    <td className='content'>
                                                        <select className="form-select  mb-3 select-option-status" value={stateOrder[1]} onChange={(e) => handleChangeState(item, e.target.value)}>
                                                            <option value={stateOrder[0]} disabled={isDisable}>{stateOrder[0]}</option>
                                                            <option value={stateOrder[1]} disabled={isDisable}>{stateOrder[1]}</option>
                                                            <option value={stateOrder[2]} disabled={!isDisable}>{stateOrder[2]}</option>
                                                            <option value={stateOrder[3]} disabled={isDisable}>{stateOrder[3]}</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    : <span><h6 className="mx-2 my-2">Không tìm thấy sản phẩm</h6></span>
                                }
                            </table>}
                        {showDelivered &&
                            <table className="table">
                                <thead className="thead-primary">
                                    <tr className="text-center">
                                        <th>STT</th>
                                        <th>ID</th>
                                        <th>Đơn Hàng</th>
                                        <th>Mã Khách Hàng</th>
                                        <th>Giá</th>
                                        <th>Ngày Tạo</th>
                                        <th>Ngày Cập Nhật</th>
                                    </tr>
                                </thead>
                                {orderCurrent.length > 0 ?
                                    <tbody className="table-body">
                                        {orderCurrent.map((item, index) => {
                                            var createdAt = new Date(parseFloat(item.createdAt));
                                            var updatedAt = new Date(parseFloat(item.updatedAt));
                                            const nameProArr = item.namePro.split(" & ").filter(element => {
                                                if (element === "") return false;
                                                else return true;
                                            });
                                            return (
                                                <tr key={index}>
                                                    <td className='content'>{index + 1}</td>
                                                    <td className='content'>{item.id}</td>
                                                    <td className='content'>
                                                        {
                                                            nameProArr.map((item) => {
                                                                return (<div>{item}</div>)
                                                            })
                                                        }
                                                    </td>
                                                    <td className='content'>{item.userId}</td>
                                                    <td className='content'>{currencyFormat(item.price)}đ</td>
                                                    <td className='content'>{createdAt.toLocaleString()}</td>
                                                    <td className='content'>{updatedAt.toLocaleString()}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    : <span><h6 className="mx-2 my-2">Không tìm thấy sản phẩm</h6></span>
                                }
                            </table>}
                        {showCanceled &&
                            <table className="table">
                                <thead className="thead-primary">
                                    <tr className="text-center">
                                        <th>STT</th>
                                        <th>ID</th>
                                        <th>Đơn Hàng</th>
                                        <th>Mã Khách Hàng</th>
                                        <th>Giá</th>
                                        <th>Ngày Tạo</th>
                                        <th>Ngày Cập Nhật</th>
                                        <th>Trạng Thái</th>
                                    </tr>
                                </thead>
                                {orderCurrent.length > 0 ?
                                    <tbody className="table-body">
                                        {orderCurrent.map((item, index) => {
                                            var createdAt = new Date(parseFloat(item.createdAt));
                                            var updatedAt = new Date(parseFloat(item.updatedAt));
                                            const nameProArr = item.namePro.split(" & ").filter(element => {
                                                if (element === "") return false;
                                                else return true;
                                            });
                                            return (
                                                <tr key={index}>
                                                    <td className='content'>{index + 1}</td>
                                                    <td className='content'>{item.id}</td>
                                                    <td className='content'>
                                                        {
                                                            nameProArr.map((item) => {
                                                                return (<div>{item}</div>)
                                                            })
                                                        }
                                                    </td>
                                                    <td className='content'>{item.userId}</td>
                                                    <td className='content'>{currencyFormat(item.price)}đ</td>
                                                    <td className='content'>{createdAt.toLocaleString()}</td>
                                                    <td className='content'>{updatedAt.toLocaleString()}</td>
                                                    <td className='content'>
                                                        <select className="form-select  mb-3 select-option-status" value={stateOrder[3]} onChange={(e) => handleChangeState(item, e.target.value)}>
                                                            <option value={stateOrder[0]} disabled={!isDisable}>{stateOrder[0]}</option>
                                                            <option value={stateOrder[1]} disabled={!isDisable}>{stateOrder[1]}</option>
                                                            <option value={stateOrder[2]} disabled={!isDisable}>{stateOrder[2]}</option>
                                                            <option value={stateOrder[3]} disabled={isDisable}>{stateOrder[3]}</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    : <span><h6 className="mx-2 my-2">Không tìm thấy sản phẩm</h6></span>
                                }
                            </table>}
                    </div>
                </div>
            </section>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        order: state.Order,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateHistoryOrder: (id, order) => dispatch(updateHistoryOrder(id, order)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Order)
