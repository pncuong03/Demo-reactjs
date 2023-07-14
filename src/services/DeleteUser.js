import { toast } from 'react-toastify';
import { deleteUser } from './UserService';

export const handleDelete = async (dataUserDelete) => {

    let res = await deleteUser(dataUserDelete.id);

    if (res && + res.statusCode === 204) {
        toast.success("Delete user succedd!");
        return res;
    } else {
        toast.error("Error delete user");
    }
}