import { Socket } from "socket.io";


export const disconnect = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Client disconneted!');
    });
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', ( payload: {de: string, cuerpo: string } ) => {
        console.log('Mensaje Recibido', payload);

        io.emit('mensaje-nuevo', payload);
    });
}