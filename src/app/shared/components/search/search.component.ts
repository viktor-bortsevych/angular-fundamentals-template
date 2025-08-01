import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string = 'Search...';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchValue: string = '';

  onSearch() {
    console.log('Search value:', this.searchValue);
    this.search.emit(this.searchValue);
  }
}

