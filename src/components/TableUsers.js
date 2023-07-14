import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModelAddNew from './ModelAddNew';
import ModelEditUser from './ModelEditUser';
import ModelComfirm from './ModelDelete';
import _, { debounce } from "lodash";

const Users = (props) => {

  const initialState = {
    listUsers: [],
    totalUsers: 0,
    totalPages: 0
  };

  const show = {
    isShowAddNew: false,
    isShowEditUser: false,
    isShowModelDelete: false
  }

  const dataUsers = {
    dataUserEdit: {},
    dataUserDelete: {}
  }

  const [dataUser, setDataUser] = useState(dataUsers);
  const {dataUserEdit, dataUserDelete} = dataUser;

  const [isShow, setIsShow] = useState(show);
  const { isShowAddNew, isShowEditUser, isShowModelDelete } = isShow;

  const [userData, setUserData] = useState(initialState);
  const { listUsers, totalUsers, totalPages } = userData;



  const handleClose = () => {
    setIsShow(prev => ({
      ...prev,
      isShowAddNew: false,
      isShowEditUser: false,
      isShowModelDelete: false
    }));
  };
  

  const handleUpdateTable = (user) => {
    setUserData(prev => ({
      ...prev,
      listUsers: [user, ...prev.listUsers]
    }));
  };
  
  

  const handleUpdateTableEdit = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex(item => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setUserData(prev => ({
      ...prev,
      listUsers: cloneListUsers
    }))

  }



  const handleEditUser = (user) => {
    setIsShow(prev => ({
      ...prev,
      isShowEditUser: true,
    }));
    setDataUser(prev => ({
      ...prev,
      dataUserEdit: user
    }))


  }

  const handleDeleteUser = (user) => {
    setIsShow(prev => ({
      ...prev,
      isShowModelDelete: true,
    }));
    setDataUser(prev => ({
      ...prev,
      dataUserDelete: user
    }))
  }

  const handleDeleteUserFrom = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
    setUserData(prev => ({
      ...prev,
      listUsers: cloneListUsers
    }))
  }


  useEffect(() => {
    //call API
    getUsers(1);
  }, [])

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setUserData({
        listUsers: res.data,
        totalUsers: res.total,
        totalPages: res.total_pages
      });
    }

  }

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  }

  const handleSearch = debounce((event) => {
    let term = event.target.value;

    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
      setUserData(prev => ({
        ...prev,
        listUsers: cloneListUsers
      }))
    } else {
      getUsers(1);
    }
  }, 500)

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List Users: </b>
        </span>
        <button className="btn btn-success"
          onClick={() =>  setIsShow(prev => ({
            ...prev,
            isShowAddNew: true,
          }))}
        >
          Add edit user</button>
      </div>
      <div className="col-6 my-3">
        <input
          className="form-control"
          placeholder='search user by email...'
          // value={keyWord}
          onChange={(event) => handleSearch(event)}
        />
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
            listUsers.map((item) => {
              return (
                <tr key={item.id}>
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