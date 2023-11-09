import { createActionGroup, props } from '@ngrx/store';
import {
  IHitsHistoryDto,
  IShortLinkDetailsDto,
} from './shortlinkdetails.models';

export const ShortLinkActions = createActionGroup({
  source: 'ShortLink',
  events: {
    Add: props<{ endpointUrl: string }>(),
    Receive: props<{ id: string }>(),
    Update: props<{ id: string; dto: IShortLinkDetailsDto }>(),
    Delete: props<{ id: string }>(),
    History: props<{ id: string; startDate?: Date }>(),
  },
});
export const ShortLinkApiActions = createActionGroup({
  source: 'ShortLinkApi',
  events: {
    ListReceived: props<{ list: Array<IShortLinkDetailsDto> }>(),
    Added: props<{ shortLink: IShortLinkDetailsDto }>(),
    Received: props<{ shortLink: IShortLinkDetailsDto }>(),
    Updated: props<{ shortLink: IShortLinkDetailsDto }>(),
    Deleted: props<{ id: string }>(),
    HistoryReceived: props<{ hits: Array<IHitsHistoryDto> }>(),
    Failed: props<{ error: string }>(),
  },
});
