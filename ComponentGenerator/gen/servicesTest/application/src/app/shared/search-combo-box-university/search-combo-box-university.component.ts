

import { UniversityModel } from './search-combo-box-university.model';
import { SearchComboBoxUniversityService } from './search-combo-box-university.service';
import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-university-search-combo-box',
  templateUrl: './search-combo-box-university.component.html',
  styleUrls: ['./search-combo-box-university.component.css']
})
export class SearchComboBoxUniversityComponent implements OnInit, OnChanges {

  public model: any;
  private university: any = {};
  @Input() universityCtrl: FormControl;
  @Input() searchParams: any;
  @Input() preSelectUniversity: UniversityModel;
  @Output() universitySelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(private searchComboBoxUniversityService: SearchComboBoxUniversityService) { }

  ngOnInit(): void {
    this.universityCtrl.setValue(this.preSelectUniversity.name);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.preSelectUniversity) {
      this.universityCtrl.setValue(this.preSelectUniversity.name);
      this.model = this.preSelectUniversity.name;
    }
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term.length < 3 ? [] : this.searchComboBoxUniversityService.getAllUniversities(term,this.searchParams).map(value => value.universities.slice(0,10)));
      

  formatter = (item: {name: string}) => item.name;


  selectedItem(event){
    this.universitySelected.emit(event.item);
  }

}

