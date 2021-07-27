import {MessagesState} from 'store/Messages/interfaces';
import {PayloadAction} from '@reduxjs/toolkit';
import {StdSignature, StdSignDoc} from '@cosmjs/launchpad';

// Handled by claimMessageSage
export const claimMessage = (state: MessagesState, action: PayloadAction<{ signature: StdSignature, signed: StdSignDoc }>) => {

}

export const claimMessagePending = (state: MessagesState, action: PayloadAction) => {
  state.claimMessageState = action.type
}

export const claimMessageFailure = (state: MessagesState, action: PayloadAction) => {
  state.claimMessageState = action.type
}

export const claimMessageSuccess = (state: MessagesState, action: PayloadAction) => {
  state.claimMessageState = action.type;
}

export const claimMessageClear = (state: MessagesState, action: PayloadAction) => {
  state.claimMessageState = "";
}

export const setClaimMessageUuid = (state: MessagesState, action: PayloadAction<string>) => {
  state.claimMessageUuid = action.payload;
}

export const setClaimMessageSigned = (state: MessagesState, action: PayloadAction<StdSignDoc | undefined>) => {
  state.claimMessageSigned = action.payload;
}

export const setClaimMessageSignature = (state: MessagesState, action: PayloadAction<StdSignature | undefined>) => {
  state.claimMessageSignature = action.payload;
}
