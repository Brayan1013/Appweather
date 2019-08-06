import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ClimaService } from '../../services/clima.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ciudad:string = '';
  climaActual:any = {};
  climaFuturo:any[] = [];
  bandera1:boolean = false;
  bandera2:boolean = false;
  climaPromedioDia: number;
  climaPromedioTarde: number;

  banderaDia:string;
  banderaTarde:string;




  latitud: number;
  longitud: number;

  constructor(private _router: Router, private clima:ClimaService) {
    setTimeout(() => {
      
      clima.getClima(this.latitud, this.longitud).subscribe(data => {
        this.climaActual = data
        this.bandera1 = true
      });

      clima.getAllClima(this.latitud, this.longitud).subscribe(data => {
        this.climaFuturo = data['list'];
        console.log(this.climaFuturo);
        this.bandera2 = true;
      });
    }, 3000);
    
   }
  ngOnInit() {

    this.getLatitudLongitud();

  }


  buscarCiudda(forma:any){
    let ciudadName:string;
    console.log(forma.value.ciudad);
    ciudadName = forma.value.ciudad;
    this.ciudad = '';

    this._router.navigate(['/resultados', ciudadName]);
  }

  getLatitudLongitud(){
    this.latitud = null;
    this.longitud = null;
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;
      });
    }
  }

  suegerencias(){
    let dia = [];
    let tarde = [];
    let horas = [];
    for (let index = 0; index < this.climaFuturo.length; index++) {
      if(this.climaFuturo[index].dt_txt.split(" ")[1] >= "09:00:00" && this.climaFuturo[index].dt_txt.split(" ")[1] <= "12:00:00"){
        dia.push(this.climaFuturo[index].main['temp']);
      }else if(this.climaFuturo[index].dt_txt.split(" ")[1] >= "15:00:00" && this.climaFuturo[index].dt_txt.split(" ")[1] <= "18:00:00"){
        tarde.push(this.climaFuturo[index].main['temp']);
      }
    }

    if(dia.length != 0){
      let suma = dia.reduce((previous, current) => current+= previous);
      this.climaPromedioDia = suma / dia.length;
      console.log(this.climaPromedioDia);
      var prueba = -20;
     
       if(this.climaPromedioDia < 20 && this.climaPromedioDia > 10){
         this.banderaDia = "templado";
       } else if(this.climaPromedioDia > 20){
         this.banderaDia = "calido";
       }else if(this.climaPromedioDia > 1 && this.climaPromedioDia < 10){
         this.banderaDia = "frio";
       }else{
         this.banderaDia = "frio extremo";
       }
      
      
    }

    if(tarde.length != 0){
      let suma = tarde.reduce((previous, current) => current+= previous);
      this.climaPromedioTarde= suma / tarde.length;
      console.log(this.climaPromedioTarde);

      if(this.climaPromedioTarde < 20 && this.climaPromedioTarde > 10){
        this.banderaTarde = "templado";
      } else if(this.climaPromedioTarde > 20){
        this.banderaTarde = "calido";
      }else if(this.climaPromedioTarde > 1 && this.climaPromedioTarde < 10){
        this.banderaTarde = "frio";
      }else{
        this.banderaTarde = "frio extremo";
      }
      
    }
    
  }





}
