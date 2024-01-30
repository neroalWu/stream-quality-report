import axios from 'axios'
import type TopiqResponseList from './response/topiq-response-list'
import { CONFIGURATION } from './configuration'
import type { TopiqResponseListRequest } from './request/topiq-response-list-request'
import type { ImageResponseRequest } from './request/image-response-request'
import type { ImageResponse } from './response/image-response'

export default class HttpService {
    private static instance: HttpService

    static get Instance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService()
        }

        return HttpService.instance
    }

    private constructor() {}

    public async GetTopiqResponseList(
        request: TopiqResponseListRequest
    ): Promise<TopiqResponseList> {
        const url = `${CONFIGURATION.STREAM_QUALITY_REPORT.SERVER_URL}get-topiq-response-list`

        const response = await axios.post(url, request)
        return response.data
    }

    public async GetImageResponse(request: ImageResponseRequest): Promise<ImageResponse> {
        const url = `${CONFIGURATION.STREAM_QUALITY_REPORT.SERVER_URL}get-image-response`

        const response = await axios.post(url, request)
        return response.data
    }
}
