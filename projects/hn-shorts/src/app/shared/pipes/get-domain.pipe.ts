import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDomain'
})
export class GetDomainPipe implements PipeTransform {

  transform(url: string): unknown {
    const urlDetails = new URL(url);
    return urlDetails?.hostname
  }

}
