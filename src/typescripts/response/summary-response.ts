import SummaryData from '../data/summary-data'

export default class SummaryResponse {
    constructor(public summarys: SummaryData[]) {}

    static Create(): SummaryResponse {
        return new SummaryResponse([])
    }

    static Parse(summaryResponse: SummaryResponse): SummaryResponse {
        summaryResponse.summarys = summaryResponse.summarys.map((summary: SummaryData) => SummaryData.FormatCreate(summary))

        return summaryResponse
    }
}
