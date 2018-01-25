import { Component } from '@angular/core';
import { HubConnection} from '@aspnet/signalr-client';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { isContext } from 'vm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private hubConnection: HubConnection;
  tweets: Tweet[] = [];

  lat =  14.6091;
  lng =  121.0223;
  isConnected = false;
 constructor() {}
  ngOnInit(): void {
    this.hubConnection = new HubConnection('http://localhost:50917/chat');
    this.hubConnection
      .start()
      .then(() =>  this.isConnected = true)
      .catch(err => this.isConnected = false);
      this.hubConnection.on('sendToAll', (receivedMessage: Tweet) => {
    console.log(receivedMessage);
    receivedMessage.isCheck = true;
       this.tweets.push(receivedMessage);
      });
  }
  mapClicked($event: MouseEvent) {
  console.log(
    {
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    }
  );

  }

}


interface Tweet {
  lat: number;
  lng: number;
  title: string;
  isCheck: boolean;
  url: string;
}
