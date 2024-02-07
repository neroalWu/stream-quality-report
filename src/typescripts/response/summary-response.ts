import SummaryData from '../data/summary-data'

export default class SummaryResponse {
    constructor(public summarys: SummaryData[]) {}

    static Create(): SummaryResponse {
        return new SummaryResponse([])
    }

    static ParseSummarys(summaryResponse: SummaryResponse): SummaryData[] {
        return summaryResponse.summarys.map((summary: SummaryData) =>
            SummaryData.FormatCreate(summary)
        )
    }
}
