import { createActionGroup, props } from '@ngrx/store';
import { IShortLinkDetailsDto } from './shortlinkdetails.models';

export const ShortLinkActions = createActionGroup({
  source: 'ShortLink',
  events: {
    Add: props<{ endpointUrl: string }>(),
    Receive: props<{ id: string }>(),
    Update: props<{ id: string; dto: IShortLinkDetailsDto }>(),
    Delete: props<{ id: string }>(),
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
    Failed: props<{ error: string }>(),
  },
});
