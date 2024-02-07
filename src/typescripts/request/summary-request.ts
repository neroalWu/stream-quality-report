import type RangeDate from '../types/range-date'
import { REGION_TYPE } from '../types/region-type'
import { RESOLUTION } from '../types/resolution'
import { STREAM_TYPE } from '../types/stream-type'

export default class SummaryRequest {
    constructor(
        public region: string,
        public streamType: string,
        public resolution: string,
        public startTime: number,
        public endTime: number
    ) {}

    static Create(
        region: REGION_TYPE,
        streamType: STREAM_TYPE,
        resolution: RESOLUTION,
        rangeDate: RangeDate
    ): SummaryRequest {
        const formatRegion = region == REGION_TYPE.ALL ? '' : region
        const formatStreamType = streamType == STREAM_TYPE.ALL ? '' : streamType
        const formatResolution = resolution == RESOLUTION.ALL ? '' : resolution
        
        return new SummaryRequest(
            formatRegion,
            formatStreamType,
            formatResolution,
            rangeDate.start.getTime(),
            rangeDate.end.getTime()
        )
    }
}
