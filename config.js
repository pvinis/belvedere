const execa = require('execa')
const R = require('ramda')


const config = {
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
        versions = R.map(version => {
            const parts = version.split('\'')
            return parts[1]
        })(versions)
        versions.pop() // extra new line
        return versions
    },
}

module.exports = config
