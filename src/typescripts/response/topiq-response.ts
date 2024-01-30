import type TopiqData from "../data/topiq-data";

export default class TopiqResponse {
    constructor(
        public list: TopiqData[]
    ) {}    
}