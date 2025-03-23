import { ethers } from "ethers";

const signature = "0xca07227af7d2ab60267e42ee1355364b8a9b94db984e7b6787667c92ec8e5cfd69ec4c277555b6db3e307bdddcc120985d19bbf0475a80f5a9c2e0b099f5f46e1c";

const sig = ethers.Signature.from(signature);

console.log("v:", sig.v);
console.log("r:", sig.r);
console.log("s:", sig.s);
