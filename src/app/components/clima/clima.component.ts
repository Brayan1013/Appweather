import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../services/clima.service';
import {ActivatedRoute} from '@angular/router';
import { error } from 'util';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {

  clima = {};
  climaForecast:any[] = [];
  sunset: any;
  ciudad: string;
  bandera:boolean = false;
  mostrarMas:boolean = false;
  error: boolean = false;
  urlImagen: string = "http://openweathermap.org/img/w/";


  constructor(private _climaservicio: ClimaService, private _route: ActivatedRoute) { 
    this._route.params.subscribe(ciudad => this.ciudad = ciudad['ciudad']);
    this._climaservicio.getLalitutudLongitud(this.ciudad);
    setTimeout(() => {
      this.getClima();
    }, 3000);
  }

  ngOnInit() {
  }

  getClima(){
    this._climaservicio.getClimaByCiudad().subscribe(data => {
      this.clima = data; 
      this.sunset = new Date(data.sys.sunset * 1000);
      this.urlImagen = `${this.urlImagen}${this.clima['weather'][0].icon}.png`
      this.bandera = true;
      console.log(this.clima);
      
    }, error => {
      console.log("Lo sentimos la ciudad que agregaste por el momento no se encuentra en la base de datos", error);
      this.error = true;
    });
  }

  getClimaforecast(){
    this._climaservicio.getClimaAllByCiudad().subscribe(data => {
      this.climaForecast = data.list;
      this.mostrarMas = true;
    });
    
  }




}
