import { ethers } from "ethers";

const HYPERLIQUID_NETWORK_PARAMS = {
    chainId: "0x3E7", // Hexadecimal for 999
    chainName: "Hyperliquid",
    nativeCurrency: { name: "HyperLiquid", symbol: "HYPE", decimals: 18 },
    rpcUrls: ["https://rpc.hyperliquid.xyz/evm"],
    blockExplorerUrls: ["https://explorer.hyperliquid.xyz"],
};

export const convertToMultiSigUser = async (signer, account, authorizedUsers, threshold) => {
    if (!signer || !account) {
        alert("Please connect your wallet.");
        throw new Error("Signer or account not initialized.");
    }

    const nonce = Date.now();
    const signers = { authorizedUsers, threshold };

    const domain = {
        name: "HyperliquidTransaction",
        version: "1",
        chainId: 999,
        verifyingContract: "0x0000000000000000000000000000000000000000",
    };

    const types = {
        "HyperliquidTransaction:ConvertToMultiSigUser": [
            { name: "hyperliquidChain", type: "string" },
            { name: "signers", type: "string" },
            { name: "nonce", type: "uint64" },
        ],
    };

    const message = {
        hyperliquidChain: "Mainnet",
        signatureChainId: "0x3e7",
        signers: JSON.stringify(signers),
        nonce,
        type: "convertToMultiSigUser",
    };

    try {
        const signature = await signer.signTypedData(domain, types, message);
        console.log("✅ Signature received:", signature);

        const { v, r, s } = ethers.Signature.from(signature);

        const payload = {
            action: {
                type: "convertToMultiSigUser",
                hyperliquidChain: "Mainnet",
                signatureChainId: "0x3e7",
                signers,
                nonce,
            },
            nonce,
            signature: { v, r, s },
        };

        const response = await fetch("https://api.hyperliquid.xyz/exchange", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log("🔹 API Response:", result);

        if (!response.ok || result.error) {
            throw new Error(result.error?.message || "API request failed");
        }

        return result;
    } catch (error) {
        console.error("❌ Error converting to MultiSig:", error);
        throw error;
    }
};
