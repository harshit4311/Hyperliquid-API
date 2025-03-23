import React, { useState } from "react";
import { useWallet } from "./WalletContext";
import { convertToMultiSigUser } from "./hyperliquid";

const TestMultiSig = () => {
    const { connectWallet, account, signer } = useWallet();
    const [status, setStatus] = useState("Idle");

    const handleConvert = async () => {
        if (!account || !signer) {
            await connectWallet();
        }

        try {
            setStatus("Processing...");
            const authorizedUsers = ["0xYourWalletAddress1", "0xYourWalletAddress2"];
            const threshold = 2;

            const response = await convertToMultiSigUser(signer, account, authorizedUsers, threshold);
            console.log("✅ MultiSig Conversion Success:", response);
            setStatus("Success!");
        } catch (error) {
            console.error("❌ MultiSig Conversion Failed:", error);
            setStatus("Failed: " + error.message);
        }
    };

    return (
        <div>
            <h2>Test MultiSig Conversion</h2>
            <button onClick={handleConvert}>Convert to MultiSig</button>
            <p>Status: {status}</p>
        </div>
    );
};

export default TestMultiSig;
