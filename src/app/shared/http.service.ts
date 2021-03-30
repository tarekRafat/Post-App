import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { createPostfix } from "typescript";
import { IPost } from "../post";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  postsUrl: string = "http://localhost:3000/posts";
  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.postsUrl);
  }

  createPost(values) {
    return this.http.post("http://localhost:3000/posts", values);
  }
}
