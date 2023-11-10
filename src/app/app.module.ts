import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacioComponent } from './barra-navegacio/barra-navegacio.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { InicioComponent } from './inicio/inicio.component';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './login/login.component';
import { MapsComponent } from './maps/maps.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    BarraNavegacioComponent,
    MapsComponent,
    UsuariosComponent,
    CrearUsuarioComponent,
    CreateRolComponent,
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
