import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModelAddNew from './ModelAddNew';
import ModelEditUser from './ModelEditUser';
import ModelComfirm from './ModelComfirm';
import _ from "lodash";

const Users = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowAddNew, setisShowAddNew] = useState(false);
    const [isShowEditUser, setisShowEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModelDelete, setIsShowModelDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    const handleClose = () => {
      setisShowAddNew(false)
      setisShowEditUser(false)
      setIsShowModelDelete(false)
    }
    
    const handleUpdateTable = (user) => {
      setListUsers([user, ...listUsers])
    }

    const handleUpdateTableEdit = (user) => {
      let cloneListUsers = _.cloneDeep(listUsers);
      let index = listUsers.findIndex(item => item.id === user.id);
      cloneListUsers[index].first_name = user.first_name;
      setDataUserEdit(user)
      
    
    }

    
    
    const handleEditUser = (user) => {
      setDataUserEdit(user)
      setisShowEditUser(true)
     
    }

    const handleDeleteUser = (user) => {
      setIsShowModelDelete(true)
      setDataUserDelete(user)
    }

    const handleDeleteUserFrom = (user) => {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
      setListUsers(cloneListUsers)
    }


    useEffect(() => {
        //call API
        getUsers(1);
    }, [])

    const getUsers =  async (page) => {
        let res = await fetchAllUser(page);
        if(res && res.data){
          setListUsers(res.data)
          setTotalPages(res.total_pages)
          setTotalUsers(res.total)
        }
        
    }

    const handlePageClick = (event) => {
      getUsers(+event.selected + 1); 
    }
    return (
    <>
        <div className="my-3 add-new">
            <span> 
              <b>List Users: </b>  
            </span>
          <button className="btn btn-success"
            onClick={() => setisShowAddNew(true)}
          >
            Add edit user</button>
        </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 &&
          listUsers.map((item, index) => {
            return(
              <tr key={`user-${index}`}>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>
                <button 
                  className="btn btn-danger mx-3" 
                  onClick={() => handleEditUser(item)}
                >Edit
                </button>
                <button 
                className="btn btn-dark"
                onClick={() => handleDeleteUser(item)}
                >Delete</button>
              </td>
            </tr>
            )
          })
        }
      </tbody>
    </Table>

    <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}

        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />

       <ModelAddNew 
          show={isShowAddNew}
          handleClose={handleClose}
          handleUpdateTable={handleUpdateTable}
       />

       <ModelEditUser 
          show={isShowEditUser}
          dataUserEdit={dataUserEdit}
          handleClose={handleClose}
          handleUpdateTableEdit={handleUpdateTableEdit}
          
       />

      <ModelComfirm 
          show={isShowModelDelete}
          handleClose={handleClose}
          dataUserDelete={dataUserDelete}
          handleDeleteUserFrom={handleDeleteUserFrom}
          
       />
    </>
    
    )
}

export default Users;