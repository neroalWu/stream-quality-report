import axios from 'axios'

import { CONFIGURATION } from '../configuration'

import type SummaryResponse from '../response/summary-response'
import type SummaryRequest from '../request/summary-request'
import type DetailRequest from '../request/detail-request'
import type DetailResponse from '../response/detail-response'

export default class HttpService {
    private static instance: HttpService

    static get Instance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService()
        }

        return HttpService.instance
    }

    private constructor() {}

    public async GetSummary(request: SummaryRequest): Promise<SummaryResponse> {
        const response = await axios.post(CONFIGURATION.API.GET_SUMMARY, request)
        return response.data
    }

    public async GetDetails(request: DetailRequest): Promise<DetailResponse> {
        const response = await axios.post(CONFIGURATION.API.GET_DETAILS, request)

        return response.data
    }
}
