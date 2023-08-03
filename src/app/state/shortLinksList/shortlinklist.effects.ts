import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, EMPTY } from 'rxjs';
import { ShortlinkService } from 'src/app/services/shortlink.service';
import { ShortLinkListActions } from './shortlinklist.actions';
import { ShortLinkApiActions } from '../shortlinkdetails/shortlinkdetails.actions';

@Injectable()
export class ShortLinkListEffects {
  constructor(
    private actions$: Actions,
    private shortLinksService: ShortlinkService
  ) {}

  listShortLinks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShortLinkListActions.list),
      exhaustMap((act) =>
        this.shortLinksService.list(act.query).pipe(
          map((links) => ShortLinkApiActions.listReceived({ list: links })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
