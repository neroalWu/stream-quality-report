import TopiqData from '../data/topiq-data'

export default class Store {
    private static instance: Store | null = null

    public selectedTopiq: TopiqData = new TopiqData()

    private constructor() {}

    static get Instance(): Store {
        if (!Store.instance) {
            Store.instance = new Store()
        }
        return Store.instance
    }
}
