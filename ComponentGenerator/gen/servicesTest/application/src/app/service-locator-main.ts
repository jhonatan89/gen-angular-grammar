import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams, Response } from '@angular/http';


@Injectable()
export class ServiceMainLocator {

    public getHost(): string{
        let host = window.location.origin;
        return host;
    }




}