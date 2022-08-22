import { connect } from "react-redux";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Popup from 'reactjs-popup';
import { addEvent, removeEvent, updateEvent } from "../../actions/event";
import Header from "../../components/HomeComponents/Header";
import PageLoading from "../../pages/PageLoading";

const ADD_EVENT = gql`
mutation Mutation($data: createSalesInput!) {
    createSales(data: $data) {
      id
      createdAt
      updatedAt
      name
      categoryId
      disCount
      expireAt
      publish
    }
  }
`
const DELETE_EVENT = gql`
mutation Mutation($deleteSaleId: Int!) {
  deleteSale(id: $deleteSaleId) {
    id
  }
}
`
const APPLY_EVENT = gql`
mutation Mutation($updateSalesId: Int!, $data: updateSalesInput!) {
  updateSales(id: $updateSalesId, data: $data) {
    id
    publish
  }
}
`

const Event = ({ events, addEvent, removeEvent, updateEvent }) => {
    const today = new Date();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        categoryId: "",
        disCount: "",
        expireAt: ""
    });
    const [add] = useMutation(ADD_EVENT, {
        onCompleted: (data) => {
            addEvent(data.createSales)
        }
    })
    const [deleteEvent] = useMutation(DELETE_EVENT, {
        onCompleted: (data) => {
            removeEvent(data.deleteSale.id);
        }
    })
    const [applyEvent] = useMutation(APPLY_EVENT, {
        onCompleted: (data) => {
            updateEvent(data.updateSales.id, data.updateSales.publish)
        }
    })
    const handleAddButtonClick = async () => {
        setIsLoading(true);
        await add({
            variables: {
                data: {
                    ...data,
                    name: data.name,
                    categoryId: parseInt(data.categoryId),
                    disCount: parseInt(data.disCount),
                    expireAt: data.expireAt + "T16:59:59.999Z",
                    publish: false
                }
            }
        })
        setIsLoading(false);
        setData({
            name: '',
            categoryId: "",
            disCount: ""
        });
    }
    const handleDeleteEvent = async (data) => {
        setIsLoading(true)
        await deleteEvent({
            variables: {
                deleteSaleId: data.id
            }
        })
        removeEvent(events.id);
        setIsLoading(false);
    }
    const selectEvent = async (id) => {
        const currentEvent = events.find(event => event.publish === true);
        setIsLoading(true);
        await applyEvent({
            variables: {
                updateSalesId: id,
                data: {
                    publish: true,
                }
            }
        })
        await applyEvent({
            variables: {
                updateSalesId: currentEvent.id,
                data: {
                    publish: false
                }
            }
        })
        setIsLoading(false);
    }
    if (isLoading) return <PageLoading />;
    return (
        <div>
            <Header />
            <section className="ftco-section">
                <div className="table-product">
                    <table className="table">
                        <thead className="thead-primary">
                            <tr className="text-center">
                                <th scope="col" style={{ width: '5%' }}>STT</th>
                                <th scope="col" style={{ width: '5%' }}>ID</th>
                                <th scope="col" style={{ width: '10%' }}>Ngày Tạo</th>
                                <th scope="col" style={{ width: '10%' }}>Ngày Cập Nhật</th>
                                <th scope="col" style={{ width: '26%' }}>Tên</th>
                                <th scope="col" style={{ width: '8%' }}>Loại SP</th>
                                <th scope="col" style={{ width: '8%' }}>Giảm Giá (%)</th>
                                <th scope="col" style={{ width: '10%' }}>Ngày Hết Hạn</th>
                                <th scope="col" style={{ width: '10%' }}>Trạng Thái</th>
                                <th scope="col" style={{ width: '8%' }}>Lựa Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" readOnly={true} value={""} class="form-control" /></td>
                                <td><input type="text" readOnly={true} value={""} class="form-control" /></td>
                                <td><input type="text" readOnly={true} value={""} class="form-control" /></td>
                                <td><input type="text" readOnly={true} value={""} class="form-control" /></td>
                                <td><input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} class="form-control" /></td>
                                <td><input type="text" value={data.categoryId} onChange={(e) => setData({ ...data, categoryId: e.target.value })} class="form-control" /></td>
                                <td><input type="text" value={data.disCount} onChange={(e) => setData({ ...data, disCount: e.target.value })} class="form-control" /></td>
                                <td>
                                    <input
                                        value={data.expireAt}
                                        onChange = {(e) => setData({
                                                ...data,
                                                expireAt: e.target.value,
                                            })
                                        }
                                        id="birthday"
                                        name="birthday"
                                        type="date"
                                        className="form-control"
                                        min="1930-01-01"
                                        required
                                    />
                                </td>
                                <td><input type="text" readOnly={true} value={"Chưa áp dụng"} class="form-control" /></td>
                                <td><button type="button" className='btn-add btn btn-success' onClick={handleAddButtonClick}> <><i className="fas fa-plus" /> Thêm</></button></td>
                            </tr>
                            {
                                events.map((data, index) => {
                                    var createdAt = new Date(parseFloat(data.createdAt));
                                    var updatedAt = new Date(parseFloat(data.updatedAt));
                                    var expiredAt = new Date(parseFloat(data.expireAt));
                                    return (
                                        <tr>
                                            <td className='content'>{index + 1}</td>
                                            <td className='content'>{data.id}</td>
                                            <td className='content'>{createdAt.toLocaleString()}</td>
                                            <td className='content'>{updatedAt.toLocaleString()}</td>
                                            <td className='content'>{data.name}</td>
                                            <td className='content'>{data.categoryId}</td>
                                            <td className='content'>{data.disCount} %</td>
                                            <td className='content'>{expiredAt.toLocaleDateString()}</td>
                                            <td className='content'>{(data.expireAt>=today)? data.publish?  "Đang áp dụng" : "Chưa áp dụng" : "Hết Hiệu Lực"}</td>
                                            <td className='content'>
                                                <div>
                                                    {!data.publish &&
                                                        <button
                                                            className='btn-update btn btn-warning px-3 fw-bold'
                                                            onClick={() => { selectEvent(data.id) }}
                                                        >
                                                            Áp Dụng
                                                        </button>
                                                    }
                                                    <br />
                                                    <Popup trigger={<button className="btn-remove btn btn-danger btn-sm px-3 mt-2 fas fa-trash-alt" style={{ outline: 'none' }}></button>} modal nested>
                                                        {close => (
                                                            <div>
                                                                <div className="modal-header text-uppercase" style={{ background: '#ffc107' }}>
                                                                    <h6 className="modal-title d-flex justify-content-center">Xác Nhận Xóa Event</h6>
                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button className="btn-light" style={{ outline: 'none' }} onClick={() => {
                                                                        handleDeleteEvent(data)
                                                                    }}>OK</button>
                                                                    <button className="btn-light" style={{ outline: 'none' }} onClick={close}>Hủy</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Popup>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        events: state.Events,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addEvent: (data) => dispatch(addEvent(data)),
        removeEvent: (id) => dispatch(removeEvent(id)),
        updateEvent: (id, data) => dispatch(updateEvent(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)