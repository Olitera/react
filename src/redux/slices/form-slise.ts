import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../interfaces/form-data';

interface FormState {
  uncontrolledFormData: FormData[];
  hookFormData: FormData[];
  lastUpdated: 'uncontrolled' | 'hookForm' | null;
}

const initialState: FormState = {
  uncontrolledFormData: [],
  hookFormData: [],
  lastUpdated: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData(state, action: PayloadAction<FormData>) {
      state.uncontrolledFormData.push(action.payload);
      state.lastUpdated = 'uncontrolled';
    },
    setHookFormData: (state, action: PayloadAction<FormData>) => {
      state.hookFormData.push(action.payload);
      state.lastUpdated = 'hookForm';
    },
  },
});

export const { setUncontrolledFormData, setHookFormData } = formSlice.actions;

export default formSlice.reducer;
