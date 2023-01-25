import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-card-not-user',
  templateUrl: './card-not-user.component.html',
  styleUrls: ['./card-not-user.component.css']
})
export class CardNotUserComponent implements OnInit {

  users: UserInterface[] = [];
  spinner: boolean = true;

  constructor(
    public _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getSpinner();
    this.getUsers();
  }

  getSpinner() {
    this._dataService.spinner$.subscribe((spinner: boolean) => {
      this.spinner = spinner;
    })
  }

  getUsers() {
    this._dataService.userList$.subscribe((users: UserInterface[]) => {
      this.users = users;
    })
  }

}
