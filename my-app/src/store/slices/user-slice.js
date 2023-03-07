import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPost } from '../../ContextAPI'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
    const response = await getPost ('/user');
    return response.username;
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
        state.status = `error: ${JSON.stringify(action, null, 2)}`;
        state.username = '';
        state.role = '';
    })
  
    builder.addCase (fetchUser.fulfilled, (state, action) => {
        console.log (action);
        state.status = 'ready';
        state.username = action.payload;
        state.role = 'admin';
    })

  }
});

const getSelectedData = selector => (dispatch, getState) => {
  return selector(getState())
}

export default userSlice.reducer;
