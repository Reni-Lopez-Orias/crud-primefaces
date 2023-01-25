import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api'; 
import { UserInterface } from './interfaces/user.interface';
import { UserService } from './services/user/user.service';
import { DataService } from './services/data/data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [MessageService, ConfirmationService]
})

export class AppComponent {
    constructor(
        private _userService: UserService,
        private _dataService: DataService
    ) {
    }

    ngOnInit() {
        this.setAllUsers();
    }
 
    setAllUsers() {
        this._dataService.setSpinner(true);
        this._userService.getAllUsers().subscribe((response: UserInterface[]) => {
            if (response) {
                this._dataService.userList$.emit(response);
                this._dataService.setSpinner(false);
            }
        })
    }

}
