import axios from 'axios'
import type StreamQualityReportResponse from './stream-quality-report/struct/stream-quality-report-response'

export default class HttpService {
    private static instance: HttpService

    static get Instance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService()
        }

        return HttpService.instance
    }

    private constructor() {}

    public async GetAll(): Promise<StreamQualityReportResponse> {
        const url = `http://localhost:3000/stream-quality-report/get-all`
        const response = await axios.get(url)
        return response.data
    }

    public async GetByRegion(region: string): Promise<StreamQualityReportResponse> {
        const url = `http://localhost:3000/stream-quality-report/get-by-region?region=${region}`
        const response = await axios.get(url)
        return response.data
    }

    public async GetByStreamType(streamType: string): Promise<StreamQualityReportResponse> {
        const url = `http://localhost:3000/stream-quality-report/get-by-stream-type?type=${streamType}`
        const response = await axios.get(url)
        return response.data
    }

    public async GetByRegionAndStreamType(
        region: string,
        streamType: string
    ): Promise<StreamQualityReportResponse> {
        const url = `http://localhost:3000/stream-quality-report/get-by-region-and-stream-type?region=${region}&&type=${streamType}`
        const response = await axios.get(url)
        return response.data
    }
}
