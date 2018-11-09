"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var drawer_component_1 = require("./shared/drawer/drawer.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent].concat(app_routing_1.RouterExtensions, [angular_1.SIDEDRAWER_DIRECTIVES, drawer_component_1.DrawerComponent]),
            bootstrap: [app_component_1.AppComponent],
            imports: [nativescript_module_1.NativeScriptModule,
                router_1.NativeScriptRouterModule,
                router_1.NativeScriptRouterModule.forRoot(app_routing_1.Routes)],
            schemas: [core_1.NO_ERRORS_SCHEMA],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLHNEQUF1RTtBQUV2RSxpREFBK0M7QUFFL0MsNkNBQXVEO0FBRXZELHNFQUFrRjtBQUVsRixxRUFBbUU7QUFVbkU7SUFBQTtJQUF3QixDQUFDO0lBQVosU0FBUztRQVJyQixlQUFRLENBQUM7WUFDUixZQUFZLEdBQUcsNEJBQVksU0FBSSw4QkFBZ0IsR0FBQywrQkFBcUIsRUFBQyxrQ0FBZSxFQUFDO1lBQ3RGLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7WUFDekIsT0FBTyxFQUFFLENBQUMsd0NBQWtCO2dCQUM1QixpQ0FBd0I7Z0JBQ3hCLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxvQkFBTSxDQUFDLENBQUM7WUFDekMsT0FBTyxFQUFFLENBQUMsdUJBQWdCLENBQUM7U0FDNUIsQ0FBQztPQUNXLFNBQVMsQ0FBRztJQUFELGdCQUFDO0NBQUEsQUFBekIsSUFBeUI7QUFBWiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcblxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyxSb3V0ZXN9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5cbmltcG9ydCB7IFNJREVEUkFXRVJfRElSRUNUSVZFU30gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xuXG5pbXBvcnQgeyBEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9zaGFyZWQvZHJhd2VyL2RyYXdlci5jb21wb25lbnRcIjtcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQXBwQ29tcG9uZW50LC4uLlJvdXRlckV4dGVuc2lvbnMsU0lERURSQVdFUl9ESVJFQ1RJVkVTLERyYXdlckNvbXBvbmVudF0sXG4gIGJvb3RzdHJhcDogW0FwcENvbXBvbmVudF0sXG4gIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRNb2R1bGUsXG4gIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcbiAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLmZvclJvb3QoUm91dGVzKV0sXG4gIHNjaGVtYXM6IFtOT19FUlJPUlNfU0NIRU1BXSxcbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG4iXX0=