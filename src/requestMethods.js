import axios from "axios";

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
// 	.currentUser.accessToken;

// console.log(TOKEN);

const BASE_URL = "http://localhost:8800/api";

export const publicRequest = axios.create({
	baseURL: BASE_URL,
});

export const userRequest = axios.create({
	baseURL: BASE_URL,
	// headers: { token: `Bearee ${TOKEN}` },
});
