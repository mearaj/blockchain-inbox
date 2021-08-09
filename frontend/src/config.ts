export const BACKEND_PORT = process.env.BACKEND_PORT || 8081;
export const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || process.env.PUBLIC_URL || `http://localhost:${BACKEND_PORT}/api/v1`;
export const BLUZELLE_BACKEND_PUBLIC_ADDRESS = "bluzelle1gwchgddg96fy2pfgjvg22lqrseyrlpsyjh8xah";
const BLUZELLE_TESTNET_PRIVATE_CHAIN_ID = "bluzelleTestNetPrivate-133";
export const BLUZELLE_CHAIN_ID = BLUZELLE_TESTNET_PRIVATE_CHAIN_ID;

