import io from 'socket.io-client';
import { Notyf } from 'notyf';
import { API_URL } from '@/env'

const socket = io(API_URL);

const notyf = new Notyf({
    duration: 2500,
    position: {
        x: 'center',
        y: 'top',
    }
});

const audio = new Audio('/sounds/notify-open.wav');
audio.volume = 0.4

socket.on('notify:success',  async (message: string) => {
    notyf.success(message);
    await audio.play()
});

socket.on('notify:error', async (message: string) => {
    console.log("error", message)
    notyf.error(message);
    await audio.play()
});

export { socket, notyf };
