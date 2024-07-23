import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GetPopularTagsResponseInterface } from "../types/GetPopularTags.interface";
import { PopularTagType } from "../../../types/popularTag.type";

export const popularTagsAction = createActionGroup({
    source: 'PopularTags',
    events: {
        GetPopularTags: emptyProps(),
        GetPopularTagsSuccess: props<{popularTags: PopularTagType[]}>(),
        GetPopularTagsFailure: emptyProps()
    }
})