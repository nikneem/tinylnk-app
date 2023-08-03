import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTemplatePageComponent } from './admin-template-page/admin-template-page.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [AdminTemplatePageComponent],
  imports: [CommonModule, MaterialModule, ComponentsModule, RouterModule],
  exports: [AdminTemplatePageComponent],
})
export class AdminTemplateModule {}
