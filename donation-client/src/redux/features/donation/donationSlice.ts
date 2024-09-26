import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DonationFormState {
  amount: number;
  name: string;
  phone: string;
  loading: boolean;
  error: string | null;
}

const initialState: DonationFormState = {
  amount: 0,
  name: "",
  phone: "",
  loading: false,
  error: null,
};

const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<DonationFormState>>) => {
      return { ...state, ...action.payload };
    },
    startDonation: (state) => {
      state.loading = true;
      state.error = null;
    },
    donationSuccess: (state) => {
      state.loading = false;
    },
    donationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setFormData, startDonation, donationSuccess, donationFailure } =
  donationSlice.actions;

export default donationSlice.reducer;
