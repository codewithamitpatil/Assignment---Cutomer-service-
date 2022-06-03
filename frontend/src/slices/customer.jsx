import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import { omit } from "lodash";

import { Create, Update, getAll, Remove } from "../services/customer";

// intial state
const initialState = {};

export const createCustomer = createAsyncThunk(
  "customer/create",
  async (input, { rejectWithValue }) => {
    try {
      const res = await Create(input);
      console.log(res);
      return {
        ...input,
        cid: res?.data?.cid,
      };
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/update",
  async ({ cid, input }, { rejectWithValue }) => {
    input = omit(input, "cid");

    try {
      await Update(cid, input);
      return {
        ...input,
        cid,
      };
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  }
);

export const removeCustomer = createAsyncThunk(
  "customer/remove",
  async (cid, { rejectWithValue }) => {
    try {
      const res = await Remove(cid);
      return { cid };
    } catch (e) {
      return rejectWithValue(e?.response?.data);
    }
  }
);

export const retrieveCustomers = createAsyncThunk(
  "customer/retrieve",
  async () => {
    const res = await getAll();
    return res;
  }
);

// slice
const CustomerSlice = createSlice({
  name: "customer",
  initialState,
  extraReducers: {
    [createCustomer.fulfilled]: (state, action) => {
      state.data.push(action.payload);
    },
    [retrieveCustomers.fulfilled]: (state, action) => {
      return action.payload;
    },
    [updateCustomer.fulfilled]: (state, action) => {
      let index = current(state).data.findIndex(
        (item) => item.cid == action.payload.cid
      );
      state.data[index] = action.payload;
      return state;
    },
    [removeCustomer.fulfilled]: (state, action) => {
      state.data = current(state).data.filter(
        (item) => item.cid !== action.payload.cid
      );

      return state;
    },
  },
});

const { reducer } = CustomerSlice;

// export
export default reducer;
