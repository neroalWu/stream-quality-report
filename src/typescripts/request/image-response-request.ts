export class ImageResponseRequest {
    constructor(
        public region: string = '',
        public streamType: string = '',
        public channel: string = '',
        public timestamp: number = 0
    ){}
}