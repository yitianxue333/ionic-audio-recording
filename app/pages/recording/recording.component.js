"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var dialogs = require("tns-core-modules/ui/dialogs");
var file_system_1 = require("tns-core-modules/file-system");
var platform = require("tns-core-modules/platform");
var app = require("tns-core-modules/application");
var nativescript_audio_1 = require("nativescript-audio");
var router_1 = require("nativescript-angular/router");
var RecordingComponent = /** @class */ (function () {
    function RecordingComponent(_page, _routEx) {
        this._page = _page;
        this._routEx = _routEx;
        this.audioMeter = "0";
        this.isVisible = false;
        this.image = "~/images/menu.png";
        this._recorder = new nativescript_audio_1.TNSRecorder();
        this._recorder.debug = true; // set true for tns_recorder logs
    }
    RecordingComponent.prototype.ngOnInit = function () {
        this.drawer = this.drawerComponent.sideDrawer;
    };
    RecordingComponent.prototype.mostrarMenu = function () {
        if (this.isVisible === false) {
            this.drawer.showDrawer();
            this.isVisible = true;
        }
        else {
            this.drawer.closeDrawer();
            this.isVisible = false;
        }
        //this.ocultarBarra();
    };
    RecordingComponent.prototype.onMenuTapped = function (value) {
        //Toast.makeText(value + " menu item selected").show();
        this.drawer.closeDrawer();
    };
    RecordingComponent.prototype.mostrarBarra = function () {
        this._page.actionBarHidden = false;
    };
    RecordingComponent.prototype.ocultarBarra = function () {
        this._page.actionBarHidden = true;
    };
    RecordingComponent.prototype.togglePlay = function () {
        if (this._player.isAudioPlaying()) {
            this._player.pause();
        }
        else {
            this._player.play();
        }
    };
    RecordingComponent.prototype.startRecord = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var audioFolder, androidFormat, androidEncoder, recordingPath, recorderOptions, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!nativescript_audio_1.TNSRecorder.CAN_RECORD()) {
                            dialogs.alert("This device cannot record audio.");
                            return [2 /*return*/];
                        }
                        audioFolder = file_system_1.knownFolders.currentApp().getFolder("audio");
                        console.log(JSON.stringify(audioFolder));
                        androidFormat = void 0;
                        androidEncoder = void 0;
                        if (platform.isAndroid) {
                            // m4a
                            // static constants are not available, using raw values here
                            // androidFormat = android.media.MediaRecorder.OutputFormat.MPEG_4;
                            androidFormat = 2;
                            // androidEncoder = android.media.MediaRecorder.AudioEncoder.AAC;
                            androidEncoder = 3;
                        }
                        recordingPath = audioFolder.path + "/recording." + this.platformExtension();
                        recorderOptions = {
                            filename: recordingPath,
                            format: androidFormat,
                            encoder: androidEncoder,
                            metering: true,
                            infoCallback: function (infoObject) {
                                console.log(JSON.stringify(infoObject));
                            },
                            errorCallback: function (errorObject) {
                                console.log(JSON.stringify(errorObject));
                            }
                        };
                        return [4 /*yield*/, this._recorder.start(recorderOptions)];
                    case 1:
                        _a.sent();
                        this.isRecording = true;
                        if (recorderOptions.metering) {
                            this._initMeter();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.isRecording = false;
                        this._resetMeter();
                        dialogs.alert(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RecordingComponent.prototype.stopRecord = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._resetMeter();
                        return [4 /*yield*/, this._recorder.stop().catch(function (ex) {
                                console.log(ex);
                                _this.isRecording = false;
                                _this._resetMeter();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RecordingComponent.prototype._initMeter = function () {
        var _this = this;
        this._resetMeter();
        this._meterInterval = setInterval(function () {
            _this.audioMeter = _this._recorder.getMeters();
            console.log(_this.audioMeter);
        }, 300);
    };
    RecordingComponent.prototype._resetMeter = function () {
        if (this._meterInterval) {
            this.audioMeter = "0";
            clearInterval(this._meterInterval);
            this._meterInterval = undefined;
        }
    };
    RecordingComponent.prototype.platformExtension = function () {
        // 'mp3'
        return "" + (app.android ? "m4a" : "caf");
    };
    RecordingComponent.prototype.listen = function () {
        this._routEx.navigate(['app-listening']);
    };
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], RecordingComponent.prototype, "drawerComponent", void 0);
    RecordingComponent = __decorate([
        core_1.Component({
            selector: 'recording',
            templateUrl: './pages/recording/recording.component.html',
            styleUrls: ['./pages/recording/recording.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.RouterExtensions])
    ], RecordingComponent);
    return RecordingComponent;
}());
exports.RecordingComponent = RecordingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlY29yZGluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0Qsc0RBQXFEO0FBQ3JELHNFQUFvRztBQUVwRywwREFBMEQ7QUFDMUQsNENBQTRDO0FBQzVDLDhDQUE4QztBQUM5QyxtREFBbUQ7QUFFbkQscURBQXVEO0FBQ3ZELDREQUFrRTtBQUNsRSxvREFBc0Q7QUFDdEQsa0RBQW9EO0FBQ3BELHlEQUs4QjtBQUM5QixzREFBK0Q7QUFRL0Q7SUFNQyw0QkFBb0IsS0FBVSxFQUFTLE9BQXdCO1FBQTNDLFVBQUssR0FBTCxLQUFLLENBQUs7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUR4RCxlQUFVLEdBQUcsR0FBRyxDQUFDO1FBUXhCLGNBQVMsR0FBVyxLQUFLLENBQUM7UUFDMUIsVUFBSyxHQUFDLG1CQUFtQixDQUFDO1FBUHpCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxnQ0FBVyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsaUNBQWlDO0lBQy9ELENBQUM7SUFTRSxxQ0FBUSxHQUFSO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztJQUUvQyxDQUFDO0lBRVMsd0NBQVcsR0FBbEI7UUFFQSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxDQUFBLENBQUM7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQUEsSUFBSSxDQUFBLENBQUM7WUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFT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bElBO1FBREYsZ0JBQVMsQ0FBQyxnQ0FBc0IsQ0FBQztrQ0FDUCxnQ0FBc0I7K0RBQUM7SUFoQnRDLGtCQUFrQjtRQU45QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLDRDQUE0QztZQUN6RCxTQUFTLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztTQUN4RCxDQUFDO3lDQVF5QixXQUFJLEVBQWlCLHlCQUFnQjtPQU5uRCxrQkFBa0IsQ0FzSjlCO0lBQUQseUJBQUM7Q0FBQSxBQXRKRCxJQXNKQztBQXRKWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgU2lkZURyYXdlclR5cGUsIFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyL2FuZ3VsYXInO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gJ25hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXInO1xuLy9pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuLy9pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbi8vaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbi8vaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IGtub3duRm9sZGVycywgRmlsZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XG5pbXBvcnQge1xuXHRUTlNSZWNvcmRlcixcblx0VE5TUGxheWVyLFxuXHRBdWRpb1BsYXllck9wdGlvbnMsXG5cdEF1ZGlvUmVjb3JkZXJPcHRpb25zXG4gIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hdWRpb1wiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3JlY29yZGluZycsXG5cdHRlbXBsYXRlVXJsOiAnLi9wYWdlcy9yZWNvcmRpbmcvcmVjb3JkaW5nLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcGFnZXMvcmVjb3JkaW5nL3JlY29yZGluZy5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBSZWNvcmRpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRwcml2YXRlIF9wbGF5ZXI6IFROU1BsYXllcjtcblx0cHJpdmF0ZSBfcmVjb3JkZXI7XG5cdHB1YmxpYyBpc1JlY29yZGluZzogYm9vbGVhbjtcblx0cHJpdmF0ZSBfbWV0ZXJJbnRlcnZhbDogYW55O1xuXHRwdWJsaWMgYXVkaW9NZXRlciA9IFwiMFwiO1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOlBhZ2UscHJpdmF0ZSBfcm91dEV4OlJvdXRlckV4dGVuc2lvbnMpIHtcblx0XHR0aGlzLl9yZWNvcmRlciA9IG5ldyBUTlNSZWNvcmRlcigpO1xuXHRcdHRoaXMuX3JlY29yZGVyLmRlYnVnID0gdHJ1ZTsgLy8gc2V0IHRydWUgZm9yIHRuc19yZWNvcmRlciBsb2dzXG5cdH1cblx0XG5cdHByaXZhdGUgZHJhd2VyOiBTaWRlRHJhd2VyVHlwZTtcblx0aXNEcmF3ZXJPcGVuZWQ7XG5cdGlzVmlzaWJsZTpCb29sZWFuID0gZmFsc2U7XG5cdGltYWdlPVwifi9pbWFnZXMvbWVudS5wbmdcIjtcblx0QFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KVxuICAgIHB1YmxpYyBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG5cbiAgICBuZ09uSW5pdCgpe1xuXHQgIHRoaXMuZHJhd2VyPXRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XG5cdCBcbn1cblxuICAgcHVibGljIG1vc3RyYXJNZW51KCl7XG5cblx0ICBpZih0aGlzLmlzVmlzaWJsZSA9PT0gZmFsc2Upe1xuXHRcdHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcblx0XHR0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG5cdCAgfWVsc2V7XG5cdFx0dGhpcy5kcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcblx0XHR0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuXHQgIH1cblxuXHQgIFxuXHQgIC8vdGhpcy5vY3VsdGFyQmFycmEoKTtcblx0fVxuXG4gICAgcHVibGljIG9uTWVudVRhcHBlZCh2YWx1ZTogYW55KSB7XG4gICAgICAgIC8vVG9hc3QubWFrZVRleHQodmFsdWUgKyBcIiBtZW51IGl0ZW0gc2VsZWN0ZWRcIikuc2hvdygpO1xuICAgICAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xuXHR9XG5cdFxuXHRwdWJsaWMgbW9zdHJhckJhcnJhKCl7XG5cdFx0dGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSBmYWxzZTtcblx0fVxuXG5cdHB1YmxpYyBvY3VsdGFyQmFycmEoKXtcblx0XHR0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cdH1cblxuXHRwdWJsaWMgdG9nZ2xlUGxheSgpIHtcblx0XHRpZiAodGhpcy5fcGxheWVyLmlzQXVkaW9QbGF5aW5nKCkpIHtcblx0XHQgIHRoaXMuX3BsYXllci5wYXVzZSgpO1xuXHRcdFxuXHRcdH0gZWxzZSB7XG5cdFx0ICB0aGlzLl9wbGF5ZXIucGxheSgpO1xuXHRcdH1cblx0ICB9XG5cdFxuXHQgIHB1YmxpYyBhc3luYyBzdGFydFJlY29yZChhcmdzKSB7XG5cdFx0dHJ5IHtcblx0XHQgIGlmICghVE5TUmVjb3JkZXIuQ0FOX1JFQ09SRCgpKSB7XG5cdFx0XHRkaWFsb2dzLmFsZXJ0KFwiVGhpcyBkZXZpY2UgY2Fubm90IHJlY29yZCBhdWRpby5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0ICB9XG5cdFx0ICBjb25zdCBhdWRpb0ZvbGRlciA9IGtub3duRm9sZGVycy5jdXJyZW50QXBwKCkuZ2V0Rm9sZGVyKFwiYXVkaW9cIik7XG5cdFx0ICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhdWRpb0ZvbGRlcikpO1xuXHRcblx0XHQgIGxldCBhbmRyb2lkRm9ybWF0O1xuXHRcdCAgbGV0IGFuZHJvaWRFbmNvZGVyO1xuXHRcdCAgaWYgKHBsYXRmb3JtLmlzQW5kcm9pZCkge1xuXHRcdFx0Ly8gbTRhXG5cdFx0XHQvLyBzdGF0aWMgY29uc3RhbnRzIGFyZSBub3QgYXZhaWxhYmxlLCB1c2luZyByYXcgdmFsdWVzIGhlcmVcblx0XHRcdC8vIGFuZHJvaWRGb3JtYXQgPSBhbmRyb2lkLm1lZGlhLk1lZGlhUmVjb3JkZXIuT3V0cHV0Rm9ybWF0Lk1QRUdfNDtcblx0XHRcdGFuZHJvaWRGb3JtYXQgPSAyO1xuXHRcdFx0Ly8gYW5kcm9pZEVuY29kZXIgPSBhbmRyb2lkLm1lZGlhLk1lZGlhUmVjb3JkZXIuQXVkaW9FbmNvZGVyLkFBQztcblx0XHRcdGFuZHJvaWRFbmNvZGVyID0gMztcblx0XHQgIH1cblx0XG5cdFx0ICBjb25zdCByZWNvcmRpbmdQYXRoID0gYCR7XG5cdFx0XHRhdWRpb0ZvbGRlci5wYXRoXG5cdFx0ICB9L3JlY29yZGluZy4ke3RoaXMucGxhdGZvcm1FeHRlbnNpb24oKX1gO1xuXHRcblx0XHQgIGNvbnN0IHJlY29yZGVyT3B0aW9uczogQXVkaW9SZWNvcmRlck9wdGlvbnMgPSB7XG5cdFx0XHRmaWxlbmFtZTogcmVjb3JkaW5nUGF0aCxcblx0XG5cdFx0XHRmb3JtYXQ6IGFuZHJvaWRGb3JtYXQsXG5cdFxuXHRcdFx0ZW5jb2RlcjogYW5kcm9pZEVuY29kZXIsXG5cdFxuXHRcdFx0bWV0ZXJpbmc6IHRydWUsXG5cdFxuXHRcdFx0aW5mb0NhbGxiYWNrOiBpbmZvT2JqZWN0ID0+IHtcblx0XHRcdCAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoaW5mb09iamVjdCkpO1xuXHRcdFx0fSxcblx0XG5cdFx0XHRlcnJvckNhbGxiYWNrOiBlcnJvck9iamVjdCA9PiB7XG5cdFx0XHQgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yT2JqZWN0KSk7XG5cdFx0XHR9XG5cdFx0ICB9O1xuXHRcblx0XHQgIGF3YWl0IHRoaXMuX3JlY29yZGVyLnN0YXJ0KHJlY29yZGVyT3B0aW9ucyk7XG5cdFx0ICB0aGlzLmlzUmVjb3JkaW5nID0gdHJ1ZTtcblx0XHQgIGlmIChyZWNvcmRlck9wdGlvbnMubWV0ZXJpbmcpIHtcblx0XHRcdHRoaXMuX2luaXRNZXRlcigpO1xuXHRcdCAgfVxuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdCAgdGhpcy5pc1JlY29yZGluZyA9IGZhbHNlO1xuXHRcdCAgdGhpcy5fcmVzZXRNZXRlcigpO1xuXHRcdCAgZGlhbG9ncy5hbGVydChlcnIpO1xuXHRcdH1cblx0ICB9XG5cblx0ICBwdWJsaWMgYXN5bmMgc3RvcFJlY29yZChhcmdzKSB7XG5cdFx0dGhpcy5fcmVzZXRNZXRlcigpO1xuXHRcdGF3YWl0IHRoaXMuX3JlY29yZGVyLnN0b3AoKS5jYXRjaChleCA9PiB7XG5cdFx0ICBjb25zb2xlLmxvZyhleCk7XG5cdFx0ICB0aGlzLmlzUmVjb3JkaW5nID0gZmFsc2U7XG5cdFx0ICB0aGlzLl9yZXNldE1ldGVyKCk7XG5cdFx0fSk7XG5cdH1cblxuXHQgIHByaXZhdGUgX2luaXRNZXRlcigpIHtcblx0XHR0aGlzLl9yZXNldE1ldGVyKCk7XG5cdFx0dGhpcy5fbWV0ZXJJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcblx0XHQgIHRoaXMuYXVkaW9NZXRlciA9IHRoaXMuX3JlY29yZGVyLmdldE1ldGVycygpO1xuXHRcdCAgY29uc29sZS5sb2codGhpcy5hdWRpb01ldGVyKTtcblx0XHR9LCAzMDApO1xuXHQgIH1cblx0XG5cdCAgcHJpdmF0ZSBfcmVzZXRNZXRlcigpIHtcblx0XHRpZiAodGhpcy5fbWV0ZXJJbnRlcnZhbCkge1xuXHRcdCAgdGhpcy5hdWRpb01ldGVyID0gXCIwXCI7XG5cdFx0ICBjbGVhckludGVydmFsKHRoaXMuX21ldGVySW50ZXJ2YWwpO1xuXHRcdCAgdGhpcy5fbWV0ZXJJbnRlcnZhbCA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdCAgfVxuXG5cdCAgcHJpdmF0ZSBwbGF0Zm9ybUV4dGVuc2lvbigpIHtcblx0XHQvLyAnbXAzJ1xuXHRcdHJldHVybiBgJHthcHAuYW5kcm9pZCA/IFwibTRhXCIgOiBcImNhZlwifWA7XG5cdCAgfVxuXHRcblxuXHQgIGxpc3Rlbigpe1xuXHRcdCAgdGhpcy5fcm91dEV4Lm5hdmlnYXRlKFsnYXBwLWxpc3RlbmluZyddKVxuXHQgIH1cblxuXG5cbn0iXX0=