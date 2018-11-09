import { Component, OnInit } from '@angular/core';
import { SearchBar } from "ui/search-bar";

@Component({
	selector: 'app-drawer',
	templateUrl: './shared/drawer/drawer.component.html',
	styleUrls: ['./shared/drawer/drawer.component.css']
})

export class DrawerComponent implements OnInit {

	constructor() { }

	ngOnInit() { }

	public searchPhrase: string;

    public onSubmit(args) {
        let searchBar = <SearchBar>args.object;
        alert("You are searching for " + searchBar.text);
    }

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        console.log("SearchBar text changed! New value: " + searchBar.text);
    }
}