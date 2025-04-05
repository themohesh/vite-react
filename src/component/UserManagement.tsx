import React from "react";
import { users } from "../data";

interface EmployeeType {
  id: number;
  name: string;
  age: number;
  bioData: string;
  city: string;
  country: string;
}

const UserManagement: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h4>Employees Database Management!</h4>
        <button>Add New User</button>
      </div>
      <hr />
      <div className="flex flex-row">
        <div className="basis-1/3">Users List</div>
        <div className="basis-2/3">users Inforomation</div>
      </div>
    </div>
  );
};

export default UserManagement;
