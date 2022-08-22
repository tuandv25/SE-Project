import { disableExperimentalFragmentVariables, gql, useQuery } from '@apollo/client';
import {connect} from 'react-redux';

import PageLoading from '../pages/PageLoading';
import { startSetAccessory } from '../actions/accessory';
import { startSetProduct } from '../actions/product';
import { setEvent, startSetEvent } from '../actions/event';
import { startSetVoucherPremium } from '../actions/voucherPremium';
import { startSetVoucher } from '../actions/voucher';
import { startSetVoucherBirthday } from '../actions/voucherBirthday';

const GET_DATA = gql`
  query GetProduct {
    getProduct {
      id
      createdAt
      updatedAt
      categoryId
      name
      description
      img_1
      img_2
      price
      codePro
      size_M
      size_S
      size_L
      size_XL
      material
      color
      newPro
      publish
    }
    getSale {
      name
      categoryId
      disCount
      expireAt
    }
    getVoucher {
      id
      createdAt
      updatedAt
      name
      disCount
      disCount2
      condition
      expireAt
    }
    getVoucherPremium {
      id
      createdAt
      updatedAt
      name
      disCount
      disCount2
      categoryId
      condition
      expireAt
    }

    getVoucherBirthday {
      id
      createdAt
      updatedAt
      name
      disCount
      condition
    }
    getAccessory {
        id
        name
        description
        img_1
        img_2
        updatedAt
        createdAt
        price
        codePro
        count
        material
        color
        publish
        newPro
    }
    getSales {
      id
      createdAt
      updatedAt
      name
      categoryId
      disCount
      expireAt
      publish
    }
  }`;

const GetData = ({startSetAccessory, startSetProduct, startSetVoucher, startSetVoucherPremium, setEvent, startSetEvent,startSetVoucherBirthday}) => {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <PageLoading/>;
  if (error) return `Error! ${error}`;
  if (data) {
      startSetProduct(data.getProduct)
      setEvent(data.getSale)
      startSetVoucher(data.getVoucher)
      startSetVoucherPremium(data.getVoucherPremium)
      startSetAccessory(data.getAccessory)
      startSetEvent(data.getSales)
      startSetVoucherBirthday(data.getVoucherBirthday)
  }
  return (
      <PageLoading/>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    startSetProduct:(product) => dispatch(startSetProduct(product)),
    setEvent:(data) => dispatch(setEvent(data)),
    startSetVoucher:(voucher) => dispatch(startSetVoucher(voucher)),
    startSetVoucherPremium:(voucher) => dispatch(startSetVoucherPremium(voucher)),
    startSetVoucherBirthday:(voucher) => dispatch(startSetVoucherBirthday(voucher)),
    startSetAccessory:(accessory) => dispatch(startSetAccessory(accessory)),
    startSetEvent:(event) => dispatch(startSetEvent(event)),
  }
}

export default connect(null, mapDispatchToProps)(GetData);
