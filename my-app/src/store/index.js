import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user-slice';
import panelData from './slices/panelData-slice';

export const store = configureStore({
    reducer: {
      user, panelData
    }
  })
  
  