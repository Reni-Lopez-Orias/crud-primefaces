import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  spinner: boolean = true;

  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getSpinner();
  }

  getSpinner() {
    this._dataService.spinner$.subscribe((spinner: boolean) => {
      this.spinner = spinner;
    })
  }

}
