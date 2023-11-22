import { IShortLinkDetailsDto } from './shortlinkdetails.models';

export interface IShortLinkDetailsState {
  shortLink?: IShortLinkDetailsDto;
  isLoading: boolean;
  errorMessage?: string;
  state: string;
  chartData: Array<string>;
  chartLabels: Array<string>;
}

export const initialShortLinkDetailsState: IShortLinkDetailsState = {
  isLoading: false,
  state: 'initial',
  chartData: [],
  chartLabels: [],
};
