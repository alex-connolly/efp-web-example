import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {EditorService} from "./services/editor.s";

@Component({
	selector: 'efp',
	templateUrl: 'app/app.c.html',
	styleUrls: ['app/app.c.css'],
	providers: [EditorService]
})

export class AppComponent implements OnInit {

    ngOnInit(){
        console.log("started app comp");
    }
}
