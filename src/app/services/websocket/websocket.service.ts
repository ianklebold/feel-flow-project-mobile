import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';


const API_VERSION = environment.v1;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: any;
  private notificationSubject: Subject<any> = new Subject<any>();

  constructor() { }

  connect(teamUUID:string) {
    // const socket = new SockJS(`${environment.url}ws`); // Cambia <tu-servidor> por la URL de tu backend
    const socket = new SockJS(`${environment.url}ws`);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: string) => {
      console.log('Conectado: ' + frame);
      this.stompClient.subscribe(`/topic/${teamUUID}`, (notification: { body: string; }) => {
        this.notificationSubject.next(JSON.parse(notification.body));
      });
    });
  }

  getNotifications() {
    return this.notificationSubject.asObservable();
  }

}
