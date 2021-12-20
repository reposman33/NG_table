import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from '../models/Table';

/**
 *  this pipe filters an array of IPosts.
 * Of every IPost the body or title (as defined in the calling template) is filtered
 * so that only those IPosts containing the searchTerms are kept.
 *  */
@Pipe({
  name: 'hilite',
})
export class HilitePipe implements PipeTransform {
  /**
   *
   * @param texts {IPost[]} - the array of IPosts containing text to filter
   * @param column {'body' | 'title'} - the column to apply the pipe to
   * @param searchTerm {string} - the searchterm(s) to hilite
   * @param klass  {string} - the class ('class' is a reserved word) to apply to the searchterm(s)
   * @returns {IPost[]}
   */
  transform(
    texts: IPost[],
    column: 'body' | 'title',
    searchTerm: string,
    klass: string
  ): IPost[] {
    return texts.map((text: IPost): IPost => {
      const RE = new RegExp(
        // multiple searchterms contain spaces. Convert string to a valid regular expression.
        `\\b${searchTerm.replace(/ /g, '\\b|\\b')}\\b`,
        'g'
      );

      // a replacer function is called for each occurrence of a searchterm
      const replace = (match: string) =>
        // wrap the searchterm with the specified class
        `<span class='${klass}'>${match}</span>`;

      // Either the body or the title can be a target, depending on the value of column
      const newText = text[column].replace(RE, replace);

      // return the text with hilited searchterms
      return {
        id: text.id,
        userId: text.userId,
        body: column === 'body' ? newText : text.body,
        title: column === 'title' ? newText : text.title,
      };
    });
  }
}
