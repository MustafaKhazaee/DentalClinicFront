import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'capitalizeFirstLetter' })
export class CapitalizeFirstLetterPipe implements PipeTransform {
  transform = (a: string) : string => `${a.charAt(0).toUpperCase()}${a.slice(1)}`;
}
