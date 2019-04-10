import execa from 'execa'
import R from 'ramda'



type Config<FetchOutput, MapOutput> = {
    interval: number,
    fetch: () => Promise<FetchOutput>,
    map: (input: FetchOutput) => MapOutput,
    compare: (previous: MapOutput, next: MapOutput) => boolean,
}
 

const config: Config<string, string[]> = {
    /// interval that we will check things (in ms)
    interval: 2000,
    
    /// step that runs every interval
    fetch: async () => {
        const { stdout } = await execa('npm', ['view', 'react-native', 'versions'])
        return stdout
    },

    /// maps to a value we want to use
    map: input => {
        let versions = input.split('\n')
        versions = versions.slice(versions.length - 11)
        versions = R.map((version: string) => {
            const parts = version.split('\'')
            return parts[1]
        })(versions)
        versions.pop() // extra new line
        return versions
    },

    compare: (previous, next) => false,
}

export default config
