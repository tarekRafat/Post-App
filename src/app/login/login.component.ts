import { Component, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ILoginSuccess } from "../model/success.login";
import { AuthService } from "../shared/auth.service";
import * as moment from "moment";
import { EventEmitter } from "events";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  token: string;
  erroMessage: string;
  @Output() tokenEvent = new EventEmitter();
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit() {}
  login(user: ILoginSuccess) {
    this.tokenEvent.emit("foooo");
    this.auth.loginUser(user).subscribe(
      (res) => {
        localStorage.setItem("userID", JSON.stringify(res.results.user_ID));
        this.setSession(res);
        this.router.navigate(["/"]);
      },
      (err) => (this.erroMessage = err.error.message)
    );
  }
  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, "second");
    localStorage.setItem("id_token", authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }
}
