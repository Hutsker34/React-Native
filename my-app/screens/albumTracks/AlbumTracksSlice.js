import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  tracks: [],
  albumId: '',
  artistName: '',
  savedTracks: []
 
};

export const selectTracks = state => state.savedTracks;

export const getTrackIsFavorite = (state, itemId) => {
  return !!state.album.savedTracks.find(item => item.id === itemId);
}
  

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
    setSavedTrack: (state, action) => {
      const array = [action.payload, ...state.savedTracks]
      state.savedTracks = array
    },
    removeTrack: (state, action) => {
      const array = state.savedTracks.filter(item => item.id !== action.payload.id)
      state.savedTracks = array
    }
    
  },
    
  },
);


export const {setAlbumTracks, setAlbumId, setArtistName, setSavedTrack, removeTrack} = AlbumTracksSlice.actions;

export default AlbumTracksSlice.reducer;
