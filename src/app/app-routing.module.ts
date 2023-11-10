import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MapsComponent } from './maps/maps.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'login', // Ruta específica para el componente de inicio de sesión
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      { path: 'maps', component: MapsComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'rol', component: CreateRolComponent },
      // Agrega más rutas según tus necesidades
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
