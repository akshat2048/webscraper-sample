import { writeFileSync } from 'fs'
import readline from 'readline'
import { readParadigm } from './readParadigm.js'
import { readParadigmWithKeywords, judgingPoolSummary } from './keywords.js'

const r = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log("Starting training program...")
//https://www.tabroom.com/index/tourn/paradigms.mhtml?category_id=51287&tourn_id=20058
r.question("Enter paradigm list URL: ", (url) => {
    r.question("Enter tournament name: ", (name) => {
        console.log("Loading information for " + name + " from " + url);
        readParadigm(url, name).then((judges) => {
            //Promise resolved
            judges.forEach((judge) => {
                const formattedJudgeString = "Name : " + judge.name + "\nSchool: " + judge.school + "\nParadigm: " + judge.paradigm;
                // r.question("Is the following judge lay - Y/N\n" + formattedJudgeString, (response) => {
                //     //Save response for training.
                //     if (response == 'Y') {
                //         judge.rating = "Lay"
                //     } else if (response == 'N') {
                //         judge.rating = "Tech"
                //     }
                //     r.question("Do you want to stop? - Y/N\n", (response) => {
                //         if (response == 'Y') {
                //             r.close()
                //         }
                //     })
                // })
                judge.rating = readParadigmWithKeywords(judge.paradigm) ? "Lay" : "Tech"
                //console.log("Name: " + judge.name + "\nRating: " + judge.rating);
            })

            writeFileSync(name + '.json', JSON.stringify(judges), (error) => {
                console.log(error)
            })
            console.log(judgingPoolSummary(judges))
            r.close();
        })
    })
})