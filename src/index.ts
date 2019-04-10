import { merge, of, timer } from 'rxjs'
import { scan, tap, map, flatMap, timeInterval, pairwise, take } from 'rxjs/operators'

import config from './config'


(async () => {
    // of(1).pipe(

    timer(0, 2000).pipe(
        take(2),
        flatMap(config.fetch),
        map(config.map),
        pairwise(),
        map(([p, n]) => config.compare(p, n)),
        tap(console.log),
    ).subscribe()


    console.log('oka')
})()
