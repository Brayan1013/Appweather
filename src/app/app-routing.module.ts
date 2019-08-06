import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClimaComponent } from './components/clima/clima.component';
import { HomeComponent } from './components/home/home.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'resultados/:ciudad', component:ClimaComponent},
  {path: 'comentarios', component: ComentariosComponent},
  {path: '', redirectTo:'/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
