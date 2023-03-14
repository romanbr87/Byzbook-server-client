import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchData, getPost } from '../../api'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const res = getPost ('/user');
  return res;

});

const userSlice = createSlice({
  name: 'user',
  initialState: {username: '', role: '', status: ''},
  reducers: {},
  extraReducers: builder => { 
    builder.addCase (fetchUser.pending, (state) => {
        state.status = 'loading';
        state.username = '';
        state.role = '';
    })
    
    builder.addCase (fetchUser.rejected, (state, action) => {
        state.status = action; //`error: ${JSON.stringify(action, null, 2)}`;
        state.username = action.error;
        state.role = '';
    })
  
    builder.addCase (fetchUser.fulfilled, (state, action) => {
        state.status = 'ready';
        state.username = action.payload;
        state.role = 'admin';
    })

  }
});

export default userSlice.reducer;