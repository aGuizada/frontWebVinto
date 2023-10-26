import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarraNavegacioComponent } from './barra-navegacio/barra-navegacio.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { MapsComponent } from './maps/maps.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'barra-navegacion', component: BarraNavegacioComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'usuarios', component: UsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
