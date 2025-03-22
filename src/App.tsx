import { useState } from "react";

import "./App.css";
import { users } from "./data";
import Usertable from "./component/Usertable";

export interface UserType{
  id: number;
  name: string;
  age: number;
  bioData: string;
  city: string;
  country: string;
}

function App() {
  return (
    <>
      <h1>Hello Table!</h1>
      <Usertable users={users} />
    </>
  );
}

export default App;
