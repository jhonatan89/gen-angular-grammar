import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams, Response } from '@angular/http';
import { ServiceMainLocator } from '../../../service-locator-main';


@Injectable()
export class LocatorBookCrudService {
	
	constructor(private serviceLocator: ServiceMainLocator){}
	
	    getUrlList(): string{
	        return 'assets/mocks-helpers/bookcrud.json';
	    }


    
    

	



}