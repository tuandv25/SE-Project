import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Tippy from "@tippyjs/react/headless";

import { stopLogin } from "../../actions/user";
import { removeCart } from "../../actions/cart";
import { useSubscription, gql } from "@apollo/client";

import brandLogo from "../../assets/images";
import "../../assets/style/style.css";

const LISTEN_EVENT_ORDER = gql`
  subscription Subscription($userId: Int) {
    OrderUpdate(userId: $userId) {
      id
      status
    }
  }
`;

const LISTEN_NEW_EVENT_ORDER = gql`
  subscription Subscription {
    NewOrder {
      id
    }
  }
`;

const Header = ({
  user,
  cart,
  removeCart,
  logout,
  product,
  search = true,
  showPro,
  showUser,
  showOrder,
  sale,
  voucher,
  event,
  offProduct,
}) => {
  // Search box
  const [inputSearch, setInputSearch] = useState("");
  const [showResult, setShowResult] = useState(false);
  const resultArray = product.filter((item) => {
    return (
      item.name
        .slice(0, item.name.length - 10)
        .toLowerCase()
        .indexOf(inputSearch.toLowerCase()) !== -1
    );
  });
  useEffect(() => {
    if (inputSearch.length > 0) {
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [inputSearch.length]);
  const handleInputSearch = (e) => {
    setInputSearch(e);
  };

  // Notification
  const [notifyCnt, setNotifyCnt] = useState(0);
  const appState = useSelector((state) => state);
  const orders = appState.User.orders;
  const orderCnt = orders.reduce((amount, order) => {
    if (order.status === "Đang giao hàng") {
      return amount + 1;
    }
    return amount;
  }, 0);

  useEffect(() => {
    // Notification event
    if (appState.Event !== 0 && user.admin === false && user.staff === false) {
      const notifyEvent = document.querySelector(
        ".notify-event .notify-item__text"
      );
      notifyEvent.innerHTML = `Sự kiện ${appState.Event.name}, giảm giá ${appState.Event.disCount}% toàn bộ sản phẩm.`;
    }

    // Notification voucher
    const voucherCnt = appState.Voucher.length + appState.VoucherPremium.length;
    if (voucherCnt !== 0 && user.admin === false && user.staff === false) {
      const notifyVoucher = document.querySelector(
        ".notify-voucher .notify-item__text"
      );
      notifyVoucher.innerHTML = `Bạn đang có ${voucherCnt} mã giảm giá trong ví. Mua hàng để sử dụng`;
    }

    // Notification read unread
    setNotifyCnt(document.querySelectorAll(".unread").length);
    const onClickNotify = (e) => {
      e.currentTarget.classList.remove("unread");
      e.currentTarget.classList.add("read");
      setNotifyCnt(document.querySelectorAll(".unread").length);
    };

    const notifyElements = document.querySelectorAll(".notify-item");
    notifyElements.forEach((element) => {
      if (!element.classList.contains("read")) element.classList.add("unread");
      element.addEventListener("click", onClickNotify);
    });
  }, [
    appState.Event,
    appState.Voucher,
    appState.VoucherPremium,
    appState.User,
  ]);

  // Fade in, Fade out Nav Bar
  const handleScroll = () => {
    const navBar = document.getElementById("ftco-navbar");
    const position = window.pageYOffset;
    if (position > 50) {
      if (!navBar.classList.contains("scrolled")) {
        navBar.classList.add("scrolled");
      }
    }
    if (position < 50) {
      if (navBar.classList.contains("scrolled")) {
        navBar.classList.remove("scrolled");
        navBar.classList.remove("sleep");
      }
    }
    if (position > 120) {
      if (!navBar.classList.contains("awake")) {
        navBar.classList.add("awake");
      }
    }
    if (position < 120) {
      if (navBar.classList.contains("awake")) {
        navBar.classList.remove("awake");
        navBar.classList.add("sleep");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // End Fade in, Fade out Nav Bar

  const { loading, data } = useSubscription(LISTEN_EVENT_ORDER, {
    variables: { userId: user.id },
  });
  const newOrder = useSubscription(LISTEN_NEW_EVENT_ORDER);

  if (!user.admin && !user.staff) {
    return (
      <div>
        <nav
          className='navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light'
          id='ftco-navbar'
        >
          <div className='container'>
            <Link to='/'>
              <img src={brandLogo.logo} alt='Eva De Eva' />
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#ftco-nav'
              aria-controls='ftco-nav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='fa-solid fa-bars'></span> Menu
            </button>

            <div className='collapse navbar-collapse' id='ftco-nav'>
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link to='/' className='nav-link'>
                    Home
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/products' className='nav-link'>
                    Product
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/' className='nav-link'>
                    About
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/' className='nav-link'>
                    Contact
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/' className='nav-link'>
                    Store
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/account' className='nav-link'>
                    <span className='fa-solid fa-user'></span>
                  </Link>
                </li>
                <li className='nav-item nav-notification'>
                  <Link className='nav-link'>
                    <span className='fa-solid fa-bell'></span>{" "}
                    <span>[{notifyCnt}]</span>
                  </Link>
                  <div className='notify'>
                    <div className='notify_inner'>
                      <div className='notify_header'>Thông Báo Của Bạn</div>
                      <div className='notify_body noselect'>
                        {!loading && (
                          <Link to='/account'>
                            <div className='notify-item order'>
                              <div className='notify-item__thumbnail'></div>
                              <div className='notify-item__text'>
                                Đơn hàng {data.OrderUpdate.id} đang được vận
                                chuyển
                              </div>
                            </div>
                          </Link>
                        )}
                        {/* notification cho event, --> cố định */}
                        {!!appState.Event && (
                          <Link to='/products'>
                            <div className='notify-item notify-event sale'>
                              <div className='notify-item__thumbnail'></div>
                              <div className='notify-item__text'></div>
                            </div>
                          </Link>
                        )}
                        {/* notification cho voucher, --> cố đinh */}
                        <Link to='/products'>
                          <div className='notify-item notify-voucher order'>
                            <div className='notify-item__thumbnail'></div>
                            <div className='notify-item__text'></div>
                          </div>
                        </Link>
                        {/* notification cho order đang giao, --> cố đinh */}
                        {!!user.email && !!orderCnt && (
                          <Link to='/account'>
                            <div className='notify-item notify-order orderd'>
                              <div className='notify-item__thumbnail'></div>
                              <div className='notify-item__text'>
                                Bạn đang có {orderCnt} đang giao. Sẵn sàng để
                                nhận sản phẩm nhé!
                              </div>
                            </div>
                          </Link>
                        )}
                        <Link to='/products'>
                          <div className='notify-item sale'>
                            <div className='notify-item__thumbnail'></div>
                            <div className='notify-item__text'></div>
                          </div>
                        </Link>
                      </div>
                      <div className='notify_footer'></div>
                    </div>
                  </div>
                </li>
                <li className='nav-item'>
                  <Link to='/cart' className='nav-link'>
                    <span className='fa-solid fa-cart-shopping'></span>{" "}
                    <span>[{cart.length}]</span>
                  </Link>
                </li>
              </ul>

              <div className='row'>
                <div
                  className='search-box-wrapper'
                  style={{ marginLeft: "2.5rem" }}
                >
                  <Tippy
                    visible={showResult}
                    placement='bottom-start'
                    interactive
                    render={(attrs) => (
                      <div tabIndex='-1' {...attrs}>
                        <div className='search-result-wrapper'>
                          {resultArray.length !== 0 ? (
                            <div>
                              {resultArray.map((item, index) => {
                                return (
                                  index <= 3 && (
                                    <div
                                      className='search-result-item'
                                      key={index}
                                    >
                                      <div className='search-result-img'>
                                        <Link to={`/detail/${item.codePro}`}>
                                          <img
                                            src={item.img_1}
                                            alt='Cart-Mini-Image'
                                          />
                                        </Link>
                                      </div>
                                      <div className='search-result-content'>
                                        <Link to={`/detail/${item.codePro}`}>
                                          <div>
                                            {item.name.slice(
                                              0,
                                              item.name.length - 10
                                            )}
                                          </div>
                                          <div>{item.price}đ</div>
                                        </Link>
                                      </div>
                                    </div>
                                  )
                                );
                              })}
                            </div>
                          ) : (
                            <div style={{ marginLeft: "38px" }}>
                              Không tìm thấy sản phẩm
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  >
                    <form action='search' className='pl-1'>
                      <div className='d-flex'>
                        <input
                          required
                          type='text'
                          className='search-input'
                          autoFocus={true}
                          placeholder='Search'
                          value={inputSearch}
                          onChange={(e) => {
                            handleInputSearch(e.target.value);
                          }}
                        />
                        <button
                          type='submit'
                          value=''
                          className='btn-search fas fa-search submit'
                        />
                      </div>
                    </form>
                  </Tippy>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  } else if (user.admin || user.staff) {
    return (
      <div>
        <nav
          className='navbar navbar-expand-lg navbar-dark bg-dark ftco-navbar-light'
          id='ftco-navbar'
        >
          <div className='container'>
            <Link to='/'>
              <img src={brandLogo.logo} alt='Eva De Eva' />
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#ftco-nav'
              aria-controls='ftco-nav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='fa-solid fa-bars'></span> Menu
            </button>

            <div className='collapse navbar-collapse' id='ftco-nav'>
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link to='/admin-offline-product' className='nav-link'>
                    Offline
                  </Link>
                </li>
                {user.admin && (
                  <li className='nav-item'>
                    <Link to='/admin-product' className='nav-link'>
                      Manage Shop
                    </Link>
                  </li>
                )}
                <li className='nav-item'>
                  <Link to='/admin-order' className='nav-link'>
                    Manage Order
                  </Link>
                </li>
                {user.admin && (
                  <li className='nav-item'>
                    <Link to='/admin-user' className='nav-link'>
                      Manage User
                    </Link>
                  </li>
                )}
                <li className='nav-item'>
                  <Link to='/admin-event' className='nav-link'>
                    Manage Event
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/admin-voucher' className='nav-link'>
                    Manage Voucher
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link to='/account' className='nav-link'>
                    <span className='fa-solid fa-user'></span>
                  </Link>
                </li>
                <li className='nav-item nav-notification'>
                  <Link className='nav-link'>
                    <span className='fa-solid fa-bell'></span>{" "}
                    <span>[{!newOrder.loading ? 1 : 0}]</span>
                  </Link>
                  <div className='notify'>
                    <div className='notify_inner'>
                      <div className='notify_header'>Thông Báo Của Bạn</div>
                      <div className='notify_body noselect'>
                        {!newOrder.loading && (
                          <Link to='/admin-order'>
                            <div className='notify-item order'>
                              <div className='notify-item__thumbnail'></div>
                              <div className='notify-item__text'>
                                Bạn có đơn hàng mới đang chờ xử lý
                              </div>
                            </div>
                          </Link>
                        )}
                      </div>
                      <div className='notify_footer'></div>
                    </div>
                  </div>
                </li>
                <li className='nav-item'>
                  <Link to='/cart' className='nav-link'>
                    <span className='fa-solid fa-cart-shopping'></span>{" "}
                    <span>[{cart.length}]</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.User,
    cart: state.Cart,
    product: [...state.Product, ...state.Accessory],
    sale: state.Event,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCart: (id, size) => dispatch(removeCart(id, size)),
    logout: () => dispatch(stopLogin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
