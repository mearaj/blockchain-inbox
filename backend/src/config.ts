export const ENDPOINT = "/api/v1";

export const LOGIN_ENDPOINT = `${ENDPOINT}/login`;
export const TOKENS_ENDPOINT = `${ENDPOINT}/tokens`;

export const INBOX_ENDPOINT = `${ENDPOINT}/inbox`;

export const OUTBOX_ENDPOINT = `${ENDPOINT}/outbox`;

export const CLAIMS_ENDPOINT = `${ENDPOINT}/claims`;

export const SENT_ENDPOINT = `${ENDPOINT}/sent`;

export const LOGOUT_ENDPOINT = `${ENDPOINT}/logout`;
export const PORT = process.env.PORT || 8081;
export const MONGO_URI = "mongodb+srv://blockchaininbox:blockchaininbox@cluster0.woxyc.mongodb.net/blockchain-inbox?retryWrites=true&w=majority";

