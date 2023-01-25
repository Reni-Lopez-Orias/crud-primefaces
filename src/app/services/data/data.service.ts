import { Injectable, EventEmitter } from '@angular/core'; 
import { UserInterface } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  spinner$ = new EventEmitter<boolean>();
  enableDelete$ = new EventEmitter<boolean>();
  showDialog$ = new EventEmitter<boolean>();
  userList$ = new EventEmitter<UserInterface[]>();
  userSelected$ = new EventEmitter<UserInterface[]>();
  updateUser$ = new EventEmitter<UserInterface>();

  constructor() { }

  //only function because have setTimeout to show spinner
  setSpinner(status: boolean){ 
    //condition to show spinner by 1,5 seconds
    if (!status) {
      setTimeout(() => {
        this.spinner$.emit(status);
      }, 1500);
    }else{
      this.spinner$.emit(status);
    }
   
  }
 

}
