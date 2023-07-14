import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { handleAdd } from '../services/CreateUser';


const ModelAddNew = (props) => {

    const { show, handleClose, handleUpdateTable } = props;
    const [name, setName] = useState("")
    const [job, setJob] = useState("")

    const handleAddUser = async () => {
    
          let res = await handleAdd(name, job);
      
          handleClose();
          setName('');
          setJob('');
      
          handleUpdateTable({
            first_name: name,
            id: res.id
          });
        
      };
      
      
    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
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
                    <Button variant="primary" onClick={handleAddUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModelAddNew;