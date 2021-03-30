import { Component, OnInit } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { routes } from "../routes/routes";

import { HttpService } from "../shared/http.service";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"],
})
export class CreatePostComponent implements OnInit {
  post: boolean;
  constructor(private http: HttpService, private routes: Router) {}

  ngOnInit() {}
  create(values) {
    // this.http.createPost(values).subscribe((data) => {
    //   this.routes.navigate(["/"]);
    // });
    console.log(values);
  }
}
