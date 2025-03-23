import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [signer, setSigner] = useState(null);
    const [provider, setProvider] = useState(null);

    // Detects if MetaMask is installed
    const isMetaMaskInstalled = () => typeof window.ethereum !== "undefined";

    // Connect wallet
    const connectWallet = async () => {
        if (!isMetaMaskInstalled()) {
            alert("Please install MetaMask.");
            return;
        }

        try {
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });

            const signer = await web3Provider.getSigner();
            const account = await signer.getAddress();

            setProvider(web3Provider);
            setSigner(signer);
            setAccount(account);

            console.log("✅ Wallet connected:", account);
        } catch (error) {
            console.error("❌ Error connecting wallet:", error);
        }
    };

    // Auto-connect on page load if MetaMask is already connected
    useEffect(() => {
        if (isMetaMaskInstalled()) {
            connectWallet();
        }
    }, []);

    return (
        <WalletContext.Provider value={{ account, signer, provider, connectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
