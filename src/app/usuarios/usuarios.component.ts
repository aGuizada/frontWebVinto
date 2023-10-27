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
  editing = false;
  selectedUserId: number | null = null;
  showCreateUserForm = false; // Control para mostrar u ocultar el formulario

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
      this.showCreateUserForm = false; // Oculta el formulario después de enviar
    }
  }

  editUser(id: number) {
    this.editing = true;
    this.selectedUserId = id;
    // Load user data for editing if needed
  }

  updateUser(id: number) {
    const updatedUser = this.userForm.value;
    this.servicioService.updateUser(id, updatedUser).subscribe((data) => {
      // Handle the response or redirect to the details page
    });
    this.editing = false;
    this.selectedUserId = null;
  }

  deleteUser(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.servicioService.deleteUser(id).subscribe((data) => {
        // Handle the response or update the user list
        this.users = this.users.filter((user) => user.id !== id); // Remove the deleted user from the local list
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
