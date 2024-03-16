import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  tracks: ''
 
};

export const AlbumTracksSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getAlbumTracks: (state, action) => {
      state.tracks = action.payload
    },
    
  },
    
  },
);

export const {getAlbumTracks} = AlbumTracksSlice.actions;

export default AlbumTracksSlice.reducer;
