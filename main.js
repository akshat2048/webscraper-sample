import Cheerio from "cheerio";
import { writeFileSync } from "fs";
import fetch from "node-fetch";
import html2json from "html2json";
import pretty from "pretty";

// getTabroomEntriesList
const getTabroomEntriesList = async (URL) => {

   const getRawData = (URL) => {
      return fetch(URL)
         .then((response) => response.text())
         .then((data) => {
            return data;
         });
   }

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

export default readParadigm = async (URL, tourneyName) => {
   const getRawData = (URL) => {
      return fetch(URL)
         .then((response) => response.text())
         .then((data) => {
            return data;
         });
   }
   
   const judges = []
   // return type String - this is the paradigm of the judge
   const recursiveChildSearch = function (element) {
      //console.log("Is element null - " + element.child == null)
      //console.log(JSON.stringify(element.child))
      //Base Case
      var strBuilder = "";
      if (element.child == null) {
         //the element has no children, i.e. it is the final option.
         //console.log("RETURN NULL");
         return "";
      } else {
         element.child.forEach(e => {
            if (e.text != null) {
               //console.log(JSON.stringify(e));
               //console.log("Line 71 - " + String(e.text).replace(/\t/g, ''))
               strBuilder += String(e.text).replace(/\t/g, '') + recursiveChildSearch(e);
            } else {
               strBuilder += recursiveChildSearch(e);
            }
         })
      }
      return strBuilder
   }

   const formatJudge = function(str) {
      var s = String(str)
      return s.replace(/\n/g, 'MXCFF');
   } 

   const getJudgeName = function (str) {
      var s = String(str)
      while(s.indexOf('MXCFF') == 0) {
         s = s.substring(5);
      }
      return s.substring(0, s.indexOf('MXCFF'))
   }

   const getJudgeSchool = function (str) {
      var s = String(str)
      while(s.indexOf('MXCFF') == 0) {
         s = s.substring(5);
      }
      s = s.substring(s.indexOf('MXCFF'))
      while(s.indexOf('MXCFF') == 0) {
         s = s.substring(5);
      }
      return s.substring(0, s.indexOf('MXCFF'))
   }

   const getJudgeParadigm = function (str) {
      var s = String(str)
      while(s.indexOf('MXCFF') == 0) {
         s = s.substring(5);
      }
      s = s.substring(s.indexOf('MXCFF'))
      while(s.indexOf('MXCFF') == 0) {
         s = s.substring(5);
      }
      s = s.substring(s.indexOf('MXCFF'))
      while(s.indexOf('MXCFF') == 0) {
         s = s.substring(5);
      }
      return s.substring(0)
   }

   await getRawData(URL).then(tabroomRawData => {
      const parsedData = Cheerio.load(tabroomRawData);
      const list = parsedData('.main')
      const listHTML = String(list.html())
      const listJSON = html2json.html2json(listHTML)
      // writeFileSync('output.json', JSON.stringify(listJSON), (err) => {
      //    console.log(err);
      // })
      //Linear Search through listJSON elements to find attr.class = ["paradigm", "ltborderbottom"]
      // var temp = null
      listJSON.child.forEach(element => {
         try {
            if (element.attr.class[0] == 'row') {
               const j = formatJudge(recursiveChildSearch(element))
               judges.push({
                  name: getJudgeName(j),
                  school: getJudgeSchool(j),
                  paradigm: getJudgeParadigm(j).replace(/MXCFF/g, '\n')
               });
            } 
         } catch (error) {
            //console.log(error)
         }
      })

      writeFileSync('' + tourneyName + '.json', JSON.stringify(judges), (err) => {
         console.log(err);
      })

      console.log(judges)
   })

   return judges;
}

// invoking the main function
//getTabroomEntriesList("https://www.tabroom.com/index/tourn/fields.mhtml?tourn_id=20058&event_id=173395");
readParadigm("https://www.tabroom.com/index/tourn/paradigms.mhtml?category_id=51287&tourn_id=20058", "jack_howe")