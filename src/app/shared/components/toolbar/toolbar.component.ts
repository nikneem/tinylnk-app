import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CreateShortlinkComponent } from '../create-shortlink/create-shortlink.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private shortLinkDetailsChanged?: Subscription;
  private dialogRef?: MatDialogRef<CreateShortlinkComponent>;

  constructor(
    public auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private store: Store<IAppState>
  ) {}
  createNew() {
    this.dialogRef = this.dialog.open(CreateShortlinkComponent, {
      minWidth: '500px',
      width: '80%',
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }
  logout() {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }
  toLinks() {
    this.router.navigate(['/links']);
  }
  ngOnInit(): void {
    this.shortLinkDetailsChanged = this.store
      .select((str) => str.shortLinkDetails)
      .subscribe((shortLinkDetails) => {
        if (shortLinkDetails?.state === 'added') {
          if (this.dialogRef) {
            this.dialogRef.close();
          }
        }
      });
  }
  ngOnDestroy(): void {
    if (this.shortLinkDetailsChanged) {
      this.shortLinkDetailsChanged.unsubscribe();
    }
  }
}
