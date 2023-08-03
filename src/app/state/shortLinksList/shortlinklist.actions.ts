import { createActionGroup, props } from '@ngrx/store';

export const ShortLinkListActions = createActionGroup({
  source: 'ShortLinkList',
  events: {
    List: props<{ query?: string }>(),
  },
});
