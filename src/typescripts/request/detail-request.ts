export default class DetailRequest {
    constructor(
        public region: string,
        public streamType: string,
        public resolution: string,
        public startTime: number,
        public endTime: number
    ) {}
}