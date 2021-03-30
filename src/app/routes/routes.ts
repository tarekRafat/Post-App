import { Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { CreatePostComponent } from "../create-post/create-post.component";
import { HomeComponent } from "../home/home.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "createpost", component: CreatePostComponent },
];
