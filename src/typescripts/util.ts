import _ from 'lodash'

export default class Util {
    private static instance: Util | null = null
    static get Instance() {
        if (!Util.instance) {
            Util.instance = new Util()
        }
        return Util.instance
    }

    private constructor() {}

    public FormatDateHoursMinutes(timestamp: number) {
        const date = new Date(timestamp)
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${month}/${day} ${hours}:${minutes}`
    }

    public FormatYearMonthDay(timestamp: number) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day =  String(date.getDate()).padStart(2, '0')

        return `${year}/${month}/${day}`
    }

    public getMean(array: number[]) {
        return _.sum(array) / array.length;
    }

    public getStandardDeviation(array: number[]) {
        const mean = this.getMean(array);
        return Math.sqrt(_.sum(_.map(array, (i) => Math.pow((i - mean), 2))) / array.length);
    }
}
