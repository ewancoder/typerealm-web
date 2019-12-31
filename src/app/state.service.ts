import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { State } from './state.model';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class StateService {
  readonly state$: Observable<State>;

  constructor(private socket: Socket) {
    this.state$ = this.socket.fromEvent<State>('state');
  }

  authorize(clientId: string): void {
    this.socket.on('connect', () => {
      this.socket.emit('auth', clientId);
    });
  }

  enterRoad(roadId: number): void {
    this.socket.emit('enterRoad', roadId);
  }

  enterLocation(locationId: number): void {
    this.socket.emit('enterLocation', locationId);
  }

  move(distance: number): void {
    this.socket.emit('move', distance);
  }

  turnAround(): void {
    this.socket.emit('turnAround');
  }
}
