import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-loading',
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.scss'],
})
export class PageLoadingComponent {
  @Input() show: boolean = false;
}
