import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { putUpdateUser } from '../services/UserService';
import { toast } from 'react-toastify';


const ModelEditUser = (props) => {

    const { show, handleClose, dataUserEdit, handleUpdateTableEdit } = props;
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job);

        if(res && res.updateAt){

            handleUpdateTableEdit({
                first_name: name,
                id: dataUserEdit.id
            })
            
            handleClose();
            // toast.success("User is edited!")
           
        }else {
            // toast.error("User is not edited!")
        }
       
      
           
    }

    useEffect(() => {
        if(show){
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])
    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
    
                    </div>
                    <div className="form-group">
                        <label className="form-label">Job</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={job}
                            onChange={(event) => setJob(event.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModelEditUser;