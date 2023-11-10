import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  users: any[] = [];
  userForm!: FormGroup;
  editing = false;
  selectedUserId: number | null = null;
  showCreateUserForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private servicioService: ServicioService,
    private modalService: BsModalService
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
        // Puedes redirigir al usuario a la página de detalles del nuevo usuario o a otra página.
        // Por ejemplo, puedes usar el enrutador de Angular para navegar a una página diferente.
      });
      this.showCreateUserForm = false; // Oculta el formulario después de enviar
    }
  }

  editUser(id: number) {
    this.editing = true;
    this.selectedUserId = id;
    // Carga los datos del usuario para editar si es necesario
  }

  updateUser(id: number) {
    const updatedUser = this.userForm.value;
    this.servicioService.updateUser(id, updatedUser).subscribe((data) => {
      // Maneja la respuesta o redirige a la página de detalles
    });
    this.editing = false;
    this.selectedUserId = null;
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.servicioService.deleteUser(id).subscribe((data) => {
        // Maneja la respuesta o actualiza la lista de usuarios
        this.users = this.users.filter((user) => user.id !== id); // Elimina el usuario eliminado de la lista local
      });
    }
  }

  // Método para mostrar el formulario
  displayCreateUserForm() {
    this.showCreateUserForm = true;
  }

  // Método para ocultar el formulario
  closeCreateUserForm() {
    this.showCreateUserForm = false;
  }
}
