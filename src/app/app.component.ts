import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

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
	public availableItems: any[] = [
		{ label: 'Apple' },
		{ label: 'Akee' },
		{ label: 'Apricot' },
		{ label: 'Avocado' },
		{ label: 'Banana' },
		{ label: 'Bilberry' },
		{ label: 'Blackberry' },
		{ label: 'Blackcurrant' },
		{ label: 'Black sapote' },
		{ label: 'Blueberry' },
		{ label: 'Boysenberry' },
		{ label: 'Buddha\'s hand' },
		{ label: 'Crab apples' },
		{ label: 'Currant' },
		{ label: 'Cherry' },
		{ label: 'Cherimoya' },
		{ label: 'Chico fruit' },
		{ label: 'Cloudberry' },
		{ label: 'Coconut' },
		{ label: 'Cranberry' },
		{ label: 'Cucumber' },
		{ label: 'Damson' },
		{ label: 'Date' },
		{ label: 'Dragonfruit' },
		{ label: 'Durian' },
		{ label: 'Elderberry' },
		{ label: 'Feijoa' },
		{ label: 'Fig' },
		{ label: 'Goji berry' },
		{ label: 'Gooseberry' },
		{ label: 'Grape' },
	];

	constructor() {
		this.sub = this.queryForm.valueChanges.subscribe((value: string) => this.onQueryChange(value))
		this.queryForm.setValue('');
	}

	public ngOnDestroy() {
		this.sub.unsubscribe();
	}

	public onQueryChange(query: string = '') {
		this.filteredFuzzItems = this.fuzz.filterSort(this.availableItems, ['label'], query);
	}

}
