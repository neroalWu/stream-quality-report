export default class SummaryData {
    constructor(
        public region: string,
        public streamType: string,
        public channel: string,
        public resolution: string,

        public nr_m: number,
        public nr_sd: number,

        public flive_m: number,
        public flive_sd: number,

        public spaq_m: number,
        public spaq_sd: number
    ) {}

    static FormatCreate(summaryData: SummaryData): SummaryData {
        const format = (num: number, digits: number): number => {
            return num && Number(num.toFixed(digits))
        }

        return new SummaryData(
            summaryData.region,
            summaryData.streamType,
            summaryData.channel,
            summaryData.resolution,
            format(summaryData.nr_m, 6),
            format(summaryData.nr_sd, 6),
            format(summaryData.flive_m, 6),
            format(summaryData.flive_sd, 6),
            format(summaryData.spaq_m, 6),
            format(summaryData.spaq_sd, 6)
        )
    }
}
