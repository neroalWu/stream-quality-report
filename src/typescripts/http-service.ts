import axios from "axios";
import type StreamQualityReportResponse from "./stream-quality-report/struct/response";

export default class HttpService {
    private static instance: HttpService;

    static get Instance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService()
        }

        return HttpService.instance
    }

    private constructor() {}

    public async GetAll(): Promise<StreamQualityReportResponse> {
        const response = await axios.get('http://localhost:3000/stream-quality-report/get-all')
        return response.data;
    }
}