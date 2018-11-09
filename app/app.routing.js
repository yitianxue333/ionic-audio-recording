"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recording_component_1 = require("./pages/recording/recording.component");
var listening_component_1 = require("./pages/listening/listening.component");
var file_list_component_1 = require("./pages/file-list/file-list.component");
exports.Routes = [
    { path: "", component: recording_component_1.RecordingComponent },
    { path: "app-listening", component: listening_component_1.ListeningComponent },
    { path: "app-file-list", component: file_list_component_1.FileListComponent }
];
exports.RouterExtensions = [
    recording_component_1.RecordingComponent,
    listening_component_1.ListeningComponent,
    file_list_component_1.FileListComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZFQUEyRTtBQUMzRSw2RUFBMkU7QUFDM0UsNkVBQTBFO0FBRTdELFFBQUEsTUFBTSxHQUFFO0lBQ2pCLEVBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUMsd0NBQWtCLEVBQUM7SUFDdEMsRUFBQyxJQUFJLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyx3Q0FBa0IsRUFBQztJQUNuRCxFQUFDLElBQUksRUFBQyxlQUFlLEVBQUMsU0FBUyxFQUFDLHVDQUFpQixFQUFDO0NBQ3JELENBQUE7QUFFWSxRQUFBLGdCQUFnQixHQUFDO0lBQzFCLHdDQUFrQjtJQUNsQix3Q0FBa0I7SUFDbEIsdUNBQWlCO0NBQ3BCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWNvcmRpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9yZWNvcmRpbmcvcmVjb3JkaW5nLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBMaXN0ZW5pbmdDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9saXN0ZW5pbmcvbGlzdGVuaW5nLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaWxlTGlzdENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2ZpbGUtbGlzdC9maWxlLWxpc3QuY29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgY29uc3QgUm91dGVzID1bXHJcbiAgICB7cGF0aDpcIlwiLGNvbXBvbmVudDpSZWNvcmRpbmdDb21wb25lbnR9LFxyXG4gICAge3BhdGg6XCJhcHAtbGlzdGVuaW5nXCIsY29tcG9uZW50Okxpc3RlbmluZ0NvbXBvbmVudH0sXHJcbiAgICB7cGF0aDpcImFwcC1maWxlLWxpc3RcIixjb21wb25lbnQ6RmlsZUxpc3RDb21wb25lbnR9XHJcbl1cclxuXHJcbmV4cG9ydCBjb25zdCBSb3V0ZXJFeHRlbnNpb25zPVtcclxuICAgIFJlY29yZGluZ0NvbXBvbmVudCxcclxuICAgIExpc3RlbmluZ0NvbXBvbmVudCxcclxuICAgIEZpbGVMaXN0Q29tcG9uZW50XHJcbl0iXX0=