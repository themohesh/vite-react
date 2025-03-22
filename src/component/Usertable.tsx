import React, { useState } from "react";
import { UserType } from "../App";

interface UserTable {
  users: UserType[];
}
//1. implement delete in action
//2. restore user in main list
//3. users info b/w table

const Usertable: React.FC<UserTable> = ({ users }) => {
  const [filteredData, setFilteredData] = useState(users);
  const [data, setData] = useState(users);
  const [deletedUsers, setDeletedUsers] = useState<UserType[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [searchText, setSearchtext] = useState<string>("");

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

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
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
                  <button>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
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
  );
};

export default Usertable;
