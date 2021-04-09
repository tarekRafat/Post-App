import { Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { AuthGuard } from "../auth.guard";
import { CreatePostComponent } from "../create-post/create-post.component";
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";
import { SignupComponent } from "../signup/signup.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "createpost",
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  { path: "update/:id", component: CreatePostComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
];
