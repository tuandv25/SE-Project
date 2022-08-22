import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { updateHistoryOrder } from "../../actions/order"

import "../../assets/style/style.css"

const UserOrderList = ({user}) => {
    const [showDelivered, setShowDelivered] = useState(true);
    const [showDelivering, setShowDelivering] = useState(false);
    const [showPending, setShowPending] = useState(false);
    const [showCanceled, setShowCanceled] = useState(false);

    const stateOrder = ['Đã giao hàng', 'Đang giao hàng', 'Chờ xử lý', 'Đã hủy'];
    const [stateCurrent , setStateCurrent] = useState(stateOrder[0]);
    const [valueState, setValueState] = useState({
        delivered: stateOrder[0],
        delivering: stateOrder[1],
        pending: stateOrder[2],
        canceled: stateOrder[3],
    })

    const orderCurrent = user.orders.filter((item) => {
        return item.status === stateCurrent
    })
    const [updateOrder, {error}] = useMutation(UPDATE, {
        onCompleted: (data) => {
            alert("Cập nhật thành công")
            updateHistoryOrder(data.updateOrder.id, {status: data.updateOrder.status})
            window.location.reload()
        }
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

    if (error) {
        alert("Có lỗi xảy ra, vui lòng thử lại");
        <Redirect to="/admin-order"/>
    }
    return (
        <div>
            Order List
        </div>
    )
}

export default UserOrderList