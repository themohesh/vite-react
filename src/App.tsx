import { useState } from "react";

import "./App.css";
import { users } from "./data";
import Usertable from "./component/Usertable";
import TicTac from "./component/TicTac";
import InfiniteScrollUser from "./component/InfiniteScrollUser";
import UserManagement from "./component/UserManagement";
import InfiniteScroll from "./component/InfiniteScroll";
import CountDownTimer from "./component/CountDownTimer";
export interface UserType {
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
      {/* <h1>Hello Vite...!</h1> */}
      {/* <Usertable users={users} /> */}
      {/* <TicTac /> */}
      {/* <InfiniteScrollUser /> */}
      {/* <UserManagement /> */}
      {/* <InfiniteScroll /> */}
      <CountDownTimer />
    </>
  );
}

export default App;
