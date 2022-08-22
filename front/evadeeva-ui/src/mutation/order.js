import client from "../client/client";
import {gql} from '@apollo/client';

const order = (newOrder) => {
    client
        .mutate({
            mutation: gql`
                mutation Mutation($data: createOrderInput!) {
                    createOrder(data: $data) {
                        listPro
                        price
                        status
                    }
                }`,
            variables: {
                data: newOrder
            }
        })
        .then((response) => alert("Đặt hàng thành công!"))
        .catch(err => alert("Lỗi hệ thống, vui lòng thử lại!"));
}

export default order;
