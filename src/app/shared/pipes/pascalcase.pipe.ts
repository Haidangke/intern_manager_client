import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'pascalcase'
})
export class PascalCasePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/(\w)(\w*)/g, function (g0, g1, g2) {
      return g1.toUpperCase() + g2.toLowerCase()
    })
  }
}
