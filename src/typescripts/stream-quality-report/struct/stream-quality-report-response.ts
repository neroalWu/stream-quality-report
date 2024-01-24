import type TopiqResponse from "./topiq-response";

export default class StreamQualityReportResponse {
    public errorCode: number = 0;
    public list: TopiqResponse[] = [];

    constructor() {

    }

    
}