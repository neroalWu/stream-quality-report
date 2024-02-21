import DetailData from '../data/detail-data'

export default class DetailResponse {
    constructor(public detail: DetailData) {}

    static ParseDetail(detailResponse: DetailResponse): DetailData {
        return DetailData.FormatCreate(detailResponse.detail)
    }
}
