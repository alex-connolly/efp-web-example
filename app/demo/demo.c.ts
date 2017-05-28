import {Component} from "@angular/core";
import {EditorService, Response, Request} from "../services/editor.s";


@Component({
    selector: 'demo',
    styleUrls: ['app/demo/demo.c.css'],
    templateUrl: 'app/demo/demo.c.html',
})

export class DemoComponent {

    prototype : string;
    validate : string;
    response : Response;
    hasResponse = false;

    constructor(private _editorService: EditorService) {}

    getVErrors(){
        if (!this.response) {
            return null;
        }
        return this.response.v_errs;
    }

    getPErrors(){
        if (!this.response) {
            return null;
        }
        return this.response.p_errs;
    }

    doValidation(){
        if (this.validate == undefined && this.prototype == undefined){
            return;
        }
        var req = new Request(this.prototype, this.validate);
        console.log(this.prototype);
        this._editorService.validate(req).subscribe(e => {
            this.response = e.json();
            this.hasResponse = true;
        });
    }

}
