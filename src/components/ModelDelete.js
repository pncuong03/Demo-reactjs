import { Modal, Button } from 'react-bootstrap';
import { handleDelete } from '../services/DeleteUser';


const ModelComfirm = (props) => {

    const { show, handleClose, dataUserDelete, handleDeleteUserFrom } = props;

    const comfirmDelete = async () => {

        await handleDelete(dataUserDelete)
        handleClose();
        handleDeleteUserFrom(dataUserDelete);

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

                        <br />
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