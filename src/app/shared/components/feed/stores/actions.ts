import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GetFeedResponseInterface } from "../types/GetFeedResponse.interface";

export const feedAction = createActionGroup({
    source: 'feed',
    events: {
        GetFeed: props<{url: string}>(),
        GetFeedSuccess: props<{feed: GetFeedResponseInterface}>(),
        GetFeedFailure: emptyProps()
    }
})