import { createSlice } from "@reduxjs/toolkit";
import { ClientData } from "@/interfaces/clientData";

export interface IinitialState {
  clientData: ClientData;
  clientModalsDisplay: {
    showAddModal: boolean;
    showClientDetails: boolean;
  };
}

const initialState: IinitialState = {
  clientData: {
    clientId: "",
    fullName: "",
    phoneNumber: "",
    booksLoaned: [],
  },
  clientModalsDisplay: { showAddModal: false, showClientDetails: false },
};

export const clientDataSlice = createSlice({
  name: "clientData",
  initialState,
  reducers: {
    setClientData: (state, action) => {
      state.clientData = action.payload.data;
    },
    setShowAddModal: (state) => {
      state.clientModalsDisplay.showAddModal =
        !state.clientModalsDisplay.showAddModal;
    },
    setShowClientDetails: (state) => {
      state.clientModalsDisplay.showClientDetails =
        !state.clientModalsDisplay.showClientDetails;
    },
  },
});

export const { setClientData, setShowAddModal, setShowClientDetails } =
  clientDataSlice.actions;
export default clientDataSlice.reducer;
