import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LoadingComponent } from './loading/loading.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { CreateShortlinkComponent } from './create-shortlink/create-shortlink.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ToolbarComponent,
    ConfirmationDialogComponent,
    LoadingComponent,
    PageLoadingComponent,
    CreateShortlinkComponent,
  ],
  imports: [CommonModule, MaterialModule, TranslateModule, ReactiveFormsModule],
  exports: [
    ToolbarComponent,
    LoadingComponent,
    PageLoadingComponent,
    CreateShortlinkComponent,
  ],
})
export class ComponentsModule {}
