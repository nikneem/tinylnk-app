import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinksRoutingModule } from './links-routing.module';
import { LinksOverviewPageComponent } from './links-overview-page/links-overview-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { LinksDetailsDialogComponent } from './links-details-dialog/links-details-dialog.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [LinksOverviewPageComponent, LinksDetailsDialogComponent],
  imports: [
    CommonModule,
    LinksRoutingModule,
    SharedModule,
    TranslateModule,
    QRCodeModule,
  ],
})
export class LinksModule {}
