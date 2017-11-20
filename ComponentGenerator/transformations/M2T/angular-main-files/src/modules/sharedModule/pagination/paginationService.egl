import { Injectable }    from '@angular/core';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PaginationService {
  

  constructor() { }

  getRecordsByPage(page: number, pageSize: number, records : any[]): any[] {
      
      let recordsPaginated: any[] = [];

      let start = (page - 1) * pageSize;
      let limit = start + pageSize;

      if(limit > records.length){
        limit = records.length;
      }

      for(let i=start; i<=limit-1; i++){
          if(records[i]){
            recordsPaginated.push(records[i]);
          }
      }
      return recordsPaginated;
  }



 






}