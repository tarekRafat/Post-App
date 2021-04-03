import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { IPost } from "../model/post";
import { HttpService } from "../shared/http.service";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"],
})
export class CreatePostComponent implements OnInit {
  post: boolean;
  myPosts: IPost[];
  title: string;
  body: string;
  update: boolean;
  id: number;
  constructor(
    private http: HttpService,
    private routes: Router,
    private router: ActivatedRoute
  ) {}
  ngOnInit() {
    if (this.routes.url !== "/createpost") {
      const postID = this.router.snapshot.params.id;
      this.http.getPost(postID).subscribe(
        (posts) => {
          posts.forEach((post) => {
            let { post_id, body, title } = post;
            this.id = post_id;
            this.body = body;
            this.title = title;
          });
        },
        (error) => console.log(error)
      );
    }
  }

  create(newPost: IPost) {
    if (!this.id) {
      this.http.createPost(newPost).subscribe(() => {
        this.routes.navigate(["/"]);
      });
    } else {
      this.http.updatePost(this.id, newPost).subscribe(() => {
        this.routes.navigate(["/"]);
      });
    }
  }
}
