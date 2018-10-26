import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../../environments/environment';

const NODE_API_BASE_URL = environment.node_api_base_url;

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: any;
  constructor() { }

  connect(): Rx.Subject<MessageEvent> {
    this.socket = io(NODE_API_BASE_URL);
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: (data: any) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    };

    return Rx.Subject.create(observer, observable);
  }
}
