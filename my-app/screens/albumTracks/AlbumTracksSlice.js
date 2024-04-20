import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  tracks: [],
  albumId: '',
  artistName: '',
  savedTracks: []
 
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
    setArtistName: (state, action) => {
      state.artistName = action.payload
    },
    setSavedTracks: (state, action) => {
      state.savedTracks = action.payload
    }
    
  },
    
  },
);

export const {setAlbumTracks, setAlbumId, setArtistName, setSavedTracks} = AlbumTracksSlice.actions;

export default AlbumTracksSlice.reducer;
