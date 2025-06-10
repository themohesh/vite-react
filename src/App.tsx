import { useState } from "react";

import "./App.css";
import { users } from "./data";
import Usertable from "./component/Usertable";
import TicTac from "./component/TicTac";
import InfiniteScrollUser from "./component/InfiniteScrollUser";
import UserManagement from "./component/UserManagement";
import InfiniteScroll from "./component/InfiniteScroll";
import CountDownTimer from "./component/CountDownTimer";

//
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { config } from "./component/web3/config";
import { Account } from "./component/web3/account";
import { WalletOptions } from "./component/web3/wallet-options";

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}
//
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
      <UserManagement />
      {/* <InfiniteScroll /> */}
      {/* <CountDownTimer /> */}

      {/* <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectWallet />
        </QueryClientProvider>
      </WagmiProvider> */}
    </>
  );
}

export default App;
