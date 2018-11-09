"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var nativescript_audio_1 = require("nativescript-audio");
var dialogs = require("tns-core-modules/ui/dialogs");
var app = require("tns-core-modules/application");
var observable_1 = require("tns-core-modules/data/observable/observable");
var timer = require("tns-core-modules/timer");
var ListeningComponent = /** @class */ (function () {
    function ListeningComponent() {
        this._player = new nativescript_audio_1.TNSPlayer();
    }
    ListeningComponent.prototype.ngOnInit = function () {
    };
    /***** AUDIO PLAYER *****/
    ListeningComponent.prototype.playAudio = function (filepath, fileType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var playerOptions, _a, ex_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        playerOptions = {
                            audioFile: filepath,
                            loop: false,
                            completeCallback: function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            alert("Audio file complete.");
                                            return [4 /*yield*/, this._player.dispose()];
                                        case 1:
                                            _a.sent();
                                            this.isPlaying = false;
                                            console.log("player disposed");
                                            return [2 /*return*/];
                                    }
                                });
                            }); },
                            errorCallback: function (errorObject) {
                                console.log(JSON.stringify(errorObject));
                                _this.isPlaying = false;
                            },
                            infoCallback: function (args) {
                                dialogs.alert("Info callback: " + args.info);
                                console.log(JSON.stringify(args));
                            }
                        };
                        this.isPlaying = true;
                        if (!(fileType === "localFile")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._player.playFromFile(playerOptions).catch(function () {
                                _this.isPlaying = false;
                            })];
                    case 1:
                        _b.sent();
                        this.isPlaying = true;
                        _a = this;
                        return [4 /*yield*/, this._player.getAudioTrackDuration()];
                    case 2:
                        _a.audioTrackDuration = _b.sent();
                        // start audio duration tracking
                        this._startDurationTracking(this.audioTrackDuration);
                        return [3 /*break*/, 5];
                    case 3:
                        if (!(fileType === "remoteFile")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._player.playFromUrl(playerOptions).catch(function () {
                                _this.isPlaying = false;
                            })];
                    case 4:
                        _b.sent();
                        this.isPlaying = true;
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        ex_1 = _b.sent();
                        console.log(ex_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * PLAY REMOTE AUDIO FILE
     */
    ListeningComponent.prototype.playRemoteFile = function (args) {
        console.log("playRemoteFile");
        var filepath = "http://www.noiseaddicts.com/samples_1w72b820/2514.mp3";
        this.playAudio(filepath, "remoteFile");
    };
    ListeningComponent.prototype.resumePlayer = function () {
        console.log(JSON.stringify(this._player));
        this._player.resume();
    };
    /**
     * PLAY LOCAL AUDIO FILE from app folder
     */
    ListeningComponent.prototype.playLocalFile = function (args) {
        var filepath = "~/audio/angel.mp3";
        this.playAudio(filepath, "localFile");
    };
    /**
     * PAUSE PLAYING
     */
    ListeningComponent.prototype.pauseAudio = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._player.pause()];
                    case 1:
                        _a.sent();
                        this.isPlaying = false;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        this.isPlaying = true;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ListeningComponent.prototype.stopPlaying = function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._player.dispose()];
                    case 1:
                        _a.sent();
                        alert("Media Player Disposed.");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * RESUME PLAYING
     */
    ListeningComponent.prototype.resumePlaying = function (args) {
        console.log("START");
        this._player.play();
    };
    ListeningComponent.prototype.playSpeed1 = function () {
        this._player.changePlayerSpeed(1);
    };
    ListeningComponent.prototype.playSpeed15 = function () {
        this._player.changePlayerSpeed(1.5);
    };
    ListeningComponent.prototype.playSpeed2 = function () {
        this._player.changePlayerSpeed(2);
    };
    ListeningComponent.prototype.platformExtension = function () {
        // 'mp3'
        return "" + (app.android ? "m4a" : "caf");
    };
    ListeningComponent.prototype._startDurationTracking = function (duration) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var timerId;
            return __generator(this, function (_a) {
                if (this._player && this._player.isAudioPlaying()) {
                    timerId = timer.setInterval(function () {
                        _this.remainingDuration = duration - _this._player.currentTime;
                        // console.log(`this.remainingDuration = ${this.remainingDuration}`);
                    }, 1000);
                }
                return [2 /*return*/];
            });
        });
    };
    ListeningComponent = __decorate([
        core_1.Component({
            selector: 'listening',
            templateUrl: './pages/listening/listening.component.html',
            styleUrls: ['./pages/listening/listening.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ListeningComponent);
    return ListeningComponent;
}());
exports.ListeningComponent = ListeningComponent;
function ObservableProperty() {
    return function (obj, key) {
        var storedValue = obj[key];
        Object.defineProperty(obj, key, {
            get: function () {
                return storedValue;
            },
            set: function (value) {
                if (storedValue === value) {
                    return;
                }
                storedValue = value;
                this.notify({
                    eventName: observable_1.Observable.propertyChangeEvent,
                    propertyName: key,
                    object: this,
                    value: value
                });
            },
            enumerable: true,
            configurable: true
        });
    };
}
exports.ObservableProperty = ObservableProperty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGVuaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3RlbmluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMERBQTBEO0FBQzFELDRDQUE0QztBQUM1Qyw4Q0FBOEM7QUFDOUMsbURBQW1EO0FBQ25ELHlEQUFtRTtBQUNuRSxxREFBdUQ7QUFDdkQsa0RBQW9EO0FBQ3BELDBFQUF5RTtBQUN6RSw4Q0FBZ0Q7QUFRaEQ7SUFPRTtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSw4QkFBUyxFQUFFLENBQUM7SUFFakMsQ0FBQztJQUVELHFDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUYsMEJBQTBCO0lBRWIsc0NBQVMsR0FBdEIsVUFBdUIsUUFBZ0IsRUFBRSxRQUFnQjs7Ozs7Ozs7d0JBRTlDLGFBQWEsR0FBdUI7NEJBQ3hDLFNBQVMsRUFBRSxRQUFROzRCQUNuQixJQUFJLEVBQUUsS0FBSzs0QkFDWCxnQkFBZ0IsRUFBRTs7Ozs0Q0FDaEIsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7NENBQzlCLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUE7OzRDQUE1QixTQUE0QixDQUFDOzRDQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs0Q0FDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOzs7O2lDQUNoQzs0QkFDRCxhQUFhLEVBQUUsVUFBQSxXQUFXO2dDQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQ0FDekMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7NEJBQ3pCLENBQUM7NEJBQ0QsWUFBWSxFQUFFLFVBQUEsSUFBSTtnQ0FDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFB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QyxHQUFHLENBQUMsQ0FBQztRQUUzQixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7WUFDOUIsR0FBRyxFQUFFO2dCQUNILE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDckIsQ0FBQztZQUNELEdBQUcsRUFBRSxVQUFTLEtBQUs7Z0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUMxQixNQUFNLENBQUM7Z0JBQ1QsQ0FBQztnQkFDRCxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDO29CQUNWLFNBQVMsRUFBRSx1QkFBVSxDQUFDLG1CQUFtQjtvQkFDekMsWUFBWSxFQUFFLEdBQUc7b0JBQ2pCLE1BQU0sRUFBRSxJQUFJO29CQUNaLEtBQUssT0FBQTtpQkFDTixDQUFDLENBQUM7WUFDTCxDQUFDO1lBQ0QsVUFBVSxFQUFFLElBQUk7WUFDaEIsWUFBWSxFQUFFLElBQUk7U0FDbkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBRUosQ0FBQztBQXpCRCxnREF5QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLy9pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuLy9pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbi8vaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbi8vaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVE5TUGxheWVyLCBBdWRpb1BsYXllck9wdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWF1ZGlvXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlL29ic2VydmFibGUnO1xuaW1wb3J0ICogYXMgdGltZXIgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdGltZXJcIjtcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnbGlzdGVuaW5nJyxcblx0dGVtcGxhdGVVcmw6ICcuL3BhZ2VzL2xpc3RlbmluZy9saXN0ZW5pbmcuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9wYWdlcy9saXN0ZW5pbmcvbGlzdGVuaW5nLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIExpc3RlbmluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHJpdmF0ZSBfcGxheWVyOiBUTlNQbGF5ZXI7XG4gIHB1YmxpYyBpc1BsYXlpbmc6IGJvb2xlYW47XG4gIHB1YmxpYyBhdWRpb1RyYWNrRHVyYXRpb247XG4gIHB1YmxpYyByZW1haW5pbmdEdXJhdGlvbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9wbGF5ZXIgPSBuZXcgVE5TUGxheWVyKCk7XG4gICBcbiAgfVxuXG4gIG5nT25Jbml0KCl7XG5cbiAgfVxuXG4gLyoqKioqIEFVRElPIFBMQVlFUiAqKioqKi9cblxuIHB1YmxpYyBhc3luYyBwbGF5QXVkaW8oZmlsZXBhdGg6IHN0cmluZywgZmlsZVR5cGU6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwbGF5ZXJPcHRpb25zOiBBdWRpb1BsYXllck9wdGlvbnMgPSB7XG4gICAgICAgIGF1ZGlvRmlsZTogZmlsZXBhdGgsXG4gICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICBjb21wbGV0ZUNhbGxiYWNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgYWxlcnQoXCJBdWRpbyBmaWxlIGNvbXBsZXRlLlwiKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9wbGF5ZXIuZGlzcG9zZSgpO1xuICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXIgZGlzcG9zZWRcIik7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yQ2FsbGJhY2s6IGVycm9yT2JqZWN0ID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvck9iamVjdCkpO1xuICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGluZm9DYWxsYmFjazogYXJncyA9PiB7XG4gICAgICAgICAgZGlhbG9ncy5hbGVydChcIkluZm8gY2FsbGJhY2s6IFwiICsgYXJncy5pbmZvKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhcmdzKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcblxuICAgICAgaWYgKGZpbGVUeXBlID09PSBcImxvY2FsRmlsZVwiKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuX3BsYXllci5wbGF5RnJvbUZpbGUocGxheWVyT3B0aW9ucykuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuYXVkaW9UcmFja0R1cmF0aW9uID0gYXdhaXQgdGhpcy5fcGxheWVyLmdldEF1ZGlvVHJhY2tEdXJhdGlvbigpO1xuICAgICAgICAvLyBzdGFydCBhdWRpbyBkdXJhdGlvbiB0cmFja2luZ1xuICAgICAgICB0aGlzLl9zdGFydER1cmF0aW9uVHJhY2tpbmcodGhpcy5hdWRpb1RyYWNrRHVyYXRpb24pO1xuICAgICAgfSBlbHNlIGlmIChmaWxlVHlwZSA9PT0gXCJyZW1vdGVGaWxlXCIpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5fcGxheWVyLnBsYXlGcm9tVXJsKHBsYXllck9wdGlvbnMpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBjb25zb2xlLmxvZyhleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBMQVkgUkVNT1RFIEFVRElPIEZJTEVcbiAgICovXG4gIHB1YmxpYyBwbGF5UmVtb3RlRmlsZShhcmdzKSB7XG4gICAgY29uc29sZS5sb2coXCJwbGF5UmVtb3RlRmlsZVwiKTtcbiAgICBjb25zdCBmaWxlcGF0aCA9IFwiaHR0cDovL3d3dy5ub2lzZWFkZGljdHMuY29tL3NhbXBsZXNfMXc3MmI4MjAvMjUxNC5tcDNcIjtcblxuICAgIHRoaXMucGxheUF1ZGlvKGZpbGVwYXRoLCBcInJlbW90ZUZpbGVcIik7XG4gIH1cblxuICBwdWJsaWMgcmVzdW1lUGxheWVyKCkge1xuICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMuX3BsYXllcikpO1xuICAgIHRoaXMuX3BsYXllci5yZXN1bWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQTEFZIExPQ0FMIEFVRElPIEZJTEUgZnJvbSBhcHAgZm9sZGVyXG4gICAqL1xuICBwdWJsaWMgcGxheUxvY2FsRmlsZShhcmdzKSB7XG4gICAgbGV0IGZpbGVwYXRoID0gXCJ+L2F1ZGlvL2FuZ2VsLm1wM1wiO1xuICAgIHRoaXMucGxheUF1ZGlvKGZpbGVwYXRoLCBcImxvY2FsRmlsZVwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQQVVTRSBQTEFZSU5HXG4gICAqL1xuICBwdWJsaWMgYXN5bmMgcGF1c2VBdWRpbyhhcmdzKSB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuX3BsYXllci5wYXVzZSgpO1xuICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdG9wUGxheWluZyhhcmdzKSB7XG4gICAgYXdhaXQgdGhpcy5fcGxheWVyLmRpc3Bvc2UoKTtcbiAgICBhbGVydChcIk1lZGlhIFBsYXllciBEaXNwb3NlZC5cIik7XG4gIH1cblxuICAvKipcbiAgICogUkVTVU1FIFBMQVlJTkdcbiAgICovXG4gIHB1YmxpYyByZXN1bWVQbGF5aW5nKGFyZ3MpIHtcbiAgICBjb25zb2xlLmxvZyhcIlNUQVJUXCIpO1xuICAgIHRoaXMuX3BsYXllci5wbGF5KCk7XG4gIH1cblxuICBwdWJsaWMgcGxheVNwZWVkMSgpIHtcbiAgICB0aGlzLl9wbGF5ZXIuY2hhbmdlUGxheWVyU3BlZWQoMSk7XG4gIH1cblxuICBwdWJsaWMgcGxheVNwZWVkMTUoKSB7XG4gICAgdGhpcy5fcGxheWVyLmNoYW5nZVBsYXllclNwZWVkKDEuNSk7XG4gIH1cblxuICBwdWJsaWMgcGxheVNwZWVkMigpIHtcbiAgICB0aGlzLl9wbGF5ZXIuY2hhbmdlUGxheWVyU3BlZWQoMik7XG4gIH1cblxuICBwcml2YXRlIHBsYXRmb3JtRXh0ZW5zaW9uKCkge1xuICAgIC8vICdtcDMnXG4gICAgcmV0dXJuIGAke2FwcC5hbmRyb2lkID8gXCJtNGFcIiA6IFwiY2FmXCJ9YDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3N0YXJ0RHVyYXRpb25UcmFja2luZyhkdXJhdGlvbikge1xuICAgIGlmICh0aGlzLl9wbGF5ZXIgJiYgdGhpcy5fcGxheWVyLmlzQXVkaW9QbGF5aW5nKCkpIHtcbiAgICAgIGNvbnN0IHRpbWVySWQgPSB0aW1lci5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVtYWluaW5nRHVyYXRpb24gPSBkdXJhdGlvbiAtIHRoaXMuX3BsYXllci5jdXJyZW50VGltZTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYHRoaXMucmVtYWluaW5nRHVyYXRpb24gPSAke3RoaXMucmVtYWluaW5nRHVyYXRpb259YCk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9ic2VydmFibGVQcm9wZXJ0eSgpIHtcbiAgcmV0dXJuIChvYmo6IE9ic2VydmFibGUsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgbGV0IHN0b3JlZFZhbHVlID0gb2JqW2tleV07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBzdG9yZWRWYWx1ZTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIGlmIChzdG9yZWRWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3RvcmVkVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5ub3RpZnkoe1xuICAgICAgICAgIGV2ZW50TmFtZTogT2JzZXJ2YWJsZS5wcm9wZXJ0eUNoYW5nZUV2ZW50LFxuICAgICAgICAgIHByb3BlcnR5TmFtZToga2V5LFxuICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH07XG5cbn0iXX0=