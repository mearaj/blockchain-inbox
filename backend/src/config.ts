export const ENDPOINT = "/api/v1";
export const LOGIN_ENDPOINT = `${ENDPOINT}/login`;
export const TOKEN_ENDPOINT = `${ENDPOINT}/token`;
export const INBOX_ENDPOINT = `${ENDPOINT}/inbox`;
export const OUTBOX_ENDPOINT = `${ENDPOINT}/outbox`;
export const CLAIM_ENDPOINT = `${ENDPOINT}/claim`;
export const SENT_ENDPOINT = `${ENDPOINT}/sent`;
export const LOGOUT_ENDPOINT = `${ENDPOINT}/logout`;
export const PORT = process.env.PORT || 8081;
export const MONGO_URI = "mongodb+srv://blockchaininbox:blockchaininbox@cluster0.woxyc.mongodb.net/blockchain-inbox?retryWrites=true&w=majority";
// validity of login token in milliseconds
export const LOGIN_TOKEN_THRESHOLD = 1000 * 60 * 1000 // 10 minutes
// JWT SECRET
export const JWT_SECRET = "68db0d7b-6b8a-4ca9-9251-d1f2a795311a";

