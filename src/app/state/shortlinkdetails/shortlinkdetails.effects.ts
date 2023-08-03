import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ShortlinkService } from 'src/app/services/shortlink.service';
import {
  ShortLinkActions,
  ShortLinkApiActions,
} from './shortlinkdetails.actions';

@Injectable()
export class ShortLinkDetailsEffects {
  addShortlink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShortLinkActions.add),
      exhaustMap((act) =>
        this.shortLinksService.add(act.endpointUrl).pipe(
          map((movies) => ShortLinkApiActions.added({ shortLink: movies })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  receiveShortLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShortLinkActions.receive),
      exhaustMap((act) =>
        this.shortLinksService.receive(act.id).pipe(
          map((shortLink) =>
            ShortLinkApiActions.received({ shortLink: shortLink })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  updateShortLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShortLinkActions.update),
      exhaustMap((act) =>
        this.shortLinksService.update(act.id, act.dto).pipe(
          map((shortLink) =>
            ShortLinkApiActions.updated({ shortLink: act.dto })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteShortLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShortLinkActions.delete),
      exhaustMap((act) =>
        this.shortLinksService.delete(act.id).pipe(
          map(() => ShortLinkApiActions.deleted({ id: act.id })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private shortLinksService: ShortlinkService
  ) {}
}
