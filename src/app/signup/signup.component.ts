import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IUser } from "../model/user";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  currentUser: IUser;
  constructor(private userAuth: AuthService, private router: Router) {}

  ngOnInit() {}
  signup(user: IUser) {
    this.userAuth.signupUser(user).subscribe(
      (data) => {
        this.router.navigate(["/"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
