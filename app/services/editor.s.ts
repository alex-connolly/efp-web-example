import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";

export class Request {

    prototype : string;
    validate : string;

    constructor(prototype : string, validate : string){
        this.prototype = prototype;
        this.validate = validate;
    }
}

export class Response {
    p_errs : Array<string>;
    v_errs : Array<string>;
}

@Injectable()
export class EditorService {

    constructor(private _http: Http) {}


    validate(request: Request){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '**')
        headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        let options = new RequestOptions({ headers: headers });
		return this._http.put('/api/validate', JSON.stringify(request), options);
    }

}
