import { configureStore } from "@reduxjs/toolkit";

import customerReducer from "../slices/customer";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
  },
});
