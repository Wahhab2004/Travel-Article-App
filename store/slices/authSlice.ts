import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";

type AuthState = {
	user: User | null;
	jwt: string | null;
	isAuthenticated: boolean;
};

const initialState: AuthState = {
	user: null,
	jwt: null,
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess: (
			state,
			action: PayloadAction<{ user: User; jwt: string }>
		) => {
			state.user = action.payload.user;
			state.jwt = action.payload.jwt;
			state.isAuthenticated = true;
		},
		logout: (state) => {
			state.user = null;
			state.jwt = null;
			state.isAuthenticated = false;
		},
	},
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
