import { createFeature, createReducer, on } from '@ngrx/store';

import {
  ShortLinkActions,
  ShortLinkApiActions,
} from './shortlinkdetails.actions';
import { initialShortLinkDetailsState } from './shortlinkdetails.state';

export const shortLinksReducer = createReducer(
  initialShortLinkDetailsState,
  on(ShortLinkActions.receive, (state, { id }) => ({
    ...state,
    isLoading: true,
    shortLink: undefined,
    state: 'receiving',
  })),
  on(ShortLinkActions.add, (state, { endpointUrl }) => ({
    ...state,
    isLoading: true,
    state: 'adding',
  })),
  on(ShortLinkActions.update, (state, { id, dto }) => ({
    ...state,
    isLoading: true,
    state: 'updating',
  })),
  on(ShortLinkApiActions.added, (state, { shortLink }) => ({
    ...state,
    isLoading: false,
    shortLink: shortLink,
    state: 'added',
  })),
  on(ShortLinkApiActions.received, (state, { shortLink }) => ({
    ...state,
    isLoading: false,
    shortLink: shortLink,
  })),
  on(ShortLinkApiActions.updated, (state, { shortLink }) => ({
    ...state,
    isLoading: false,
    shortLink: shortLink,
    state: 'updated',
  }))
);
