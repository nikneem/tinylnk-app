import { shortLinksApiReducer } from './shortLinksList/shortlinklist.reducer';
import {
  IShortLinkListState,
  initialShortLinksListState,
} from './shortLinksList/shortlinklist.state';
import { shortLinksReducer } from './shortlinkdetails/shortlinkdetails.reducer';
import {
  IShortLinkDetailsState,
  initialShortLinkDetailsState,
} from './shortlinkdetails/shortlinkdetails.state';

export interface IAppState {
  shortLinkDetails: IShortLinkDetailsState;
  shortLinkList: IShortLinkListState;
}

export const INITIAL_APPSTATE: IAppState = {
  shortLinkDetails: initialShortLinkDetailsState,
  shortLinkList: initialShortLinksListState,
};

export const reducers = {
  shortLinkDetails: shortLinksReducer,
  shortLinkList: shortLinksApiReducer,
};
