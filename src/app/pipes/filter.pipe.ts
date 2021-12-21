import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from '../models/Table';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  /**
   *
   * @param texts {IPost[]} - the array of texts to filter
   * @param query {string} - the texts to look for
   * @param column {'body' | 'title'} - the body or title of the IPost to apply the filter to
   * @returns {IPost[]}
   */
  transform(texts: IPost[], query: string, column: 'body' | 'title'): IPost[] {
    // convert the space-delimited string of terms to fitler on into an array
    const _query = query.split(' ');
    // all searchterms should occur in te returned text
    return texts.filter((ob: IPost) =>
      _query.every((q: string) => ob[column].indexOf(q) > -1)
    );
  }
}
