import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
  substitute: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.titleTranslationKey = data.title;
    this.messageTranslationKey = data.message;
    this.substitute = data.substitute;
  }

  @Input() titleTranslationKey: string = 'dialog.confirmation.title';
  @Input() messageTranslationKey: string = 'dialog.confirmation.message';
  @Input() substitute: string = '';
}
