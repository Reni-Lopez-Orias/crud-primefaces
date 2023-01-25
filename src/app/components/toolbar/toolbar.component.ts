import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  userSelected: boolean = false;
  users: UserInterface[] = [];
  usersSelected: UserInterface[] = [];

  constructor(
    private messageService: MessageService,
    private _userService: UserService,
    public _dataService: DataService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getEnableDelete();
    this.getUsers();
    this.getUsersSelected();
  }

  getUsers() {
    this._dataService.userList$.subscribe((users: UserInterface[]) => {
      this.users = users;
    })
  }

  getUsersSelected() {
    this._dataService.userSelected$.subscribe((usersSelected: UserInterface[]) => {
      this.usersSelected = usersSelected;
    })
  }

  getEnableDelete() {
    this._dataService.enableDelete$.subscribe((selectedUser: boolean) => {
      this.userSelected = selectedUser;
    })
  }

  openDialog() {
    this._dataService.showDialog$.emit(true);
  }

  confirmDelete(event: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUsersSelected();
        this.showMessage('topright', 'success', 'Delete', 'User deleted successfully!', 'pi pi-check');
      }
    });

  }

  deleteUsersSelected() {
    this._dataService.setSpinner(true);
    let deleteUser: UserInterface[] = this.users.filter(val => this.usersSelected.includes(val));
    this.users = this.users.filter(val => !this.usersSelected.includes(val));
    this._dataService.userList$.emit(this.users);
    deleteUser.map((user: UserInterface) => {
      this._userService.deleteUser(user.uid).subscribe();
    });
    this._dataService.setSpinner(false);
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

}
