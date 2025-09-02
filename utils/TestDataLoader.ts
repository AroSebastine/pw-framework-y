import * as path from 'path'
import * as fs from 'fs'


export function loadTestData(moduleName: string) {    

    if (!moduleName || typeof moduleName !== 'string') {
        throw new Error('Module name is required and must be a string')
    }

    const env = process.env.TEST_ENV || 'dev'
    const filepath = path.resolve(__dirname, `../test-data/${moduleName}.json` )

    if(!fs.existsSync(filepath)) {
        throw new Error(`Test data file does not exist: ${filepath}`)
    }

    const testDataContent = JSON.parse(fs.readFileSync(filepath, 'utf-8'))

    if(!testDataContent[env]) {
        throw new Error(`Test data doesn't exist for the env: ${env} & module: ${moduleName}` )        
    }
    // console.log(testDataContent[env]);
    return testDataContent[env]
    
    
}