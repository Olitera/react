import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../../interfaces/form-data';

interface FormState {
  uncontrolledFormData: FormData | null;
}

const initialState: FormState = {
  uncontrolledFormData: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setUncontrolledFormData(state, action: PayloadAction<FormData>) {
      state.uncontrolledFormData = action.payload;
    },
  },
});

export const { setUncontrolledFormData } = formSlice.actions;

export default formSlice.reducer;
