import type DetailData from '../data/detail-data'

export default class VideoRequest {
    constructor(
        public region: string,
        public streamType: string,
        public resolution: string,
        public channel: string,
        public timestamp: number
    ) {}

    static Create(detailData: DetailData, timestampIndex: number): VideoRequest {
        return new VideoRequest(
            detailData.region,
            detailData.streamType,
            detailData.resolution,
            detailData.channel,
            detailData.timestamps[timestampIndex]
        )
    }
}
