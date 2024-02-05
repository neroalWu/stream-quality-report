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
        public spaq_sd: number,
    ) {}
} 