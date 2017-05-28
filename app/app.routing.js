"use strict";
var router_1 = require('@angular/router');
var demo_c_1 = require("./demo/demo.c");
var appRoutes = [
    { path: '', component: demo_c_1.DemoComponent },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [
    demo_c_1.DemoComponent
];
//# sourceMappingURL=app.routing.js.map