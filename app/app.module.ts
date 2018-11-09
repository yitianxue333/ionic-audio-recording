import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AppComponent } from "./app.component";

import { RouterExtensions,Routes} from "./app.routing";

import { SIDEDRAWER_DIRECTIVES} from "nativescript-telerik-ui/sidedrawer/angular";

import { DrawerComponent } from "./shared/drawer/drawer.component";

@NgModule({
  declarations: [AppComponent,...RouterExtensions,SIDEDRAWER_DIRECTIVES,DrawerComponent],
  bootstrap: [AppComponent],
  imports: [NativeScriptModule,
  NativeScriptRouterModule,
  NativeScriptRouterModule.forRoot(Routes)],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
