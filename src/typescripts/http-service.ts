import axios from 'axios'
import type StreamQualityReportResponse from './stream-quality-report/struct/stream-quality-report-response'
import { CONFIGURATION } from './configuration'

export default class HttpService {
    private static instance: HttpService

    static get Instance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService()
        }

        return HttpService.instance
    }

    private constructor() {}

    public async GetStreamQualityReportResponse(region: string = '', streamType: string = '', bitrateType: string = ''): Promise<StreamQualityReportResponse> {
        let url = `${CONFIGURATION.STREAM_QUALITY_REPORT.SERVER_URL}get-stream-quality-report-response?`
        const queryString: string[] = [
            `region=${region}&&`,
            `streamType=${streamType}&&`,
            `bitrateType=${bitrateType}`
        ]
        url = url.concat(...queryString)

        const response = await axios.get(url)
        return response.data
    }
}
