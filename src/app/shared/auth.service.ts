import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUserLogin } from "../model/login";
import { ILoginSuccess } from "../model/success.login";
import { IUser } from "../model/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signupUser(user: IUser) {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post("http://localhost:3000/users", user, options);
  }
  loginUser(user: ILoginSuccess): Observable<ILoginSuccess> {
    const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" }),
    };
    return this.http.post<ILoginSuccess>(
      "http://localhost:3000/users/login",
      user,
      options
    );
  }
  loggedIn() {
    return !!localStorage.getItem("id_token");
  }
  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }
}
