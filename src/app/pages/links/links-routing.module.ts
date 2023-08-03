import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTemplatePageComponent } from 'src/app/shared/admin-template/admin-template-page/admin-template-page.component';
import { LinksOverviewPageComponent } from './links-overview-page/links-overview-page.component';
import { AuthGuard } from '@auth0/auth0-angular';

const routes: Routes = [
  {
    path: 'links',
    component: AdminTemplatePageComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: LinksOverviewPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinksRoutingModule {}
