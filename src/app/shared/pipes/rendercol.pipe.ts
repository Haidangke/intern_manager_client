import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'rendercol' })
export class RenderColPipe implements PipeTransform {
    transform(value: any) {
        console.log(value);
        return 'a'
        // return value.split(' ').slice(0, 2).join(' ') + '...';
    }
}
