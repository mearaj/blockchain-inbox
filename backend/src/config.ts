export const ENDPOINT = "/api/v1";
export const REQUEST_LOGIN_TOKEN_ENDPOINT = `${ENDPOINT}/requestLoginToken`;
export const INBOX_ENDPOINT = `${ENDPOINT}/messages`;
export const SEND_MESSAGES_ENDPOINT = `${ENDPOINT}/messages`;
export const LOGIN_ENDPOINT = `${ENDPOINT}/login`;
export const LOGOUT_ENDPOINT = `${ENDPOINT}/logout`;
export const PORT = process.env.PORT || 8081;
export const MONGO_URI = "mongodb+srv://blockchaininbox:blockchaininbox@cluster0.woxyc.mongodb.net/blockchain-inbox?retryWrites=true&w=majority";
