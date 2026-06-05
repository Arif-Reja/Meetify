import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}/api/v1/users`
});

export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);

    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {

            const request = await client.post("/register", {
                name,
                username,
                password
            });

            console.log("REGISTER RESPONSE =", request.data);

            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }

        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const handleLogin = async (username, password) => {
        try {

            const request = await client.post("/login", {
                username,
                password
            });

            console.log("LOGIN RESPONSE =", request.data);

            if (request.status === httpStatus.OK) {

                localStorage.setItem(
                    "token",
                    request.data.token
                );

                console.log(
                    "TOKEN SAVED =",
                    localStorage.getItem("token")
                );

                setUserData(request.data.user);

                router("/home");

                return request.data;
            }

        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const getHistoryOfUser = async () => {
        try {

            const token = localStorage.getItem("token");

            console.log("TOKEN =", token);

            const request = await client.get(
                "/get_all_activity",
                {
                    params: {
                        token
                    }
                }
            );

            console.log(
                "HISTORY API RESPONSE =",
                request.data
            );

            

            if (request.data?.meetings) {
                return request.data.meetings;
            }

           

            if (Array.isArray(request.data)) {
                return request.data;
            }

            return [];

        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const addToUserHistory = async (meetingCode) => {
        try {

            const request = await client.post(
                "/add_to_activity",
                {
                    token: localStorage.getItem("token"),
                    meeting_code: meetingCode
                }
            );

            console.log(
                "ADD HISTORY RESPONSE =",
                request.data
            );

            return request.data;

        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const data = {
        userData,
        setUserData,
        addToUserHistory,
        getHistoryOfUser,
        handleRegister,
        handleLogin
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};