/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Status } from 'types';

import { getRequest } from 'utils/api';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    const res = await getRequest('/users');

    return res.data.results;
  },
);

interface InitialState {
  list: Array<any>,
  status: Status,
}

const initialState: InitialState = {
  list: [],
  status: 'none',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'requested';
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<object[]>) => {
        state.status = 'success';
        state.list = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
