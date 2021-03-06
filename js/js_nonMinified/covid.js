function runCovid (shortName) {
    var state = shortName
    var stateLc = state.toLowerCase();
    //  console.log(state, "testing if it is still saved for COVID search");
 
     var queryURL = "https://api.covidtracking.com/v1/states/" + stateLc + "/daily.json";
     $.ajax({
         url: queryURL,
         method: "GET"
       })
       .then(function(response) {
     
        //  console.log(response, "Covid data for " + stateLc);
         var deathSevenDay = 0
         var positiveSevenDay = 0
         for (var i = 0; i < 7; i++) {
             
             var deathSevenDay = deathSevenDay + response[i].deathIncrease;
             var positiveSevenDay = positiveSevenDay + response[i].positiveIncrease;
 
             
         }
        //  console.log("death's over seven days", deathSevenDay, "positive cases over seven days", positiveSevenDay)
         var totalDeaths = response[6].death
         var precentDeathSev = (deathSevenDay / totalDeaths) * 100;
         var deaths = $("#deaths").text("   " + precentDeathSev.toFixed(2) + " %");
         $("#deaths").append(deaths);
         var hospitalizations = ((response[0].hospitalizedCurrently - response[6].hospitalizedCurrently) / response[6].hospitalizedCurrently) * 100;
         var hospitalizationsCg = $("#hospitalizations").text("   " + hospitalizations.toFixed(2) + " %");
         $("#hospitalizations").append(hospitalizationsCg);
         var percentageChangeSev = ( positiveSevenDay / response[6].positive) * 100;
         var percentageChange = $("#percentageChange").text("   " + percentageChangeSev.toFixed(2) + " %");
         $("#percentageChange").append(percentageChange);
         

        if (percentageChangeSev <= 1.9 && hospitalizations <= 1.9 && precentDeathSev <= 1.9) {
            console.log("Hello, this is working yellow")
            $("#card").css("background-color", "yellow")
            
        } else if (percentageChangeSev <= 4.9 && hospitalizations <= 4.9 && precentDeathSev <= 4.9) {
            console.log("step 2 is working orange")
            $("#card").css("background-color", "orange")

        } else {
            console.log("it's looking bad 5+")
            $("#card").css("background-color", "red")
        }

        $('#card').css("display", "block");
     });
 

 
 }