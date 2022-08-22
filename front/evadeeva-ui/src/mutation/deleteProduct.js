import client from "../client/client";
import {gql} from '@apollo/client';
const deleteProduct = (item) => {
    client.mutate({
        mutation: gql`
            mutation Mutation($filesName: [String], $deleteProductId: Int!) {
                deleteFile(filesName: $filesName)
                deleteProduct(id: $deleteProductId) {
                    id,
                    name,
                }
            }
        `,

        variables: {
            deleteProductId: item.id,
            filesName: item.codePro,
        }
    }).catch(err => {
        console.log("Lỗi hệ thống, vui lòng thử lại!")});
}

export default deleteProduct;
