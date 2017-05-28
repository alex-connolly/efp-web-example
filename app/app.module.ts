import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import './rxjs-extensions';
import { AppComponent } from './app.c';
import { routing, routedComponents } from './app.routing';
import {EditorService} from "./services/editor.s";

import {AceEditorComponent} from "ng2-ace-editor/src/component";

//export const addedComponents = [];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule,
    JsonpModule,
  ],
  declarations: [ AppComponent, routedComponents, /*addedComponents,*/ AceEditorComponent],
  providers: [ EditorService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
