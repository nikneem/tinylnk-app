import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminTemplateModule } from './admin-template/admin-template.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    AdminTemplateModule,
    ComponentsModule,
  ],
  exports: [
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
    AdminTemplateModule,
    ComponentsModule,
  ],
})
export class SharedModule {}
