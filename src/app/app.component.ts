import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import 'chartjs-adapter-luxon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'url-shortner-app';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
