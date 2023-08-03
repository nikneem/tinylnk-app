import { createReducer, on } from '@ngrx/store';
import {
  IShortLinkListState,
  initialShortLinksListState,
} from './shortlinklist.state';
import {
  ShortLinkActions,
  ShortLinkApiActions,
} from '../shortlinkdetails/shortlinkdetails.actions';
import { ShortLinkListActions } from './shortlinklist.actions';
import { IShortLinkDetailsDto } from '../shortlinkdetails/shortlinkdetails.models';

export const shortLinksApiReducer = createReducer(
  initialShortLinksListState,
  on(ShortLinkListActions.list, (state, { query }) => ({
    ...state,
    isLoading: true,
  })),
  on(ShortLinkApiActions.listReceived, (state, { list }) => ({
    ...state,
    isLoading: false,
    shortLinks: list,
  })),
  on(ShortLinkApiActions.updated, (state, { shortLink }) =>
    shortLinkUpdatedHandler(state, shortLink)
  )
);

function shortLinkUpdatedHandler(
  state: IShortLinkListState,
  payload: IShortLinkDetailsDto
): IShortLinkListState {
  const copyState: IShortLinkListState = Object.assign({}, state);
  if (copyState.shortLinks) {
    let shortLinkList = copyState.shortLinks
      ? new Array<IShortLinkDetailsDto>(...copyState.shortLinks)
      : new Array<IShortLinkDetailsDto>();

    const newListItem: IShortLinkDetailsDto = {
      id: payload.id,
      shortCode: payload.shortCode,
      endpointUrl: payload.endpointUrl,
      createdOn: payload.createdOn,
      expiresOn: payload.expiresOn,
    };
    const pollIndex = shortLinkList.findIndex((p) => p.id == payload.id);
    if (pollIndex >= 0) {
      shortLinkList.splice(pollIndex, 1, newListItem);
    } else {
      shortLinkList.push(newListItem);
    }
    copyState.shortLinks = shortLinkList;
  }
  return copyState;
}
