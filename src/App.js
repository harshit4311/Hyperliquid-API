import React from "react";
import { WalletProvider } from "./WalletContext";
import TestWallet from "./TestWallet";

const App = () => {
    return (
        <WalletProvider>
            <TestWallet />
        </WalletProvider>
    );
};

export default App;
