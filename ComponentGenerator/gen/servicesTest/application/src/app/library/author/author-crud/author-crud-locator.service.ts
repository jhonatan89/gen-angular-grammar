import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams, Response } from '@angular/http';
import { ServiceMainLocator } from '../../../service-locator-main';
import { CREATEAUTHOR, UPDATEAUTHOR, GETAUTHOR, SEARCHAUTHORS, SEARCHNUMAUTHORS, DELETEAUTHOR, BASE_URL } from './urlService'

@Injectable()
export class LocatorAuthorCrudService {
	
	constructor(private serviceLocator: ServiceMainLocator){}
	
	    getUrlList(): string{
	        return this.getHost() + BASE_URL + SEARCHAUTHORS;
	    }        

	    getUrlCreate(): string{
return this.getHost() + BASE_URL + CREATEAUTHOR;
	    }

	    getUrlUpdate(): string{
return this.getHost() + BASE_URL + UPDATEAUTHOR;
	    }
    
	    getUrlGetItem(): string{
return this.getHost() + BASE_URL + GETAUTHOR;
	    }
    

	    getUrlListNum(): string{
return this.getHost() + BASE_URL + SEARCHNUMAUTHORS;
	    }
	
	    getUrlDeleteItem(): string{
return this.getHost() + BASE_URL + DELETEAUTHOR;
	    }

	    public getHost(): string{
	        let host = this.serviceLocator.getHost();
	        return host;
	    }


}