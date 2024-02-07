import type RangeDate from '../types/range-date'
import type SummaryData from '../data/summary-data'

export default class DetailRequest {
    constructor(
        public region: string,
        public streamType: string,
        public channel: string,
        public startTime: number,
        public endTime: number
    ) {}

    static Create(summaryData: SummaryData | null, rangeDate: RangeDate): DetailRequest {
        return new DetailRequest(
            summaryData?.region ? summaryData.region : '',
            summaryData?.streamType ? summaryData.streamType : '',
            summaryData?.channel ? summaryData.channel : '',
            rangeDate.start.getTime(),
            rangeDate.end.getTime()
        )
    }
}
