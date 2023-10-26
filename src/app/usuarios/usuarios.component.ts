import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  users: any[] = [];
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servicioService: ServicioService
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      numero_telefono: ['', Validators.required],
      ubicacion_latitud: [null],
      ubicacion_longitud: [null],
      disponible: [null],
      rol_id: ['', Validators.required],
    });

    // Load existing users
    this.servicioService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;
      this.servicioService.createUser(newUser).subscribe((response) => {
        console.log('Usuario creado con éxito', response);
        // You can redirect the user to the details page of the new user or another page.
        // For example, you can use the Angular Router to navigate to a different page.
      });
    }
  }

  editUser(id: number) {
    this.servicioService.getUserById(id).subscribe((data) => {
      // Carga los datos del usuario para editarlos
    });
  }

  updateUser(id: number) {
    const updatedUser = this.userForm.value;
    this.servicioService.updateUser(id, updatedUser).subscribe((data) => {
      // Maneja la respuesta o redirige a la página de detalles
    });
  }

  deleteUser(id: number) {
    this.servicioService.deleteUser(id).subscribe((data) => {
      // Actualiza la lista de usuarios o maneja la respuesta
    });
  }
}
