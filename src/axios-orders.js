import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-chat-app-4dbb1.firebaseio.com/'
});

export default instance;