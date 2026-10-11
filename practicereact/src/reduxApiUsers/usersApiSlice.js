import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk(
  'apiUsers/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')

      if (!response.ok) {
        return rejectWithValue('Unable to fetch users from the API.')
      }

      return response.json()
    } catch (error) {
      return rejectWithValue(error.message || 'Something went wrong.')
    }
  },
)

const initialState = {
  users: [],
  status: 'idle',
  loading: false,
  error: null,
}

const usersApiSlice = createSlice({
  name: 'apiUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'success'
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'error'
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export default usersApiSlice.reducer
