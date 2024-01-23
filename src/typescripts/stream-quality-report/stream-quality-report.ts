import { REGION_TYPE } from "./region-type";
import { STREAM_PROTOCOL_TYPE } from "./stream-protocol-type";

export default class StreamQualityReport {

    private region: REGION_TYPE = REGION_TYPE.NONE;
    private streamProtocol: STREAM_PROTOCOL_TYPE = STREAM_PROTOCOL_TYPE.NONE;

    constructor () {

    }

    public SetRegion(region: REGION_TYPE): void {
        this.region = region;
    }

    public SetStreamProtocol(streamProtocol: STREAM_PROTOCOL_TYPE): void {
        this.streamProtocol = streamProtocol;
    }

}