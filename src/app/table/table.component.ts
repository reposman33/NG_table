import {
  Component,
  ElementRef,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPost } from '../models/Table';
import { fromEvent, Observable, ObservableInput, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  URL: string = 'https://jsonplaceholder.typicode.com/posts';
  posts: IPost[] = [];
  query: string = '';
  subscriptions: Subscription = new Subscription();

  constructor(private http: HttpClient) {
    this.subscriptions.add(
      this.getData().subscribe((res) => (this.posts = res))
    );
  }

  ngOnInit() {}

  log(val: any) {
    console.log(val);
  }

  getData() {
    return this.http.get<IPost[]>(this.URL).pipe(
      map((res: IPost[]) =>
        res.map((post: IPost) => {
          return {
            id: post.id,
            body: post.body,
            title: post.title,
          };
        })
      )
      // map((posts: IPost[]) =>
      //   posts.filter((post: IPost) =>
      //     this.searchQuery.split(' ').every(term =>
      //       post.body.split(' ').includes(term)
      //     )
      //   )
      // )
    );
  }
}
