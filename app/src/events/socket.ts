import io from 'socket.io-client';
import { Notyf } from 'notyf';
import { API_URL } from '@/env'
import axios from 'axios'
import { notify } from '@/plugins/notyf'

const socket = io(API_URL);

const audio = new Audio('/sounds/notify-open.wav');
audio.volume = 0.4

socket.on('connect', () => {
    axios.defaults.headers.common['socketId'] = socket.id
})

socket.on('notify:success',  async (message: string) => {
    notify.success(message);
    await audio.play()
});

socket.on('notify:error', async (message: string) => {
    console.log("error", message)
    notify.error(message);
    await audio.play()
});

export { socket, notify };
