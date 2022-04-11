import { configureStore, createSlice } from "@reduxjs/toolkit";

const MapNavSlice = createSlice({
  name: "MapNavSlice",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggle(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

const CategorySlice = createSlice({
  name: "CategorySlice",
  initialState: {
    canoeingIsSelected: true,
    bikingIsSelected: true,
    hikingIsSelected: true,
  },
  reducers: {
    toggleCanoeing(state) {
      state.canoeingIsSelected = !state.canoeingIsSelected;
    },
    toggleBiking(state) {
      state.bikingIsSelected = !state.bikingIsSelected;
    },
    toggleHiking(state) {
      state.hikingIsSelected = !state.hikingIsSelected;
    },
  },
});
const store = configureStore({
  reducer: {
    MapNavSlice: MapNavSlice.reducer,
    CategorySlice: CategorySlice.reducer,
  },
});

export const MapNavActions = MapNavSlice.actions;
export const CategoryActions = CategorySlice.actions;

export default store;
