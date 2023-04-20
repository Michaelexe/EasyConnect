import {io} from 'socket.io-client';

// const url = 'http://192.168.0.31:3000';
// const url = 'http://192.168.2.38:3000';
// const url = 'http://localhost:3000';
const url = 'https://eas-tf48.onrender.com';

export const socket = io(url, {autoConnect: false});
