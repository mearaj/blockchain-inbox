import {Dispatch} from 'redux';
import {AppState} from 'store/index';
import api, {Message} from 'api';

export const sendMessage = (message:Message) => async (dispatch:Dispatch, getState: ()=>AppState) => {
    const result = await api.sendMessage(message)
    console.log(result);
}
