import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ShortLinkListActions } from 'src/app/state/shortLinksList/shortlinklist.actions';
import { ShortLinkActions } from 'src/app/state/shortlinkdetails/shortlinkdetails.actions';
import { IShortLinkDetailsDto } from 'src/app/state/shortlinkdetails/shortlinkdetails.models';
import { LinksDetailsDialogComponent } from '../links-details-dialog/links-details-dialog.component';

@Component({
  selector: 'app-links-overview-page',
  templateUrl: './links-overview-page.component.html',
  styleUrls: ['./links-overview-page.component.scss'],
})
export class LinksOverviewPageComponent implements OnInit {
  public dataSource: Array<IShortLinkDetailsDto>;
  isLoading: boolean = false;
  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.dataSource = [];
  }

  public deleteLink(id: string): void {
    this.dialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result.result === 'ok') {
          this.store.dispatch(ShortLinkActions.delete({ id }));
        }
      });
  }
  public openDetailsDialog(row: IShortLinkDetailsDto) {
    this.store.dispatch(ShortLinkActions.receive({ id: row.id }));
    this.dialog.open(LinksDetailsDialogComponent);
  }
  ngOnInit(): void {
    this.store.dispatch(ShortLinkListActions.list({ query: '' }));

    this.store.select('shortLinkList').subscribe((state) => {
      this.dataSource = state.shortLinks ?? [];
      this.isLoading = state.isLoading;
    });
  }
}
