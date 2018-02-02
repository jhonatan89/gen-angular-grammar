import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginatorModel } from './pagination.model';

@Component({
  selector: 'academia-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() collectionSize: number;
  @Input() pageSize: number;
  @Input() page: number;
  @Output() pageChanged = new EventEmitter<PaginatorModel>();

  constructor() { }

  ngOnInit() {
  }

   onPageChange(event: any) {
    this.pageChanged.emit(new PaginatorModel(event.page,event.itemsPerPage, this.collectionSize));
  }

}