export function readParadigmWithKeywords(paradigm) {
    const layKeyWords = ["lay", "parent", "first time", "None", "Be Confident", "inexperienced"]
    const techKeyWords = ["competed at", "I am a flow judge", "I have been doing debate", "Debated for ", "competed in PF"]
    var isLay = 0;
    var isTech = 0;
    var paradigmStr = String(paradigm)
    paradigmStr = paradigmStr.replace(/\t/g, '').replace(/\n/g, '').toUpperCase();
    if (paradigmStr.length > 3000) isTech += 15;
    layKeyWords.forEach((element) => {
        if (paradigmStr.indexOf(element.toUpperCase()) != -1) {
            console.log("Found a lay indicator")
            isLay++;
        }
    })
    techKeyWords.forEach((element) => {
        if (paradigmStr.indexOf(element.toUpperCase()) != -1) {
            console.log("Found a tech indicator")
            isTech++;
        }
    })
    return isLay > isTech;
}

export function judgingPoolSummary(judges) {
    var lays = 0;
    var techs = 0;
    var totalJudges = 0;
    judges.forEach((judge) => {
        totalJudges++;
        if (judge.rating == "Tech") {
            techs++;
        } else {
            lays++;
        }
    })
    console.log("At this tournament, there were " + techs + " tech judges and " + lays + " lay judges out of a pool of " + totalJudges + " judges.")
}