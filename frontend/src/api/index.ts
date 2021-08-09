import {getLoginStatus, login, requestLoginToken} from 'api/login';
import {deleteOutboxMessageById, getOutbox, sendMessage} from 'api/outbox';
import {logout} from 'api/logout';
import {claimMessage} from 'api/claim';
import {deleteSentMessage, getSent, renewSentMessageLease} from 'api/sent';
import {deleteInboxMessage, getInbox, renewInboxMessageLease} from 'api/inbox';


export const api = {
  requestLoginToken,
  login,
  getLoginStatus,
  sendMessage,
  getOutbox,
  logout,
  getInbox,
  claimMessage,
  getSent,
  deleteOutboxMessageById,
  renewSentMessageLease,
  renewInboxMessageLease,
  deleteSentMessage,
  deleteInboxMessage
};

export default api;
