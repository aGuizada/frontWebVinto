import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ServicioService } from '../service/servicio.service';

@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css'],
})
export class CreateRolComponent {
  rolForm!: FormGroup; // Agregar el signo de exclamación para indicar que se inicializará
  mensaje: string | null = null;
  modalRef!: BsModalRef; // Agregar el signo de exclamación para indicar que se inicializará
  template!: TemplateRef<any>; // Agregar el signo de exclamación para indicar que se inicializará
  roles: any[] = []; // Inicializar el array

  constructor(
    private formBuilder: FormBuilder,
    private servicioService: ServicioService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.rolForm = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  getRoles() {
    this.servicioService.getRoles().subscribe(
      (data) => {
        this.roles = data;
        console.log('Roles obtenidos con éxito', this.roles);
      },
      (error) => {
        console.error('Error al obtener los roles', error);
      }
    );
  }
  deleteRol(id: number) {
    this.servicioService.deleteRol(id).subscribe(
      (response) => {
        this.mensaje = 'Rol eliminado con éxito';
        this.openModal();
        this.getRoles(); // Actualizar la lista de roles después de eliminar uno
        console.log('Rol eliminado con éxito', response);
      },
      (error) => {
        this.mensaje = 'Error al eliminar el rol';
        this.openModal();
        console.error('Error al eliminar el rol', error);
      }
    );
  }

  onSubmit() {
    if (this.rolForm.valid) {
      const nombre = this.rolForm.value.nombre;
      this.servicioService.createRol(nombre).subscribe(
        (response) => {
          this.mensaje = 'Rol creado con éxito';
          this.openModal();
          console.log('Rol creado con éxito', response);
        },
        (error) => {
          this.mensaje = 'Error al crear el rol';
          this.openModal();
          console.error('Error al crear el rol', error);
        }
      );
    }
  }

  openModal() {
    if (this.template) {
      this.modalRef = this.modalService.show(
        this.template,
        Object.assign({}, { class: 'modal-sm' })
      );
    }
  }
}
