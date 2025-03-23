from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

app = FastAPI()

# Hyperliquid API endpoint (update if needed)
HYPERLIQUID_API_URL = "https://api.hyperliquid.xyz"

# Request model for signing requests
class SignatureRequest(BaseModel):
    address: str  # User's wallet address
    signature: str  # Signed message from MetaMask
    message: str  # The actual message that was signed

@app.get("/")
def home():
    return {"message": "Hyperliquid Backend is Running"}

@app.post("/verify-signature/")
def verify_signature(data: SignatureRequest):
    """
    Verify the signed message and forward the request to Hyperliquid API
    """
    payload = {
        "address": data.address,
        "signature": data.signature,
        "message": data.message
    }

    try:
        response = requests.post(f"{HYPERLIQUID_API_URL}/verify-signature", json=payload)
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
