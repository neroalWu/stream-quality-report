export default class TopiqResponse {
   public _id: string = '';
   
   public region: string = '';
   public type: string = '';
   public channel: string = '';

   public nr_list: number[] = [];
   public nr_flive_list: number[] = [];
   public nr_spqa_list: number[] = [];

   public timestamp_list: number[] = [];

   constructor() {

   }
}