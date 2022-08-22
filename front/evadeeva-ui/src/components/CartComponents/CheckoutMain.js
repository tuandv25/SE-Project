import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { Link, Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import { ToastContainer, toast } from "react-toastify";

import { history } from "../../router/AppRouter";
import { resetCart } from "../../actions/cart";
import { order } from "../../actions/user";
import currencyFormat from "../../utils/displayPrice";

import "reactjs-popup/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/style/style.css";
import voucherImg from "../../assets/images/voucher";
// import img-voucher

const ORDER = gql`
  mutation Mutation($data: createOrderInput!) {
    createOrder(data: $data) {
      id
      createdAt
      updatedAt
      namePro
      price
      status
    }
  }
`;

const UPDATE_USER = gql`
  mutation Mutation($data: updateUserInput!, $email: String!) {
    updateUser(data: $data, email: $email) {
      id
    }
  }
`;

const Checkout = ({ resetCart, orderRedux }) => {
  const [showVoucher, setShowVoucher] = useState(true);
  const [showVoucherPre, setShowVoucherPre] = useState(false);
  const [showVoucherBD, setShowVoucherBD] = useState(false);
  const [coupon, setCoupon] = useState(-1);
  const [couponPre, setCouponPre] = useState(-1);
  const [couponBD, setCouponBD] = useState(-1);
  const {
    user,
    cart,
    sale,
    vouchers,
    vouchersPremium,
    vouchersBirthday,
    point,
  } = useSelector((state) => ({
    user: state.User,
    cart: state.Cart,
    sale: state.Event,
    vouchers: state.Voucher,
    vouchersPremium: state.VoucherPremium,
    vouchersBirthday: state.VoucherBirthday,
    point: state.User.point,
  }));
  const [update] = useMutation(UPDATE_USER);
  const birthdayFormated = new Date(parseFloat(user.birthday));
  const birthdayString = birthdayFormated.toLocaleDateString().slice(0, -5);
  const today = new Date();
  const date =  today.getDate() + "/" + (today.getMonth() + 1);
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    phoneNumber: user.phoneNumber,
    birthday: birthdayFormated.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  });
  // Sum price not discount
  const total = cart.reduce((total, item) => {
    if (
      (sale && item.categoryId === sale.categoryId && sale.expireAt >= today) ||
      (sale && sale.categoryId === 0 && sale.expireAt >= today)
    ) {
      return (
        total + (item.price - (item.price * sale.disCount) / 100) * item.count
      );
    } else return total + item.price * item.count;
  }, 0);
  const [couponRate, setCouponRate] = useState(0);
  const [couponRate2, setCouponRate2] = useState(0);
  const [couponRatePre, setCouponRatePre] = useState(0);
  const [couponRatePre2, setCouponRatePre2] = useState(0);
  const [couponRateBD, setCouponRateBD] = useState(0);
  const [order] = useMutation(ORDER, {
    onCompleted: (data) => {
      orderRedux(data.createOrder);
      resetCart();
      toast.success("Đặt hàng thành công!");
      history.push("/account");
    },
  });

  const handlePayment = () => {
    if (user.email !== "") {
      var namePro = "";
      cart.map((item, index) => {
        const tmpNameProString = `${item.size}-${item.count}-${item.codePro}`;
        namePro += tmpNameProString;
        namePro += " & ";
        return namePro;
      });

      const price = cart.reduce(
        (total, item) => total + item.price * item.count,
        0
      );
      order({
        variables: {
          data: {
            namePro,
            price: parseInt(
              total - disCountVoucher - disCountVoucherPre - disCountVoucherBD,
              10
            ),
            status: "Chờ xử lý",
            userId: user.id,
          },
        },
      });
    } else {
      history.push("/account");
    }
  };
  const [categoryIdVP, setcategoryIdVP] = useState(-1);
  const handleUseVoucher = () => {
    const index = coupon;
    const indexPre = couponPre;
    const indexBD = couponBD;
    if (index < 0 && indexPre < 0 && indexBD < 0) {
      toast.warning("Bạn có thể áp dụng 1 số mã giảm giá của cửa hàng");
    }

    if (index >= 0 && total < vouchers[index].condition) {
      setCouponRate(0);
      setCouponRate2(0);
      //toast.error("Total order value is not enough to apply voucher");
    } else if (index < 0) {
    } else {
      if (vouchers[index].expireAt >= today) {
        if (
          couponRate !== vouchers[index].disCount ||
          couponRate2 !== vouchers[index].disCount2
        )
          toast.success("Áp dụng mã giảm giá thành công");
        setCouponRate(vouchers[index].disCount);
        setCouponRate2(vouchers[index].disCount2);
      } else {
        setCouponRate(0);
        setCouponRate2(0);
      }
    }
    if (indexPre >= 0 && user.point < vouchersPremium[indexPre].condition) {
      setCouponRatePre(0);
      setCouponRatePre2(0);
      //toast.error("Your points are not enough to apply the premium voucher");
    } else if (indexPre < 0) {
    } else {
      if (vouchersPremium[indexPre].expireAt >= today) {
        if (
          couponRatePre !== vouchersPremium[indexPre].disCount ||
          couponRatePre2 !== vouchersPremium[indexPre].disCount2
        )
          toast.success("Áp dụng mã giảm giá premium thành công");
        setCouponRatePre(vouchersPremium[indexPre].disCount);
        setCouponRatePre2(vouchersPremium[indexPre].disCount2);
        setcategoryIdVP(vouchersPremium[indexPre].categoryId);
      } else {
        setCouponRatePre(0);
        setCouponRatePre2(0);
        setcategoryIdVP(-1);
      }
    }
    if (indexBD >= 0) {
      if (
        user.point < vouchersBirthday[indexBD].condition &&
        birthdayString !== date
      ) {
        setCouponRateBD(0);
        //toast.error("Apply Fail");
      } else if (
        user.point < vouchersBirthday[indexBD].condition &&
        birthdayString === date
      ) {
        setCouponRateBD(0);
        //toast.warning("Your points are not enough to apply the birthday voucher");
      } else if (
        user.point >= vouchersBirthday[indexBD].condition &&
        birthdayString !== date
      ) {
        setCouponRateBD(0);
        //toast.warning("Today is not your birthday");
      } else {
        if (couponRateBD !== vouchersBirthday[indexBD].disCount)
          toast.success("Áp dụng mã giảm giá sinh nhật thành công");
        setCouponRateBD(vouchersBirthday[indexBD].disCount);
      }
    }
  };
  //calculate discount
  const temp1 = total*couponRate2/100;
  const disCountVoucher = cart.reduce(
    (total, item) =>
      total +
      (couponRate * item.count),
    temp1,
  );
  const disCountVoucherPre = cart.reduce((total, item) => {
    if (item.categoryId === categoryIdVP || categoryIdVP === 0) {
      if (
        (sale && item.categoryId === sale.categoryId && sale.expireAt >= today) ||
        (sale && sale.categoryId === 0 && sale.expireAt >= today)
      ) {
        return total + (((item.price - (item.price * sale.disCount) / 100) * couponRatePre2) / 100) * item.count;
      }
      else return total + ((item.price * couponRatePre2) / 100) * item.count;
    } else return total + 0;
  }, couponRatePre);
  const disCountVoucherBD = total * couponRateBD/100;
  return (
    <div>
      <div className='hero-wrap hero-bread bg-img'>
        <div className='container'>
          <div className='row no-gutters slider-text align-items-center justify-content-center'>
            <div className='col-md-9 ftco-animate text-center'>
              <h1 className='mb-0 bread'>Checkout</h1>
              <p className='breadcrumbs'>
                <span className='mr-2'>
                  <Link to='/'>Home</Link>
                </span>
                <span>
                  <Link to='/cart'>Cart</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className='ftco-section'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xl-8 ftco-animate'>
              {/* Form Infor */}
              <form
                id='checkout-form'
                className='billing-form bg-light p-3 p-md-5'
              >
                <h3 className='mb-4 billing-heading'>Billing Details</h3>
                <div className='row align-items-end'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <label htmlFor='fullname'>Full Name</label>
                      <input
                        value={data.name}
                        onChange={(e) =>
                          setData({
                            ...data,
                            name: e.target.value,
                          })
                        }
                        id='fullname'
                        name='fullname'
                        type='text'
                        placeholder='Your Fullname'
                        className='form-control'
                      />
                      <span className='form-message'></span>
                    </div>
                  </div>
                  <div className='w-100'></div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label htmlFor='phone'>Phone</label>
                      <input
                        value={data.phoneNumber}
                        onChange={(e) =>
                          setData({
                            ...data,
                            phoneNumber: e.target.value,
                          })
                        }
                        id='phone'
                        name='phone'
                        type='text'
                        placeholder='Your Phone Number'
                        className='form-control'
                      />
                      <span className='form-message'></span>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label htmlFor='emailaddress'>Email Address</label>
                      <input
                        readOnly={true}
                        value={data.email}
                        onChange={(e) =>
                          setData({
                            ...data,
                            email: e.target.value,
                          })
                        }
                        id='emailaddress'
                        name='emailaddress'
                        type='text'
                        placeholder='Your Email'
                        className='form-control'
                      />
                      <span className='form-message'></span>
                    </div>
                  </div>
                  <div className='w-100'></div>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <label htmlFor='address'>Street Address</label>
                      <input
                        value={data.address}
                        onChange={(e) =>
                          setData({
                            ...data,
                            address: e.target.value,
                          })
                        }
                        id='address'
                        name='address'
                        type='text'
                        placeholder='Your Address'
                        className='form-control'
                      />
                      <span className='form-message'></span>
                    </div>
                  </div>
                  <div className='w-100'></div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label htmlFor='birthday'>Birthday</label>
                      <input
                        readOnly={true}
                        value={data.birthday}
                        id='birthday'
                        name='birthday'
                        type='text'
                        placeholder='Your Birthday'
                        className='form-control'
                      />
                      <span className='form-message'></span>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label htmlFor='postcodezip'>Postcode / ZIP *</label>
                      <input
                        type='text'
                        className='form-control'
                        placeholder=''
                      />
                    </div>
                  </div>
                  <div className='w-100'></div>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <label htmlFor='country'>Shipping Method</label>
                      <div className='select-wrap'>
                        <div className='icon'>
                          <span className='fas fa-angle-down'></span>
                        </div>
                        <select name='' id='' className='form-control'>
                          <option value=''>Giao hàng Nhanh</option>
                          <option value=''>Giao hàng Hỏa tốc</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='w-100'></div>
                  <div className='col-md-12'>
                    <div className='form-group mt-4'></div>
                  </div>
                </div>
              </form>
              <div className='row mt-5 pt-3 d-flex'>
                <div className='col-md-6 d-flex'>
                  <Link to='/register'>
                    <label className='mr-3'>
                      <button className='btn btn-primary py-3 px-4'>
                        {" "}
                        Create Account{" "}
                      </button>
                    </label>
                  </Link>
                  <label>
                    <Popup
                      trigger={
                        <button className='btn btn-primary py-3 px-4'>
                          {" "}
                          Shop Voucher{" "}
                        </button>
                      }
                      modal
                      nested
                    >
                      {(close) => (
                        <div className='container'>
                          <div className='modal-header'>
                            <div className=''>Select Voucher</div>
                            <div>
                              {point} <span className='fas fa-award'></span>
                            </div>
                          </div>
                          <div>
                            <ul className='nav nav-tabs mt-2'>
                              <li
                                className='nav-item'
                                onClick={() => {
                                  setShowVoucher(true);
                                  setShowVoucherPre(false);
                                  setShowVoucherBD(false);
                                }}
                              >
                                <button
                                  style={{ outline: "none" }}
                                  className={
                                    showVoucher ? "nav-link active" : "nav-link"
                                  }
                                >
                                  Voucher
                                </button>
                              </li>
                              <li
                                className='nav-item'
                                onClick={() => {
                                  setShowVoucher(false);
                                  setShowVoucherPre(true);
                                  setShowVoucherBD(false);
                                }}
                              >
                                <button
                                  style={{ outline: "none" }}
                                  className={
                                    showVoucherPre
                                      ? "nav-link active"
                                      : "nav-link"
                                  }
                                >
                                  Voucher Premium
                                </button>
                              </li>
                              <li
                                className='nav-item'
                                onClick={() => {
                                  setShowVoucher(false);
                                  setShowVoucherPre(false);
                                  setShowVoucherBD(true);
                                }}
                              >
                                <button
                                  style={{ outline: "none" }}
                                  className={
                                    showVoucherBD
                                      ? "nav-link active"
                                      : "nav-link"
                                  }
                                >
                                  Voucher Birthday
                                </button>
                              </li>
                            </ul>
                          </div>
                          <div>
                            {showVoucher ? (
                              <div className='modal-body'>
                                {vouchers.map((voucher, index) => (
                                  <div className='form-group'>
                                    <div
                                      className='col-md-12'
                                      style={
                                        index === coupon
                                          ? total >= voucher.condition
                                            ? voucher.expireAt >= today
                                              ? {
                                                  background: "#b4ff99",
                                                  color: "black",
                                                  fontWeight: 500,
                                                }
                                              : {
                                                  background: "#686868",
                                                  color: "white",
                                                  fontWeight: 500,
                                                }
                                            : {
                                                background: "#a3423c",
                                                color: "white",
                                                fontWeight: 500,
                                              }
                                          : {}
                                      }
                                    >
                                      <div className='radio'>
                                        <label
                                          style={{
                                            width: "20rem",
                                            fontWeight: "500",
                                            display: "block",
                                          }}
                                        >
                                          <input
                                            type='radio'
                                            name='optradio'
                                            className='d-none'
                                            onChange={(e) => {
                                              setCoupon(index);
                                            }}
                                          />
                                          <img
                                            src={voucherImg.voucher}
                                            alt='Voucher'
                                            className='float-left mr-3'
                                          />
                                          <div>
                                            <div className='font-weight-bold'>
                                              {voucher.name}
                                            </div>
                                            {voucher.disCount !== 0 ? (
                                              <div className='font-italic'>
                                                Giảm{" "}
                                                {currencyFormat(
                                                  voucher.disCount
                                                )}{" "}
                                                VNĐ/1 sản phẩm
                                              </div>
                                            ) : (
                                              <div className='font-italic'>
                                                Giảm {voucher.disCount2}% tổng
                                                hóa đơn
                                              </div>
                                            )}
                                            <div className='font-weight-light'>
                                              Đơn tối thiểu{" "}
                                              {currencyFormat(
                                                voucher.condition
                                              )}
                                              đ
                                            </div>
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                          <div>
                            {showVoucherPre ? (
                              <div className='modal-body'>
                                {vouchersPremium.map((voucher, indexPre) => (
                                  <div className='form-group'>
                                    <div
                                      className='col-md-12'
                                      style={
                                        indexPre === couponPre
                                          ? user.point >= voucher.condition
                                            ? voucher.expireAt >= today
                                              ? {
                                                  background: "#b4ff99",
                                                  color: "black",
                                                  fontWeight: 500,
                                                }
                                              : {
                                                  background: "#686868",
                                                  color: "white",
                                                  fontWeight: 500,
                                                }
                                            : {
                                                background: "#a3423c",
                                                color: "white",
                                                fontWeight: 500,
                                              }
                                          : {}
                                      }
                                    >
                                      <div className='radio'>
                                        <label
                                          style={{
                                            width: "20rem",
                                            fontWeight: "500",
                                            display: "block",
                                          }}
                                        >
                                          <input
                                            type='radio'
                                            name='optradio'
                                            className='d-none'
                                            onChange={(e) => {
                                              setCouponPre(indexPre);
                                            }}
                                          />
                                          <img
                                            src={voucherImg.voucher}
                                            alt='Voucher'
                                            className='float-left mr-3'
                                          />
                                          <div>
                                            <div className='font-weight-bold'>
                                              {voucher.name}
                                            </div>
                                            {voucher.disCount !== 0 ? (
                                              <div className='font-italic'>
                                                Giảm{" "}
                                                {currencyFormat(
                                                  voucher.disCount
                                                )}{" "}
                                                VNĐ
                                              </div>
                                            ) : (
                                              <div className='font-italic'>
                                                Giảm{" "}
                                                {currencyFormat(
                                                  voucher.disCount2
                                                )}
                                                % các sản phẩm loại{" "}
                                                {voucher.categoryId}
                                              </div>
                                            )}
                                            <div className='font-weight-light'>
                                              Điểm tối thiểu{" "}
                                              {currencyFormat(
                                                voucher.condition
                                              )}{" "}
                                              điểm
                                            </div>
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div> </div>
                            )}
                          </div>
                          <div>
                            {showVoucherBD ? (
                              <div className='modal-body'>
                                {vouchersBirthday.map((voucher, indexBD) => (
                                  <div className='form-group'>
                                    <div
                                      className='col-md-12'
                                      style={
                                        indexBD === couponBD
                                          ? user.point < voucher.condition ||
                                            birthdayString !== date
                                            ? {
                                                background: "#a3423c",
                                                color: "white",
                                                fontWeight: 500,
                                              }
                                            : {
                                                background: "#b4ff99",
                                                color: "black",
                                                fontWeight: 500,
                                              }
                                          : {}
                                      }
                                    >
                                      <div className='radio'>
                                        <label
                                          style={{
                                            width: "20rem",
                                            fontWeight: "500",
                                            display: "block",
                                          }}
                                        >
                                          <input
                                            type='radio'
                                            name='optradio'
                                            className='d-none'
                                            onChange={(e) => {
                                              setCouponBD(indexBD);
                                            }}
                                          />
                                          <div>
                                            <div className='font-weight-bold'>
                                              {voucher.name}
                                            </div>
                                            <div className='font-italic'>
                                              Giảm{" "}
                                              {currencyFormat(voucher.disCount)}
                                              %
                                            </div>
                                            <div className='font-weight-light'>
                                              Điểm tối thiểu{" "}
                                              {currencyFormat(
                                                voucher.condition
                                              )}{" "}
                                              điểm
                                            </div>
                                          </div>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div> </div>
                            )}
                          </div>
                          <div className='modal-footer'>
                            <button
                              className='btn-light'
                              style={{ outline: "none" }}
                              onClick={() => {
                                handleUseVoucher();
                              }}
                            >
                              OK
                            </button>
                            <button
                              className='btn-light'
                              style={{ outline: "none" }}
                              onClick={close}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </label>
                </div>
              </div>

              <div className='row mt-5 pt-3 d-flex'>
                {/* Sum Price */}
                <div className='col-md-6 d-flex'>
                  <div className='cart-detail cart-total bg-light p-3 p-md-4'>
                    <h3 className='billing-heading mb-4'>Cart Total</h3>
                    <p className='d-flex'>
                      <span>Subtotal</span>
                      <span>{currencyFormat(parseInt(total, 10))}</span>
                    </p>
                    <p className='d-flex'>
                      <span>Delivery</span>
                      <span>0.00</span>
                    </p>
                    <p className='d-flex'>
                      <span>Discount</span>
                      <span>
                        {currencyFormat(
                          parseInt(
                            disCountVoucher +
                              disCountVoucherPre +
                              disCountVoucherBD,
                            10
                          )
                        )}
                      </span>
                    </p>
                    <p className='d-flex'>
                      <span>Bonus Point</span>
                      <span>
                        {currencyFormat(
                          parseInt(
                            (total -
                              disCountVoucher -
                              disCountVoucherPre -
                              disCountVoucherBD) /
                              1000,
                            10
                          )
                        )}
                      </span>
                    </p>
                    <hr />
                    <p className='d-flex total-price'>
                      <span>Total</span>
                      <span>
                        {currencyFormat(
                          parseInt(
                            total -
                              disCountVoucher -
                              disCountVoucherPre -
                              disCountVoucherBD,
                            10
                          )
                        )}
                      </span>
                    </p>
                  </div>
                </div>
                {/* Payment Method */}
                <div className='col-md-6'>
                  <div className='cart-detail bg-light p-3 p-md-4'>
                    <h3 className='billing-heading mb-4'>Payment Method</h3>
                    <div className='form-group'>
                      <div className='col-md-12'>
                        <div className='radio'>
                          <label>
                            <input
                              type='radio'
                              name='optradio'
                              className='mr-2'
                            />{" "}
                            Direct Bank Tranfer
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-12'>
                        <div className='radio'>
                          <label>
                            <input
                              type='radio'
                              name='optradio'
                              className='mr-2'
                            />{" "}
                            Check Payment
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-12'>
                        <div className='radio'>
                          <label>
                            <input
                              type='radio'
                              name='optradio'
                              className='mr-2'
                            />{" "}
                            Paypal
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='col-md-12'>
                        <div className='checkbox'>
                          <label>
                            <input type='checkbox' value='' className='mr-2' />{" "}
                            I have read and accept the terms and conditions
                          </label>
                        </div>
                      </div>
                    </div>
                    <button
                      className='btn btn-primary py-3 px-4'
                      onClick={async function () {
                        await handlePayment();
                      }}
                    >
                      Place an order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetCart: () => dispatch(resetCart()),
    orderRedux: (data) => dispatch(order(data)),
  };
};

export default connect(null, mapDispatchToProps)(Checkout);
