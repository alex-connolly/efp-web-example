"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var editor_s_1 = require("../services/editor.s");
var DemoComponent = (function () {
    function DemoComponent(_editorService) {
        this._editorService = _editorService;
        this.hasResponse = false;
    }
    DemoComponent.prototype.getVErrors = function () {
        if (!this.response) {
            return null;
        }
        return this.response.v_errs;
    };
    DemoComponent.prototype.getPErrors = function () {
        if (!this.response) {
            return null;
        }
        return this.response.p_errs;
    };
    DemoComponent.prototype.doValidation = function () {
        var _this = this;
        if (this.validate == undefined && this.prototype == undefined) {
            return;
        }
        var req = new editor_s_1.Request(this.prototype, this.validate);
        console.log(this.prototype);
        this._editorService.validate(req).subscribe(function (e) {
            _this.response = e.json();
            _this.hasResponse = true;
        });
    };
    DemoComponent = __decorate([
        core_1.Component({
            selector: 'demo',
            styleUrls: ['app/demo/demo.c.css'],
            templateUrl: 'app/demo/demo.c.html',
        }), 
        __metadata('design:paramtypes', [editor_s_1.EditorService])
    ], DemoComponent);
    return DemoComponent;
}());
exports.DemoComponent = DemoComponent;
//# sourceMappingURL=demo.c.js.map