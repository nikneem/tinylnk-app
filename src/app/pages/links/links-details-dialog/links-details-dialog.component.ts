import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import {
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
} from 'rxjs';
import { ShortlinkService } from 'src/app/services/shortlink.service';
import { IAppState } from 'src/app/state/app.state';
import { ShortLinkActions } from 'src/app/state/shortlinkdetails/shortlinkdetails.actions';
import { IShortLinkDetailsDto } from 'src/app/state/shortlinkdetails/shortlinkdetails.models';
import { Chart, registerables } from 'chart.js';

export interface IShortLinkDetailsDialogData {
  id: string;
}

@Component({
  selector: 'app-links-details-dialog',
  templateUrl: './links-details-dialog.component.html',
  styleUrls: ['./links-details-dialog.component.scss'],
})
export class LinksDetailsDialogComponent implements OnInit {
  private linkDetailsChangedSubscription?: Subscription;
  public linkDetails?: IShortLinkDetailsDto;
  private id?: string;
  isLoading: boolean = false;
  public qrCodeDownloadLink: SafeUrl = '';

  shortLinkDetailsForm?: FormGroup;
  public chart: any;

  private chartData: Array<string> = [];
  private chartLabels: Array<string> = [];

  constructor(
    private store: Store<IAppState>,
    private dialogRef: MatDialogRef<LinksDetailsDialogComponent>,
    private shortLinkService: ShortlinkService
  ) {}

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  private constructForm(): void {
    if (this.linkDetails && this.id !== this.linkDetails.id) {
      this.shortLinkDetailsForm = new FormGroup({
        id: new FormControl(this.linkDetails.id, [Validators.required]),
        shortCode: new FormControl(
          this.linkDetails.shortCode,
          [Validators.required],
          [this.uniqueCardAccountValidatorFn()]
        ),
        endpointUrl: new FormControl(this.linkDetails.endpointUrl, [
          Validators.required,
        ]),
        expiresOn: new FormControl(this.linkDetails.expiresOn),
      });

      this.id = this.linkDetails.id;
    }
  }

  uniqueCardAccountValidatorFn(): AsyncValidatorFn {
    return (control) =>
      control.valueChanges.pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((value) => {
          const idControlValue = control.parent?.get('id')?.value ?? '';
          return this.shortLinkService.isUnique(idControlValue, value);
        }),
        map(() => null),
        catchError(() => of({ codeNotUnique: true }))
      ); // important to make observable finite
  }

  save(): void {
    if (
      this.linkDetails &&
      this.shortLinkDetailsForm &&
      !this.shortLinkDetailsForm.invalid
    ) {
      let shortLinkDetails: IShortLinkDetailsDto =
        this.shortLinkDetailsForm.value;
      this.store.dispatch(
        ShortLinkActions.update({
          id: this.linkDetails?.id,
          dto: shortLinkDetails,
        })
      );
    }
  }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.linkDetailsChangedSubscription = this.store
      .select((str) => str.shortLinkDetails)
      .subscribe((state) => {
        this.linkDetails = state.shortLink;
        this.isLoading = state.isLoading;
        if (this.chartData && this.chartLabels) {
          if (this.chart) {
            this.chart.destroy();
          }
          this.chartData = state.chartData;
          this.chartLabels = state.chartLabels;
          this.chart = new Chart('MyChart', {
            type: 'line', //this denotes tha type of chart

            data: {
              // values on X-Axis
              labels: this.chartLabels,
              datasets: [
                {
                  label: 'Hits',
                  data: this.chartData,
                  backgroundColor: 'yellow',
                },
              ],
            },
            options: {
              aspectRatio: 5,
            },
          });
        }
        this.constructForm();
        if (this.linkDetails) {
          this.store.dispatch(
            ShortLinkActions.history({ id: this.linkDetails?.id })
          );
        }
        if (state.state == 'updated') {
          this.dialogRef.close();
        }
        this.chart.update();
      });
  }

  ngOnDestroy(): void {
    if (this.linkDetailsChangedSubscription) {
      this.linkDetailsChangedSubscription.unsubscribe();
    }
  }
}
