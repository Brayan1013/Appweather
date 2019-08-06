import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  urlLatitudLongitud = "https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=";
  urlClima = "https://api.openweathermap.org/data/2.5/";
  metrics = "&units=metric";
  private latitud: number;
  private longitud: number;
  private appid: string = "695a468a896767a9b3d82da032fd59b5";
  //weather?lat=20.049999&lon=-99.339996
  constructor(private http:HttpClient) { }

  getLalitutudLongitud(ciudad:string){
    var headers = new HttpHeaders({
      'X-RapidAPI-Host': 'devru-latitude-longitude-find-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '6b418fb061msh045cf47b72f7042p1ca4f4jsnc5f0babb793d'
    });

    this.latitud = undefined;
    this.longitud = undefined;
    this.http.get(`${this.urlLatitudLongitud}${ciudad}`, {headers})
    .subscribe(data => {

      if(data['Results'].length === 0){
        return "";
      }
      this.latitud = data['Results'][0].lat;
      this.longitud = data['Results'][0].lon;     
    });
  }

  getClima(latitud:number, longitud:number){
    return this.http.get(`${this.urlClima}weather?lat=${latitud}&lon=${longitud}&appid=${this.appid}${this.metrics}`);
  }

  getAllClima(latitud:number, longitud:number){
    return this.http.get(`${this.urlClima}forecast?lat=${latitud}&lon=${longitud}&cnt=6&appid=${this.appid}${this.metrics}`);
  }

  getClimaByCiudad():Observable<any>{
    return this.http.get(`${this.urlClima}weather?lat=${this.latitud}&lon=${this.longitud}&appid=${this.appid}${this.metrics}`);
  }

  getClimaAllByCiudad():Observable<any>{
    return this.http.get(`${this.urlClima}forecast?lat=${this.latitud}&lon=${this.longitud}&cnt=10&appid=${this.appid}${this.metrics}`);
  }



}
