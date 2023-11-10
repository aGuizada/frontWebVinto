import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navigation/navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
@NgModule({
  declarations: [LayoutComponent, NavbarComponent],
  imports: [CommonModule, RouterModule],
})
export class LayoutModule {}
