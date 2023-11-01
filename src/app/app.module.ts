import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { DialogAddPlayerComponent } from './dialog-add-player/dialog-add-player.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { GaameDescriptionComponent } from './gaame-description/gaame-description.component';
import {MatCardModule} from '@angular/material/card';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';



@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    GameComponent,
    PlayerComponent,
    DialogAddPlayerComponent,
    GaameDescriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp({
      "projectId":"ring-of-fire-307e7",
      "appId":"1:856287629858:web:dd9f8a5ae96ce9ae60307b",
      "storageBucket":"ring-of-fire-307e7.appspot.com",
      "apiKey":"AIzaSyCMGLxovEZioqazbIRD9iZU9hMhrrR6Yq8",
      "authDomain":"ring-of-fire-307e7.firebaseapp.com",
      "messagingSenderId":"856287629858"})),
      
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
