import { Component, OnInit, ViewChild } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { SideDrawerType, RadSideDrawerComponent } from 'nativescript-telerik-ui/sidedrawer/angular';
import { RadSideDrawer } from 'nativescript-telerik-ui/sidedrawer';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

import * as dialogs from "tns-core-modules/ui/dialogs";
import { knownFolders, File } from "tns-core-modules/file-system";
import * as platform from "tns-core-modules/platform";
import * as app from "tns-core-modules/application";
import {
	TNSRecorder,
	TNSPlayer,
	AudioPlayerOptions,
	AudioRecorderOptions
  } from "nativescript-audio";
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
	selector: 'recording',
	templateUrl: './pages/recording/recording.component.html',
	styleUrls: ['./pages/recording/recording.component.css']
})

export class RecordingComponent implements OnInit {
	private _player: TNSPlayer;
	private _recorder;
	public isRecording: boolean;
	private _meterInterval: any;
	public audioMeter = "0";
	constructor(private _page:Page,private _routEx:RouterExtensions) {
		this._recorder = new TNSRecorder();
		this._recorder.debug = true; // set true for tns_recorder logs
	}
	
	private drawer: SideDrawerType;
	isDrawerOpened;
	isVisible:Boolean = false;
	image="~/images/menu.png";
	@ViewChild(RadSideDrawerComponent)
    public drawerComponent: RadSideDrawerComponent;

    ngOnInit(){
	  this.drawer=this.drawerComponent.sideDrawer;
	 
}

   public mostrarMenu(){

	  if(this.isVisible === false){
		this.drawer.showDrawer();
		this.isVisible = true;
	  }else{
		this.drawer.closeDrawer();
		this.isVisible = false;
	  }

	  
	  //this.ocultarBarra();
	}

    public onMenuTapped(value: any) {
        //Toast.makeText(value + " menu item selected").show();
        this.drawer.closeDrawer();
	}
	
	public mostrarBarra(){
		this._page.actionBarHidden = false;
	}

	public ocultarBarra(){
		this._page.actionBarHidden = true;
	}

	public togglePlay() {
		if (this._player.isAudioPlaying()) {
		  this._player.pause();
		
		} else {
		  this._player.play();
		}
	  }
	
	  public async startRecord(args) {
		try {
		  if (!TNSRecorder.CAN_RECORD()) {
			dialogs.alert("This device cannot record audio.");
			return;
		  }
		  const audioFolder = knownFolders.currentApp().getFolder("audio");
		  console.log(JSON.stringify(audioFolder));
	
		  let androidFormat;
		  let androidEncoder;
		  if (platform.isAndroid) {
			// m4a
			// static constants are not available, using raw values here
			// androidFormat = android.media.MediaRecorder.OutputFormat.MPEG_4;
			androidFormat = 2;
			// androidEncoder = android.media.MediaRecorder.AudioEncoder.AAC;
			androidEncoder = 3;
		  }
	
		  const recordingPath = `${
			audioFolder.path
		  }/recording.${this.platformExtension()}`;
	
		  const recorderOptions: AudioRecorderOptions = {
			filename: recordingPath,
	
			format: androidFormat,
	
			encoder: androidEncoder,
	
			metering: true,
	
			infoCallback: infoObject => {
			  console.log(JSON.stringify(infoObject));
			},
	
			errorCallback: errorObject => {
			  console.log(JSON.stringify(errorObject));
			}
		  };
	
		  await this._recorder.start(recorderOptions);
		  this.isRecording = true;
		  if (recorderOptions.metering) {
			this._initMeter();
		  }
		} catch (err) {
		  this.isRecording = false;
		  this._resetMeter();
		  dialogs.alert(err);
		}
	  }

	  public async stopRecord(args) {
		this._resetMeter();
		await this._recorder.stop().catch(ex => {
		  console.log(ex);
		  this.isRecording = false;
		  this._resetMeter();
		});
	}

	  private _initMeter() {
		this._resetMeter();
		this._meterInterval = setInterval(() => {
		  this.audioMeter = this._recorder.getMeters();
		  console.log(this.audioMeter);
		}, 300);
	  }
	
	  private _resetMeter() {
		if (this._meterInterval) {
		  this.audioMeter = "0";
		  clearInterval(this._meterInterval);
		  this._meterInterval = undefined;
		}
	  }

	  private platformExtension() {
		// 'mp3'
		return `${app.android ? "m4a" : "caf"}`;
	  }
	

	  listen(){
		  this._routEx.navigate(['app-listening'])
	  }



}