import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const API = process.env.REACT_APP_API_HOST;

const client = new W3CWebSocket(`${API}`);

const SocketConnection = (userInfo) => {

    const [connected, setConnected] = useState(false)
    const [userId, setUserId] = useState('')

    useEffect(() => {

        // connect to websocket from every page
        client.onopen = () => {
            console.log('WebSocket Client Connected');
            setConnected(true)
        };

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer.type === "userId") {
                setUserId(dataFromServer.userId)
            }

        }

    });

    // send user on connection
    const sendUser = () => {
        const userObject = {
            type: "user",
            id: userInfo._id,
            name: userInfo.name,
        }
        client.send(JSON.stringify(userObject))
    }

    useEffect(() => {
        if (connected) {
            sendUser()
        }
    }, [connected])

    // set userId in local storage
    useEffect(() => {
        if (userId) {
            localStorage.setItem('userId', userId)
        }
    }, [userId])



    return {
        client
    }
}

export default SocketConnection;

