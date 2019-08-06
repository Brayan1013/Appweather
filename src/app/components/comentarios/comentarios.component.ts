import { Component, OnInit } from '@angular/core';
import { ComentariosService } from '../../services/comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  comentarios: any[] = [];
  nuevoComentario:string="";
  constructor(public _comentarioService: ComentariosService) { 

    _comentarioService.getComentarios().subscribe(data=>{
      console.log(data);
      
      this.comentarios = data;
      
    })
  }

  ngOnInit() {
  }

  comentarioNuevo(forma:any){
    this._comentarioService.addComentarios(forma.value.nuevoComentario);
    this.nuevoComentario = "";
  }

  login(){
    this._comentarioService.login();
  }

  logout(){
    this._comentarioService.logout();
  }

}
