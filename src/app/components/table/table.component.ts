import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  users: UserInterface[] = [];
  selectedUsers: UserInterface[] = [];
  spinner: boolean = true;;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _dataService: DataService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getSpinner();
  }

  ngDoCheck(): void {
    if (this.selectedUsers.length > 0) {
      this._dataService.userSelected$.emit(this.selectedUsers);
      this._dataService.enableDelete$.emit(true);
    } else {
      this._dataService.enableDelete$.emit(false);
    }

  }

  getSpinner() {
    this._dataService.spinner$.subscribe((spinner: boolean) => {
      this.spinner = spinner;
    })
  }

  getUsers() {
    this._dataService.userList$.subscribe((users: any) => {
      this.users = users;
    })
  }

  deleteUser(event: any, userSelected: UserInterface) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._dataService.spinner$.emit(true);
        let indexUser = this.users.findIndex(user => user.uid == userSelected.uid);
        this.users.splice(indexUser, 1);
        this._userService.deleteUser(userSelected.uid).subscribe();
        this.showMessage('topright', 'success', 'Delete', 'User deleted successfully!', 'pi pi-check');
          this._dataService.setSpinner(false);
      }
    });
  }

  showMessage(key: string, severity: string, summary: string, detail: string, icon: string) {
    this.messageService.add({
      key: key,
      severity: severity,
      summary: summary,
      detail: detail,
      icon: icon
    });
  }

  updateUser(user: UserInterface) {
    this._dataService.updateUser$.emit(user);
    this._dataService.showDialog$.emit(true);
  }


}
