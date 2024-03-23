import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  tracks: '',
  albumId: ''
 
};

export const AlbumTracksSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setAlbumTracks: (state, action) => {
      state.tracks = action.payload
    },
    setAlbumId: (state, action) => {
      state.albumId = action.payload
    },
    
  },
    
  },
);

export const {setAlbumTracks, setAlbumId} = AlbumTracksSlice.actions;

export default AlbumTracksSlice.reducer;
