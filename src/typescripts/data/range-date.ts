export default class RangeDate {
    constructor(
        public start: Date,
        public end: Date
    ) {}

    static Create(start?: Date, end?: Date) {
        if (!start) {
            start = new Date()
        }

        if (!end) {
            end = new Date()
        }
        
        start.setHours(0, 0, 0, 0)
        end.setHours(23, 59, 59, 999)

        return new RangeDate(start, end)
    }
}
