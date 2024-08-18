import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../interfaces/form-data';

interface FormState {
  uncontrolledFormData: FormData | null;
  hookFormData: FormData | null;
}

const initialState: FormState = {
  uncontrolledFormData: null,
  hookFormData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData(state, action: PayloadAction<FormData>) {
      state.uncontrolledFormData = action.payload;
    },
    setHookFormData: (state, action: PayloadAction<FormData>) => {
      state.hookFormData = action.payload;
    },
  },
});

export const { setUncontrolledFormData, setHookFormData } = formSlice.actions;

export default formSlice.reducer;
