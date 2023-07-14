import { putUpdateUser } from "./UserService";
import { toast } from 'react-toastify';

export const handleEdit = async (name, job) => {
    let res = await putUpdateUser(name, job);

    if (res && res.updateAt) {

        toast.success("User is edited!")
        return res;
    }else {
        toast.error("Error edit user");
    }

}