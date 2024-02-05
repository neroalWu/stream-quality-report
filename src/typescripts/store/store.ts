import RangeDate from '../data/range-date'
import TopiqData from '../data/topiq-data'

export default class Store {
    private static instance: Store | null = null

    public selectedTopiq: TopiqData = new TopiqData()
    public selectedRangeDate: RangeDate = new RangeDate(new Date(), new Date())

    private constructor() {}

    static get Instance(): Store {
        if (!Store.instance) {
            Store.instance = new Store()
        }
        return Store.instance
    }
}
