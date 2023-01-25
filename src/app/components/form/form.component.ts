import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GenderInterface } from 'src/app/interfaces/gender.inteface';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { DataService } from 'src/app/services/data/data.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidatorsService } from 'src/app/services/validators/validators.service';
import { Genders } from '../../enum/gender';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  dialog: boolean = false;
  userForm: FormGroup;
  users: UserInterface[] = [];
  gender: GenderInterface[] = Genders;

  constructor(
    private messageService: MessageService,
    private _dataService: DataService,
    private _validatorService: ValidatorsService,
    private _userService: UserService,
    private _fb: FormBuilder
  ) {

    this.userForm = this._fb.group({
      uid: [null],
      userName: ['', [Validators.required, this._validatorService.requiredInput('user name'), this._validatorService.minLength(3, 'user name')]],
      firstName: ['', [Validators.required, this._validatorService.requiredInput('first name'), this._validatorService.minLength(5, 'first name')]],
      lastName: ['', [Validators.required, this._validatorService.requiredInput('last name'), this._validatorService.minLength(4, 'last name')]],
      email: ['', [Validators.required, this._validatorService.requiredInput('email'), this._validatorService.email]],
      age: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      gender: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }
  ngOnInit(): void {
    this.showDialog();
    this.getUsers();
    this.handleUpdateUser();
  }

  getUsers() {
    this._dataService.userList$.subscribe((users: UserInterface[]) => {
      this.users = users;
    })
  }

  submitForm() {

    if (this.userForm.valid) {
      this._dataService.setSpinner(true);
      (this.userForm.value.uid) ? this.editUser() : this.addUSer();
      this.customResetForm();
      this._dataService.setSpinner(false);
    }

  }

  addUSer() {
    let formData = this.userForm.value;
    this._userService.addUser(formData).subscribe((response: UserInterface) => {
      if (response) {
        this.users.push(formData);
        this._dataService.userList$.emit(this.users);
        this.showMessage('topright', 'success', 'Adde', 'User added successfully!', 'pi pi-check');
        this.hideDialog()
      }
    });
  }
  editUser() {
    this._userService.editUser(this.userForm.value).subscribe(response => {
      if (response) {
        let indexUser = this.users.findIndex(user => user.uid == response.uid);
        this.users[indexUser] = response;
        this.showMessage('topright', 'success', 'Update', 'User updated successfully!', 'pi pi-check');
        this.hideDialog()
      }
    })
  }

  handleUpdateUser() {
    this._dataService.updateUser$.subscribe((user: UserInterface) => {
      this.userForm.get('uid')?.setValue(user.uid);
      this.userForm.get('userName')?.setValue(user.userName);
      this.userForm.get('firstName')?.setValue(user.firstName);
      this.userForm.get('lastName')?.setValue(user.lastName);
      this.userForm.get('email')?.setValue(user.email);
      this.userForm.get('gender')?.setValue(user.gender);
      this.userForm.get('age')?.setValue(user.age);
    });
  }

  hideDialog() {
    this._dataService.showDialog$.emit(false);
    this.dialog = false;
  }
  showDialog() {
    this._dataService.showDialog$.subscribe((dialog: boolean) => {
      this.dialog = dialog;
    })
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

  customResetForm() {
    this.userForm.reset({
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      age: 1
    });
  }




}
