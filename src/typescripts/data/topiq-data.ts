export default class TopiqData {
   public _id: string = '';
   
   public region: string = '';
   public streamType: string = '';
   public channel: string = '';
   public resolution: string = '';

   public nr_list: number[] = [];
   public nr_flive_list: number[] = [];
   public nr_spaq_list: number[] = [];

   public timestamp_list: number[] = [];

   constructor() {

   }
}