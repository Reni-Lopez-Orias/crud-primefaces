import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http'
import { UserInterface } from 'src/app/interfaces/user.interface';
import { map } from 'rxjs/operators';
import { ResponseAddUserInterface } from 'src/app/interfaces/response-add-user.interface'; 

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private _http: HttpClient, 
  ) { }

  addUser(user: UserInterface) {
    return this._http.post<ResponseAddUserInterface>(`${environment.urlBase}/users.json`, user)
      .pipe(
        map((response: ResponseAddUserInterface) => {
          user.uid = response.name;
          return user;
        })
      );
  }

  editUser(user: UserInterface) {
    const userTemp = { ...user }
    delete userTemp.uid;
    return this._http.put<UserInterface>(`${environment.urlBase}/users/${user.uid}.json`, userTemp)
      .pipe(
        map((response: UserInterface) => {
          response.uid = user.uid;
          return response;
        })
      );;
  }

  getAllUsers() {
    return this._http.get<UserInterface>(`${environment.urlBase}/users.json`)
      .pipe(
        map(this.userArray)
      );
  }

  deleteUser(uid?: string) {
    return this._http.delete<Object>(`${environment.urlBase}/users/${uid}.json`);
  }

  private userArray(result: any) {
    if (result === null) return [];
    return Object.keys(result).map((key) => {
      const user: UserInterface = result[key];
      user.uid = key;
      return user;
    });
  }
  
}
