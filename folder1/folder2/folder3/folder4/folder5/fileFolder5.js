import { readFileSync, writeFileSync } from 'fs'
import path from 'path';

export async function sayMyName(){

    const __dirname = path.isAbsolute(".")

    console.log(__dirname);

    const data = readFileSync("result.json", {
        encoding: 'utf-8'
    });

    const _data = {
        name: "something"
    }

    // const res = writeFileSync('result.json', JSON.stringify(_data), {
    //     encoding: 'utf-8'
    // })

    console.log(data);

    return "My name is suman"
}
