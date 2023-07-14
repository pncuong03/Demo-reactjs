import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';

export const handleAdd = async (name, job) => {
    let res = await postCreateUser(name, job);

    if (res && res.id) {
        toast.success("A user is created successfully!");
        return res;
    } else {
        toast.error("An error!");
    }

};

