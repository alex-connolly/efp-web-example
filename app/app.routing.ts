import { Routes, RouterModule} from '@angular/router';
import {DemoComponent} from "./demo/demo.c";

const appRoutes: Routes = [
	{ path: '', component: DemoComponent},
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [
	DemoComponent
];
