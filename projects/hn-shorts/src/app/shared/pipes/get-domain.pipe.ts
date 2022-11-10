import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDomain'
})
export class GetDomainPipe implements PipeTransform {

  transform(url: string): unknown {    
    let domain = '';
    if(url) {
      const urlDetails = new URL(url);
      domain = urlDetails?.hostname
    }
    return domain;
  }

}
