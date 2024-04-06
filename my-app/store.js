import { configureStore } from '@reduxjs/toolkit'
import AlbumTracksSlice from './screens/albumTracks/AlbumTracksSlice'
export const store = configureStore({
  reducer: {
    album: AlbumTracksSlice
  },
})
