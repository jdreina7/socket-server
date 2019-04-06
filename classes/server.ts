import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as mySockect from '../sockets/sockets';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.listenSockets();
    }

    // Singleton para asegurarnos de que vamos a tener una sola instancia del servidor en ejecucion
    public static get instance() {
        return this._instance || ( this._instance = new this() );
    };

    private listenSockets() {
        console.log('Listening sockets..');

        this.io.on('connection', cliente => {
            console.log('New client conected!');

            // cliente.on('disconnect', () => {
            //     console.log('Client leave or disconnect!');
            // });

            mySockect.disconnect( cliente );

            // Mensaje
            mySockect.mensaje( cliente, this.io );

        });
    }

    start( callback: Function ) {
        //this.app.listen( this.port, callback );
        this.httpServer.listen( this.port );
    }

}