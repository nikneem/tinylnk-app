import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { LoadingComponent } from './loading/loading.component';
import { PageLoadingComponent } from './page-loading/page-loading.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    ConfirmationDialogComponent,
    LoadingComponent,
    PageLoadingComponent,
  ],
  imports: [CommonModule, MaterialModule, TranslateModule],
  exports: [ToolbarComponent, LoadingComponent, PageLoadingComponent],
})
export class ComponentsModule {}
