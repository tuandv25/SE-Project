import client from '../client/client';
import {gql} from '@apollo/client';
import {startSetProduct} from '../actions/product';

const getProduct = (dispatch) => {
    client
        .query({
            query: gql`
                query getProduct {
                    getProduct {
                        id
                        name
                        categoryId
                        description
                        img_1
                        img_2
                        updatedAt
                        createdAt
                        price
                        codePro
                        size_M
                        size_S
                        size_L
                        size_XL
                        material
                        color
                        publish
                        newPro
                    }
                }`
        })
        .then(result => {
            dispatch(startSetProduct(result.data.getProduct))
        })
};

export default getProduct;
