import type DetailData from '../data/detail-data'

export default class DetailResponse {
    constructor(public details: DetailData[]) {}
}