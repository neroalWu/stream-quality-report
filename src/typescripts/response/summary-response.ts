import type SummaryData from "../data/summary-data";

export default class SummaryResponse {
    constructor(
        public summarys: SummaryData[]
    ) {}
}