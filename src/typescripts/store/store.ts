import RangeDate from '../data/range-date'
import type SummaryData from '../data/summary-data'

export default class Store {
    private static instance: Store | null = null

    public selectedSummary: SummaryData | null = null;
    public selectedRangeDate: RangeDate = new RangeDate(new Date(), new Date())

    private constructor() {}

    static get Instance(): Store {
        if (!Store.instance) {
            Store.instance = new Store()
        }
        return Store.instance
    }
}
