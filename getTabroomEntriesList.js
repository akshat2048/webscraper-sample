import Cheerio from "cheerio";
import { writeFileSync } from "fs";
import fetch from "node-fetch";
import html2json from "html2json";

export async function getTabroomEntriesList(URL) {
    await getRawData(URL).then((tabroomRawData) => {
    const parsedData = Cheerio.load(tabroomRawData);
    const list = parsedData('#fieldsort')
    const teams = []
    list.children('tbody').children('tr').each(function (i, elem) {
        const v = parsedData(this).children('td')
        const text = String(v.text())
        var formattedText = text.replace(/\t/g, '').replace(/\n/g, 'MXCFF')
        formattedText = formattedText.substring(4, formattedText.length);

        var schoolName = ""
        var state = ""
        var names = ""
        var code = ""

        schoolName += formattedText.substring(1, formattedText.indexOf('MXCFF'))

        formattedText = formattedText.substring(formattedText.indexOf('MXCFF') + 10)
        state += formattedText.substring(0, formattedText.indexOf('MXCFF'))

        formattedText = formattedText.substring(formattedText.indexOf('MXCFF') + 10)
        names += formattedText.substring(0, formattedText.indexOf('MXCFF'))

        formattedText = formattedText.substring(formattedText.indexOf('MXCFF') + 10)
        code += formattedText.substring(0, formattedText.indexOf('MXCFF'))
        
        const pack = {
            schoolName : schoolName,
            state : state,
            names : names,
            code : code
        }

        teams.push(pack)
    });
    teams.forEach(element => {
        console.log(element.code)
    })
    })
};