import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { fakeUsers } from './fakeData/users.js';
import { Fuzz, FuzzItem } from 'fuzz-js';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public title: string = 'fuzzyInput';
	public filteredFuzzItems: FuzzItem;
	public fuzz = new Fuzz();
	public queryForm = new FormControl();

	public sub: Subscription;

	public inputValue: string = '';
	public fakeUsers: any[] = fakeUsers;

	constructor() {
		this.sub = this.queryForm.valueChanges.subscribe((value: string) => this.onQueryChange(value))
		this.queryForm.setValue('');
	}

	public ngOnDestroy() {
		this.sub.unsubscribe();
	}

	public onQueryChange(query: string = '') {
		this.filteredFuzzItems = this.fuzz.filterSort(this.fakeUsers, ['firstName', 'lastName', 'spiritAnimal'], query);
	}

}
