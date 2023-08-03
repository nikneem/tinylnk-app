import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ShortlinkService } from 'src/app/services/shortlink.service';
import { IAppState } from 'src/app/state/app.state';
import { ShortLinkActions } from 'src/app/state/shortlinkdetails/shortlinkdetails.actions';
import { IShortLinkDetailsDto } from 'src/app/state/shortlinkdetails/shortlinkdetails.models';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  public urlForm: FormGroup;
  public shortLinkDetails?: IShortLinkDetailsDto;
  private shortLinkDetailsChanged?: Subscription;

  constructor(public auth: AuthService, private store: Store<IAppState>) {
    this.urlForm = new FormGroup({
      url: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '(?<Protocol>(http|https)+):\\/\\/(?<Domain>[\\w@][\\w.:@]+)\\/?[\\w\\.?=%&=\\-@/$,]*'
        ),
      ]),
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }
  logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }

  createShortLink() {
    console.log(this.urlForm.controls['url'].value);
    if (this.urlForm.valid) {
      this.store.dispatch(
        ShortLinkActions.add({
          endpointUrl: this.urlForm.controls['url'].value,
        })
      );
    }
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      console.log(isAuthenticated);
      if (isAuthenticated) {
        this.auth.getAccessTokenSilently().subscribe((token) => {
          console.log(token);
        });
      }
    });
    this.shortLinkDetailsChanged = this.store
      .select((str) => str.shortLinkDetails)
      .subscribe((shortLinkDetails) => {
        if (shortLinkDetails?.state === 'added') {
          this.shortLinkDetails = shortLinkDetails.shortLink;
          if (this.urlForm) {
            this.urlForm.patchValue({ url: '' });
          }
        }
      });
  }
}
