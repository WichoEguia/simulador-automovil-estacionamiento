import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  socketConectado: boolean = false;

  constructor(
    public io: Socket
  ) {
    this.verificaStatus();
  }

  /**
   * Revisa el status de la conexión
   * del servidor de sockets
   */
  verificaStatus() {
    this.io.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketConectado = true;
    });

    this.io.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketConectado = false;
    });
  }

  /**
   * Emite un evento al servidor
   *
   * @param evento Nombre del evento
   * @param payload Informacion que se envia
   * @param callback Funcion que se ejecuta al ralizar el evento
   */
  emit(evento: string, payload?: any, callback?: Function) {
    console.log(`Emitiendo evento ${evento}`);
    this.io.emit(evento, payload, callback);
  }

  /**
   * Escucha un evento que proviene del servidor
   *
   * @param evento Nombre del evento
   */
  listen(evento: string) {
    return this.io.fromEvent(evento);
  }
}
