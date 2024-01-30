import type TopiqData from "../data/topiq-data";
import Util from "../util";

export default class TopiqResponse {
    constructor(
        public list: TopiqData[]
    ) {}

    public GetLastDateTime() {
        if (this.list.length == 0 ) return;

        if (this.list[0].timestamp_list.length == 0) return;

        return Util.Instance.FormatYearMonthDay(this.list[0].timestamp_list[0])
    }
}