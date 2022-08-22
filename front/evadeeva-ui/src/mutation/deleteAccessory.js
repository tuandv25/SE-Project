import client from "../client/client";
import {gql} from '@apollo/client';
const deleteAccessory = (item) => {
    client.mutate({
        mutation: gql`
            mutation Mutation($filesName: [String], $deleteAccessoryId: Int!) {
                deleteFile(filesName: $filesName)
                deleteAccessory(id: $deleteAccessoryId) {
                    id,
                    name,
                }
            }
        `,

        variables: {
            deleteAccessoryId: item.id,
            filesName: item.codePro,
        }
    }).catch(err => {
        console.log("Lỗi hệ thống, vui lòng thử lại!")});
}

export default deleteAccessory;
