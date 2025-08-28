import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { environment } from '@dog-rate-app/shared/util-environments';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  connection: HubConnection;

  build() {
    this.connection = new HubConnectionBuilder()
      .withUrl(`${environment.server}dogHub`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();
  }

  start(): Promise<void> {
    return this.connection.start();
  }

  stop(): Promise<void> {
    return this.connection.stop();
  }
}
