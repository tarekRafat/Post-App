import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IPost } from "../model/post";
import { HttpService } from "../shared/http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  posts: IPost[] = [];
  errorMessage: string = "";
  sub: Subscription;
  constructor(private http: HttpService) {}

  ngOnInit() {
    this.sub = this.http.getPosts().subscribe({
      next: (posts) => (this.posts = posts),
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  delete(id, myPost) {
    this.posts = this.posts.filter((post) => post !== myPost);
    this.http.deletePost(id).subscribe();
  }
}
