export default class DetailData {
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
        public spaq_sd: number | null,

        public nrs: number[],
        public flives: number[],
        public spaqs: number[],

        public timestamps: number[]
    ) {}

    static FormatCreate(detailData: DetailData): DetailData {
        const format = (num: number | null, digits: number): number | null => {
            if (num != null) {
                return Number(num.toFixed(digits))
            }

            return null
        }

        return new DetailData(
            detailData.region,
            detailData.streamType,
            detailData.channel,
            detailData.resolution,
            format(detailData.nr_m, 3),
            format(detailData.nr_sd, 3),
            format(detailData.flive_m, 3),
            format(detailData.flive_sd, 3),
            format(detailData.spaq_m, 3),
            format(detailData.spaq_sd, 3),
            detailData.nrs,
            detailData.flives,
            detailData.spaqs,
            detailData.timestamps
        )
    }
}
