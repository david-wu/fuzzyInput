import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Fuzz, FuzzItem } from 'fuzz-js';

@Component({
	selector: 'da-inner-html-light',
	templateUrl: './inner-html-light.component.html',
	styleUrls: ['./inner-html-light.component.css']
})
export class InnerHtmlLightComponent implements OnChanges {

	@Input() text = '';
	@Input() boldRanges = [];

	@ViewChild('container') container;

	constructor() {
	}

	public ngOnChanges(changes: SimpleChanges) {
		if (changes.text || changes.boldRanges) {
			const htmlText = this.getNewHtml(this.text, this.boldRanges)
			this.setContainerValue(htmlText);
		}
	}

	public setContainerValue(htmlText: string) {
		this.container.nativeElement.innerHTML = htmlText;
	}

	public getNewHtml(text: string, boldRanges: number[][]) {
		const htmlChars = [];
		const openIndices = new Set(boldRanges.map((range: number[]) => range[0]));
		const closeIndices = new Set(boldRanges.map((range: number[]) => range[1]));

		for (let i = 0; i < text.length; i++) {
			if(openIndices.has(i)) {
				htmlChars.push('<b>');
			}
			htmlChars.push(text[i]);
			if(closeIndices.has(i)) {
				htmlChars.push('</b>');
			}
		}
		return htmlChars.join('');
	}

}
