import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPost } from "../model/post";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  postsUrl: string = "http://localhost:3000/posts";
  constructor(private http: HttpClient) {}

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.postsUrl, {
      headers: new HttpHeaders({
        Accept: "applicarion/json",
      }),
    });
  }
  getPost(id): Observable<[IPost]> {
    return this.http.get<[IPost]>(`http://localhost:3000/posts/${id}`, {
      headers: new HttpHeaders({
        Accept: "application/json",
      }),
    });
  }

  createPost(values): Observable<void> {
    return this.http.post<void>("http://localhost:3000/posts", values, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }
  updatePost(id, values): Observable<void> {
    return this.http.put<void>(`http://localhost:3000/posts/${id}`, values, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }
  deletePost(id): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/posts/${id}`);
  }
}
