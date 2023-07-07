import { Modal, Button } from 'react-bootstrap';
import { deleteUser  } from '../services/UserService';
import { toast } from 'react-toastify';

const ModelComfirm = (props) => {

    const { show, handleClose, dataUserDelete, handleDeleteUserFrom } = props;

    const comfirmDelete = async () => {
        let res = await  deleteUser(dataUserDelete.id)
        
        if(res && +res.statusCode === 204){
            toast.success("Delete user succedd!")
            handleClose();
            handleDeleteUserFrom(dataUserDelete);
        }else{
            toast.error("error delete user")
        }
    }
    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">

                        
                                Are you sure to delete this user?
                           
                      <br/>
                        <b>email = {dataUserDelete.email} ?</b>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => comfirmDelete()}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModelComfirm;