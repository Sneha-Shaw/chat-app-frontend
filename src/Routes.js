import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ChatScreen from './pages/ChatScreen/ChatScreen'

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Navigate to={"/login"} />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/chat" element={<ChatScreen />} />
                <Route exact path="/chat/:id" element={<ChatScreen />} />
            </Routes>
        </BrowserRouter>

    )
}

export default Router