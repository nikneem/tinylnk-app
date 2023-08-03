import { IShortLinkDetailsDto } from '../shortlinkdetails/shortlinkdetails.models';

export interface IShortLinkListState {
  shortLinks?: Array<IShortLinkDetailsDto>;
  isLoading: boolean;
  errorMessage?: string;
}

export const initialShortLinksListState: IShortLinkListState = {
  isLoading: false,
};
