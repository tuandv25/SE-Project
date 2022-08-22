import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../components/HomeComponents/Header";
import currencyFormat from "../utils/displayPrice";
import { gql, useMutation } from "@apollo/client";
import PageLoading from "../pages/PageLoading";

const CREATE_ORDER = gql`
  mutation Mutation($data: createOrderInput!) {
    createOrder(data: $data) {
      id
    }
  }
`;
const UPDATE_USER = gql`
  mutation Mutation($data: updateUserInput!, $userId: Int) {
    updateUser(data: $data, userId: $userId) {
      id
    }
  }
`;
const ProductOffline = ({ product, userList, voucher }) => {
  const [inputSearch, setInputSearch] = useState("");
  const resultProduct = product.find((item) => {
    return item.codePro.toLowerCase() === inputSearch.toLowerCase();
  });
  const [productBill, setProductBill] = useState([]);
  let [reRender, setReRender] = useState(0);
  const [vcher, setVcher] = useState(voucher[0].disCount2);
  const vcherBill = voucher.find((item) => {
    return item.disCount2 === parseInt(vcher);
  });
  const [userOff, setUserOff] = useState(userList[0].email);
  const isEqualResultProduct = (element) => {
    return element.codePro === resultProduct.codePro;
  };
  let totalBill = Math.round(
    productBill.reduce((sum, currentItem) => {
      return (
        sum + currentItem.price * currentItem.quantity * (1 - 0.01 * vcher)
      );
    }, 0)
  );
  let totalBillNotVoucher = Math.round(
    productBill.reduce((sum, currentItem) => {
      return sum + currentItem.price * currentItem.quantity;
    }, 0)
  );
  const userBill = userList.find((user) => {
    return user.email === userOff;
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const [createOrder, { loading }] = useMutation(CREATE_ORDER, {
    onCompleted: (data) => {
      updateUser({
        variables: {
          userId: userBill.id,
          data: {
            point: parseInt(totalBill / 1000, 10),
          },
        },
      });
    },
  });
  const timeBill = {
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };
  useEffect(() => {}, [totalBillNotVoucher, vcherBill.condition]);
  const handleEnterInput = (event) => {
    if (event.key === "Enter") {
      if (resultProduct) {
        console.log(resultProduct);
        console.log(!productBill.some(isEqualResultProduct));
        if (!productBill.some(isEqualResultProduct)) {
          setProductBill([
            ...productBill,
            { ...resultProduct, size: "S", quantity: 1 },
          ]);
        }
      } else {
      }
    }
  };
  const handleInputSearch = (e) => {
    setInputSearch(e);
  };
  const handleRemoveProductItem = (element) => {
    setProductBill(
      productBill.filter((item) => {
        return item !== element;
      })
    );
  };
  const handleExportBill = async () => {
    if (totalBillNotVoucher < vcherBill.condition) {
    } else {
      var namePro = "";
      productBill.map((item) => {
        const tmpNameProString = `${item.size}-${item.quantity}-${item.codePro}`;
        namePro += tmpNameProString;
        namePro += " & ";
        return namePro;
      });
      await createOrder({
        variables: {
          data: {
            namePro,
            price: totalBill,
            userId: userBill.id,
            status: "Đã giao hàng",
          },
        },
      });
    }
  };
  if (loading) {
    return <PageLoading />;
  }

  return (
    <div>
      <Header />
      <section className='ftco-section'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-6'>
              <div>
                <div>
                  <p>Thông tin đơn hàng</p>
                  <div>
                    <input
                      autoFocus={true}
                      type='text'
                      placeholder='Nhập mã sản phẩm...'
                      value={inputSearch}
                      onChange={(e) => {
                        handleInputSearch(e.target.value);
                      }}
                      onKeyPress={(e) => handleEnterInput(e)}
                    />
                  </div>
                </div>
                <ul>
                  {productBill.map((item, index) => {
                    return (
                      <li key={index} className='row my-3'>
                        <div className='col-md-3'>
                          <img
                            style={{ width: "100%" }}
                            src={item.img_1}
                            alt='ImageProduct'
                          />
                        </div>
                        <div className='col-md-9'>
                          <div className=''>{item.name}</div>
                          <div className=''>
                            <div className=''>
                              <div className=''>
                                Giá: {currencyFormat(item.price)}đ
                              </div>
                              <div className=''>
                                Size:
                                <select
                                  className='ml-1'
                                  value={item.size}
                                  onChange={(e) => {
                                    item.size = e.target.value;
                                    setReRender(reRender + 1);
                                  }}
                                >
                                  <option value='S'>S</option>
                                  <option value='M'>M</option>
                                  <option value='L'>L</option>
                                  <option value='XL'>XL</option>
                                </select>
                              </div>
                            </div>
                            <div className=''>
                              <div className='input-group'>
                                <td
                                  className='product-remove'
                                  onClick={() => {
                                    if (item.quantity > 0) {
                                      item.quantity--;
                                      setReRender(reRender - 1);
                                      if (item.quantity === 0)
                                        handleRemoveProductItem(item);
                                    }
                                  }}
                                >
                                  <div>
                                    <span className='fas fa-minus'></span>
                                  </div>
                                </td>
                                <td className='product-remove mx-2'>
                                  <span>{item.quantity}</span>
                                </td>
                                <td
                                  className='product-remove'
                                  onClick={() => {
                                    item.quantity++;
                                    setReRender(reRender + 1);
                                  }}
                                >
                                  <div>
                                    <span className='fas fa-plus'></span>
                                  </div>
                                </td>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className='row'>
                  <div className='col-8'>
                    <div className=''>Người dùng: (Email)</div>
                    <select
                      value={userOff}
                      onChange={(e) => {
                        setUserOff(e.target.value);
                      }}
                    >
                      {userList.map((item, index) => {
                        return (
                          <option key={index} value={item.email}>
                            {item.email}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className='col-4'>
                    <div>Voucher: (%)</div>
                    <select
                      value={vcher}
                      onChange={(e) => {
                        setVcher(e.target.value);
                      }}
                    >
                      {voucher.map((item, index) => {
                        return (
                          <option key={index} value={item.disCount2}>
                            {item.disCount2}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className='bill-total'>
                  <div className='product-price-bill'>
                    <div className='title-price-bill'>
                      Tổng số tiền:{" "}
                      <span className='font-weight-bold font-italic h5'>
                        {currencyFormat(totalBill)}đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <div>
                <div className='h2 justify-content-center d-flex'>HÓA ĐƠN</div>
                <div>
                  <div>
                    <ul>
                      <li>
                        <b style={{ fontSize: "16px" }}>Tên:</b> {userBill.name}
                      </li>
                      <li className='info-user-phone'>
                        <b style={{ fontSize: "16px" }}>Số điện thoại:</b>{" "}
                        {userBill.phoneNumber}
                      </li>
                      <li className='info-user-email'>
                        <b style={{ fontSize: "16px" }}>Email:</b>{" "}
                        {userBill.email}
                      </li>
                      <li className='info-user-address'>
                        <b style={{ fontSize: "16px" }}>Địa chỉ:</b>{" "}
                        {userBill.address}
                      </li>
                    </ul>
                    <div>{`Hà Nội, ngày ${timeBill.day} tháng ${timeBill.month} năm ${timeBill.year}`}</div>
                  </div>
                  <div className='info-order-product'>
                    <table className='table' style={{ minWidth: "100%" }}>
                      <thead className='thead-primary'>
                        <tr className='text-center'>
                          <th>STT</th>
                          <th>Tên Sản Phẩm</th>
                          <th>Size</th>
                          <th>Số Lượng</th>
                          <th>Giá</th>
                          <th>Thành Tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productBill.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className='content'>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.size}</td>
                              <td>{item.quantity}</td>
                              <td>{currencyFormat(item.price)}đ</td>
                              <td>
                                {currencyFormat(item.price * item.quantity)}đ
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <div className='row justify-content-end'>
                      <div className='col col-lg-5 col-md-6 mt-5 cart-wrap ftco-animate'>
                        <div className='cart-total mb-3'>
                          <p className='d-flex'>
                            <span>Tổng Tiền</span>
                            <span>{currencyFormat(totalBillNotVoucher)}đ</span>
                          </p>
                          <p className='d-flex'>
                            <span>Voucher</span>
                            <span>
                              {currencyFormat(
                                Math.round(0.01 * vcher * totalBillNotVoucher)
                              )}
                              đ
                            </span>
                          </p>
                          <hr />
                          <p className='d-flex'>
                            <span>Tổng Bill</span>
                            <span>
                              <span>{currencyFormat(totalBill)}đ</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>Cảm ơn vì đã mua hàng của chúng tôi !</div>
                </div>
              </div>
              <button className='btn-export-pdf' onClick={handleExportBill}>
                Xuất Hóa Đơn
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userList: state.UserList,
    product: [...state.Product, ...state.Accessory],
    voucher: state.Voucher,
  };
};

export default connect(mapStateToProps)(ProductOffline);
