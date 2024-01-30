import axios from 'axios'
import type TopiqResponse from '../response/topiq-response'
import { CONFIGURATION } from '../configuration'
import type { TopiqRequest } from '../request/topiq-request'
import type { ImageRequest } from '../request/image-request'
import type { ImageResponse } from '../response/image-response'

export default class HttpService {
    private static instance: HttpService

    static get Instance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService()
        }

        return HttpService.instance
    }

    private constructor() {}

    public async GetTopiqData(request: TopiqRequest): Promise<TopiqResponse> {
        const response = await axios.post(CONFIGURATION.API.GET_TOPIQ_DATA, request)
        return response.data
    }

    public async GetImage(request: ImageRequest): Promise<ImageResponse> {
        const response = await axios.post(CONFIGURATION.API.GET_IMAGE, request)
        return response.data
    }
}
