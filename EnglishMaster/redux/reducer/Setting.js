import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    soundEffect: false,
    vibrationSensor: false,
    animationEffect: false,
};

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        toggleSoundEffect: (state) => {
            state.soundEffect = !state.soundEffect;
        },
        toggleVibrationSensor: (state) => {
            state.vibrationSensor = !state.vibrationSensor;
        },
        toggleAnimationEffect: (state) => {
            state.animationEffect = !state.animationEffect;
        },
        setSoundEffect: (state, action) => {
            state.soundEffect = action.payload;
        },
        setVibrationSensor: (state, action) => {
            state.vibrationSensor = action.payload;
        },
        setAnimationEffect: (state, action) => {
            state.animationEffect = action.payload;
        },
    }
});

export const {
    toggleSoundEffect,
    toggleVibrationSensor,
    toggleAnimationEffect,
    setSoundEffect,
    setVibrationSensor,
    setAnimationEffect
} = settingSlice.actions;

export default settingSlice;
