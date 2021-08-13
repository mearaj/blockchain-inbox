// This file contains base environmental variables for development which can easily be replaced on the
// deployed server like Heroku.

export const BACKEND_PORT = process.env.BACKEND_PORT || 8081;

// if  process.env.BACKEND_BASE_URL or process.env.PUBLIC_URL is provided, then they will be used.
export const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || process.env.PUBLIC_URL || `http://localhost:${BACKEND_PORT}/api/v1`;
export const BLUZELLE_BACKEND_PUBLIC_ADDRESS = "bluzelle1gwchgddg96fy2pfgjvg22lqrseyrlpsyjh8xah";
const BLUZELLE_TESTNET_PRIVATE_CHAIN_ID = "bluzelleTestNetPrivate-133";

// If process.env.BLUZELLE_CHAIN_ID is provided then that will be used.
export const BLUZELLE_CHAIN_ID = process.env.BLUZELLE_CHAIN_ID || BLUZELLE_TESTNET_PRIVATE_CHAIN_ID;

