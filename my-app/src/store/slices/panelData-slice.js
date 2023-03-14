import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPost } from '../../api'

export const fetchPanelData = createAsyncThunk('panelData/fetchData', async () => {
    const response = await getPost ('/cnt');
    return response;
});

const panelDataSlice = createSlice({
  name: 'panelData',
  initialState: { data: {}, status: '' },
  reducers: {
    
    /*todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false
      })
    },
    todoToggled(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      todo.completed = !todo.completed
    }*/

  },
  extraReducers: builder => { 
    builder.addCase (fetchPanelData.pending, (state) => {
        state.status = 'loading';
        state.data = '';
    })
    
    builder.addCase (fetchPanelData.rejected, (state, action) => {
        state.status = action; //`error: ${JSON.stringify(action, null, 2)}`;
        state.data = action.error;
    })
  
    builder.addCase (fetchPanelData.fulfilled, (state, action) => {
        state.status = 'ready';
        state.data = action.payload;
    })

    }
});

export default panelDataSlice.reducer;
