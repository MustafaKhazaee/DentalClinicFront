import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PagedResult } from 'src/app/data/models/common/paged-result';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.rows = this.table.list;
    this.headers = this.rows[0];
  }
  @Input() canDelete!: boolean;
  @Input() canEdit!: boolean;
  @Input() showOpertions: boolean = true;
  @Input() table!: PagedResult<any>;
  @Input() excludedColumns!: Array<string>;
  @Output() editRow: EventEmitter<any> = new EventEmitter();
  @Output() deleteRow: EventEmitter<any> = new EventEmitter();
  @Output() tablePaging: EventEmitter<any> = new EventEmitter();
  @Output() rowDetails: EventEmitter<any> = new EventEmitter();
  rows!: Array<any>;
  headers!: Array<string>;
  ngOnInit(): void {
    this.rows = this.table.list;
    this.headers = this.rows[0];
  }
  edit = (a: any) => this.editRow.emit(a);
  delete = (a: any) => this.deleteRow.emit(a);
  details = (a: any) => this.rowDetails.emit(a);
  handlePaging = (paging: PageEvent) => this.tablePaging.emit(paging);
  originalOrder = (a: KeyValue<string, string>, b: KeyValue<string, string>) => 0;
}
