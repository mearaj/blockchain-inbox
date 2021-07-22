import {createSlice} from '@reduxjs/toolkit';

export interface SidebarState {
  open: boolean
}

const initialState: SidebarState = {
  open: false
};
const openSidebar = (state: SidebarState) => {
  state.open = true;
}
const closeSidebar = (state: SidebarState) => {
  state.open = false;
}
const toggleSidebar = (state: SidebarState) => {
  state.open = !state.open;
}
const sidebarSlice = createSlice({
  name: 'sidebarState',
  initialState: initialState,
  reducers: {
    openSidebar,
    closeSidebar,
    toggleSidebar
  }
});
export const sidebarActions = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;
export default sidebarSlice;
