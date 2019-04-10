const config = require('./config'); // js sucks


(async () => {
    const fetchOutput = await config.fetch()
    const mapOutput = config.map(fetchOutput)
    const compareOutput = config.compare(mapOutput)



    // .pipe(
    //     map(fetch)
    //     map(map)
    //     scan(compare),
    // )

console.log(mapOutput)
console.log(compareOutput)
console.log('ok')
})()
