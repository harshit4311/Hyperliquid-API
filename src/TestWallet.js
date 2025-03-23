import React, { useState } from "react";
import { useWallet } from "./WalletContext";
import { ethers } from "ethers";

const TestWallet = () => {
    const { connectWallet, account, signer } = useWallet();
    const [signature, setSignature] = useState(null);

    const signMessage = async () => {
        if (!signer) {
            alert("Please connect your wallet first.");
            return;
        }

        const message = "Testing MetaMask signing!";
        try {
            const signedMessage = await signer.signMessage(message);
            setSignature(signedMessage);
            console.log("✅ Signature:", signedMessage);
        } catch (error) {
            console.error("❌ Error signing message:", error);
        }
    };

    return (
        <div>
            <h2>Test MetaMask Connection</h2>
            <button onClick={connectWallet}>Connect MetaMask</button>
            {account && <p>Connected Wallet: {account}</p>}

            <button onClick={signMessage} disabled={!account}>
                Sign Message
            </button>

            {signature && (
                <div>
                    <p>🔹 Signed Message:</p>
                    <textarea value={signature} readOnly rows="3" style={{ width: "100%" }} />
                </div>
            )}
        </div>
    );
};

export default TestWallet;
