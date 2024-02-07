import RangeDate from '../types/range-date'
import type SummaryData from '../data/summary-data'
import { REGION_TYPE } from '../types/region-type';
import { RESOLUTION } from '../types/resolution';
import { STREAM_TYPE } from '../types/stream-type';

export default class Store {
    private static instance: Store | null = null

    public selectedRegion: REGION_TYPE = REGION_TYPE.ALL
    public selectedStreamType: STREAM_TYPE = STREAM_TYPE.ALL
    public selectedResolution: RESOLUTION = RESOLUTION.ALL

    public selectedSummary: SummaryData | null = null;
    public selectedRangeDate: RangeDate = RangeDate.Create()

    private constructor() {}

    static get Instance(): Store {
        if (!Store.instance) {
            Store.instance = new Store()
        }
        return Store.instance
    }
}
