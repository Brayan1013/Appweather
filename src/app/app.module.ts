import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ClimaComponent } from './components/clima/clima.component';
import { ClimaService } from './services/clima.service';
import {HttpClientModule} from '@angular/common/http';
import { ComentariosComponent } from './components/comentarios/comentarios.component';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ComentariosService } from './services/comentarios.service';

//servicio

//google

import {AgmCoreModule} from '@agm/core';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClimaComponent,
    ComentariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, 
    AngularFireStorageModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
  ],
  providers: [
    ClimaService,
    ComentariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
