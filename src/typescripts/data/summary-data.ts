export default class SummaryData {
    constructor(
        public region: string,
        public streamType: string,
        public channel: string,
        public resolution: string,

        public nr_m: number | null,
        public nr_sd: number | null,

        public flive_m: number | null,
        public flive_sd: number | null,

        public spaq_m: number | null,
        public spaq_sd: number | null
    ) {}

    static FormatCreate(summaryData: SummaryData): SummaryData {
        const format = (num: number | null, digits: number): number | null => {
            if (num != null) {
                return Number(num.toFixed(digits))
            }

            return null
        }

        return new SummaryData(
            summaryData.region,
            summaryData.streamType,
            summaryData.channel,
            summaryData.resolution,
            format(summaryData.nr_m, 3),
            format(summaryData.nr_sd, 3),
            format(summaryData.flive_m, 3),
            format(summaryData.flive_sd, 3),
            format(summaryData.spaq_m, 3),
            format(summaryData.spaq_sd, 3)
        )
    }
}
