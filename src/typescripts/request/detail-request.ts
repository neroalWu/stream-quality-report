import type RangeDate from '../data/range-date'
import type SummaryData from '../data/summary-data'

export default class DetailRequest {
    constructor(
        public region: string,
        public streamType: string,
        public resolution: string,
        public startTime: number,
        public endTime: number
    ) {}

    static Create(summaryData: SummaryData | null, rangeDate: RangeDate): DetailRequest {
        return new DetailRequest(
            summaryData?.region ? summaryData.region : '',
            summaryData?.streamType ? summaryData.streamType : '',
            summaryData?.resolution ? summaryData.resolution : '',
            rangeDate.start.getTime(),
            rangeDate.end.getTime()
        )
    }
}
