import { useEffect, useState } from 'react';


// const client = new WebSocket('ws://localhost:5000');
// connect to websocket from every page (production)
// const client = new WebSocket('wss://chat-app-socket-server.herokuapp.com/');

const client = new WebSocket('wss://chat-socket-backend.cyclic.app/');


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

