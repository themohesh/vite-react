import React, { useState } from "react";
import { UserType } from "../App";

interface UserTable {
  users: UserType[];
}
interface UserEdit {
  editUser?: UserType;
  filteredData: UserType[];
  setFilteredData: React.Dispatch<React.SetStateAction<UserType[]>>;
  setIsEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
//1. implement delete in action
//2. restore user in main list
//3. users info b/w table
//4. search avlb users
//5. edit users

const Usertable: React.FC<UserTable> = ({ users }) => {
  const [filteredData, setFilteredData] = useState(users);
  const [data, setData] = useState(users);
  const [deletedUsers, setDeletedUsers] = useState<UserType[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [searchText, setSearchtext] = useState<string>("");
  const [editUser, setEditUser] = useState<UserType>();
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

  //case 1
  const handleDelete = (id: number) => {
    //find users data
    const selectedUser: UserType | undefined = [...users].find(
      (x) => x.id == id
    );
    //deleted list set
    if (selectedUser) {
      setDeletedUsers((prev) =>
        prev ? [...prev, selectedUser] : [selectedUser]
      );
    }
    //
    if (selectedUser?.id == id) {
      setSelectedUser(null);
    }
    //set final data
    const updatedData: UserType[] = filteredData.filter((x) => x.id !== id);
    setFilteredData(updatedData);
    setData(updatedData);
  };

  //case 2
  const handleRestore = (id: number) => {
    //find users data
    const selectedUser: UserType | undefined = [...users].find(
      (x) => x.id == id
    );

    if (selectedUser) {
      setFilteredData((prev) => [...prev, selectedUser]);
    }

    //set final data
    const updatedData: UserType[] = deletedUsers
      ? deletedUsers.filter((x) => x.id !== id)
      : [];
    setDeletedUsers(updatedData);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchtext(value);
    if (value) {
      const filteredList: UserType[] = filteredData.filter((item) =>
        Object.values(item).some((x) =>
          JSON.stringify(x).toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredData(filteredList);
    } else {
      setFilteredData(data);
    }
  };

  //edit
  const handleEdit = (id: number) => {
    //find users data
    const selectedUser: UserType | undefined = [...filteredData].find(
      (x) => x.id == id
    );
    setEditUser(selectedUser);
    setIsEditModalVisible(true);
  };

  return (
    <div className="">
      <div className="flex flex-row">
        <div>
          <div>
            <label>
              Search table
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearch}
              />
            </label>
          </div>
          <table>
            <thead>
              <tr>
                <td>SNo</td>
                <td>Name</td>
                <td>Action</td>
              </tr>
            </thead>
            {filteredData.map((item, index) => (
              <tbody>
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    <button onClick={() => handleEdit(item.id)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                    <button onClick={() => setSelectedUser(item)}>Info</button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        {selectedUser && (
          <div>
            <h6>Selected User : {selectedUser.name}</h6>
            <ul>
              <li>Age:{selectedUser.age}</li>
              <li>Age:{selectedUser.bioData}</li>
              <li>Age:{selectedUser.city}</li>
              <li>Age:{selectedUser.country}</li>
            </ul>
          </div>
        )}
        {deletedUsers && (
          <div>
            <table>
              <thead>
                <tr>
                  <td>SNo</td>
                  <td>Name</td>
                  <td>Action</td>
                </tr>
              </thead>
              {deletedUsers &&
                deletedUsers.map((item, index) => (
                  <tbody>
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <button onClick={() => handleRestore(item.id)}>
                          Restore
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        )}
      </div>
      {isEditModalVisible && (
        <EditUserComp
          editUser={editUser}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
          setIsEditModalVisible={setIsEditModalVisible}
        />
      )}
    </div>
  );
};

export default Usertable;

/////////////////////////////////////////////////////////////
const EditUserComp: React.FC<UserEdit> = ({
  editUser,
  filteredData,
  setFilteredData,
  setIsEditModalVisible,
}) => {
  const [userDetails, setUserDetails] = useState<UserType>(
    editUser as UserType
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const editedUserId = userDetails.id;
    const updatedData = filteredData.map((item) =>
      item.id === editedUserId ? userDetails : item
    );
    setFilteredData(updatedData);
    setIsEditModalVisible(false);
  };

  return (
    <div>
      <h2>Edit User</h2>
      {editUser ? (
        <div>
          <label>
            Name :
            <input
              placeholder="Enter name"
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Age :
            <input
              placeholder="Enter age"
              type="number"
              name="age"
              value={userDetails.age}
              onChange={handleChange}
            />
          </label>
          <label>
            BioData :
            <input
              placeholder="Enter bioData"
              type="text"
              name="bioData"
              value={userDetails.bioData}
              onChange={handleChange}
            />
          </label>
          <label>
            City :
            <input
              placeholder="Enter city"
              type="text"
              name="city"
              value={userDetails.city}
              onChange={handleChange}
            />
          </label>
          <label>
            Country :
            <input
              placeholder="Enter country"
              type="text"
              name="country"
              value={userDetails.country}
              onChange={handleChange}
            />
          </label>
          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditModalVisible(false)}>Close</button>
          </div>
        </div>
      ) : (
        <p>No user selected</p>
      )}
    </div>
  );
};
