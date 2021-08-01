export const ENDPOINT = process.env.ENDPOINT || "/api/v1";
export const LOGIN_ENDPOINT = `${ENDPOINT}/login`;
export const TOKEN_ENDPOINT = `${ENDPOINT}/token`;
export const INBOX_ENDPOINT = `${ENDPOINT}/inbox`;
export const OUTBOX_ENDPOINT = `${ENDPOINT}/outbox`;
export const CLAIM_ENDPOINT = `${ENDPOINT}/claim`;
export const SENT_ENDPOINT = `${ENDPOINT}/sent`;
export const LOGOUT_ENDPOINT = `${ENDPOINT}/logout`;
export const PORT = process.env.PORT || 8081;
export const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://blockchaininbox:blockchaininbox@cluster0.woxyc.mongodb.net/blockchain-inbox?retryWrites=true&w=majority";

//export const MONGO_URI = process.env.MONGO_URI || "mongodb://blockchain-inbox:blockchain-inbox@localhost:27017/blockchain-inbox?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

// validity of login token in milliseconds
export const LOGIN_TOKEN_THRESHOLD = process.env.LOGIN_TOKEN_THRESHOLD || 1000 * 60 * 1000 // 10 minutes

// JWT SECRET
export const JWT_SECRET = process.env.JWT_SECRET || "68db0d7b-6b8a-4ca9-9251-d1f2a795311a";
export const SDK_MNEMONIC = process.env.SDK_MNEMONIC || "donate artwork mandate vacuum wreck crash junk zebra total toss say student loan satisfy moon profit duck fire wreck bacon unit retire strong rely"
export const SDK_PUBLIC_ADDRESS = process.env.SDK_PUBLIC_ADDRESS || "bluzelle1gwchgddg96fy2pfgjvg22lqrseyrlpsyjh8xah"
export const SDK_CONNECTION_URL = process.env.SDK_CONNECTION_URL || "wss://client.sentry.testnet.private.bluzelle.com:26657"
export const SDK_MAX_GAS = parseInt(process.env.SDK_MAX_GAS || '0') || 100000000
export const SDK_GAS_PRICE = parseInt(process.env.SDK_GAS_PRICE || '0') || 0.002

