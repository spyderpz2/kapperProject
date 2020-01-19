$(document).ready(function () {

    if(confirm("\t\t\t\tAccepteert u cookies ? \n\n" +
        " De cookies zullen worden gebruikt om de informatie \n " +
        "van u gemaakte afspraak op te slaan zodat u deze later weer kunt verwijderen")){
    }else{
        window.location.replace('home.php');
    }
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var selected = false;
    var hairdressers = [];
    var treatments = [];
    var hairdresserId;
    var currentMonth = date.getMonth();
    var currentYear = date.getFullYear();
    var selectedStartTime;
    var selectedEndTime;
    createAgenda(date);


    $(".prevMonth").on("click", function () {
        var date = new Date(currentYear, currentMonth, 15);
        date.setMonth(currentMonth - 1);
        createAgenda(date);
    });
    $(".nextMonth").on("click", function () {
        var date = new Date(currentYear, currentMonth, 15);
        date.setMonth(currentMonth + 1);
        createAgenda(date);
    });






    function getDay() {
        date = this.id;
        var options = getOptions(date);
        $(".days , .nextMonth, .prevMonth, .monthTitle").hide();
        $(".agenda").html("<div class='singleDay'><h2>" + this.id + "</h2></div>");
        $(".agenda").css("margin-bottom", "2vh");
        $(".dayDisplay").show();
        var timeDisplay = $(".timeDisplay");
        for (var y = 1; y <= 4; ++y) {
            timeDisplay.append('<div class="col-md-2 timetable" id="chair' + y + '">' +
                '<p class="chairTitle">' + hairdressers[y - 1] + '</p>');
            for (var i = 14; i <= 36; i++) {
                var alltime = i * 30;
                var hour = Math.floor(alltime / 60);
                var minutes = alltime % 60;
                if (minutes == 0) {
                    minutes = '00';
                }
                minutes = ':' + minutes;
                if (hour < 10) {
                    hour = '0' + hour;
                }
                var time = hour + '' + minutes;
                $("#chair" + y).append('<div id="chair' + y + i + '" class="timeline availableTime"><p>' + time + '</p></div>');
            }
            timeDisplay.append('</div>');
            treatmentSelection();
        }
        $.ajax({
            type: "post",
            url: "../../controller/php/agenda.php",
            data: {getDay: true, date: date}
        }).done(function (responsedata) {
            if (responsedata) {
                var timeObj = JSON.parse(responsedata);
            }
            Object.keys(timeObj).forEach(function (key) {
                var starttime = timeObj[key]['starttime'];
                var endtime = timeObj[key]['endtime'];
                var hairdresserId = timeObj[key]['hairdresserId'];
                for (var x = endtime; x >= starttime; x--) {
                    $("#chair" + hairdresserId + "" + x).removeClass("availableTime").addClass("occupiedTime");
                }
            });

        }).done(checkDeletable(date));
    }

    function checkDeletable(date){
        $.ajax({
            type: "post",
            url: "../../controller/php/agenda.php",
            data: {checkDeletable: true, date: date}
        }).done(function (responsedata){
            var removeAbleTimes = JSON.parse(responsedata).substr(1).split("_");
            removeAbleTimes.forEach(function(item){
                var deletableStartTime = item.split("-");
                var deletableEndTime = deletableStartTime[1].toString().slice(5,8);
                deletableStartTime = deletableStartTime[0].toString().slice(5,8);
                var starttime = deletableStartTime;
                for(deletableStartTime; deletableStartTime <= deletableEndTime; deletableStartTime++){
                    $("#chair"+deletableStartTime+"").addClass("removeAbleTime").data({"starttime":starttime,"endtime":deletableEndTime});
                }
            });

        });
    }


    function getOptions(date) {
        $.ajax({
            type: "post",
            url: "../../controller/php/agenda.php",
            data: {getOptions: true, date: date}
        }).done(function (responsedata) {
            $(".optionDisplay").show();
            const namesDiv = $('.namesDiv');
            const treatmentDiv = $('.treatmentDiv');
            var optionsObj = JSON.parse(responsedata);
            namesDiv.append("<select class='form-control nameOptions'>");
            $(".nameOptions").append("<option value='emptyOption'>Choose a hairdresser</option>");

            //here we generate the options for the hairdressers based upon an array sent via json
            for (var i = 0; i < optionsObj['names'].length; i++) {
                $(".nameOptions").append("<option value='" + optionsObj['names'][i]['id'] + "'>" + optionsObj['names'][i]['name'] + "</option>");
            }
            namesDiv.append("</select>");
            treatmentDiv.append("<select id='treatmentOptions' class='form-control treatmentOptions'>");
            $(".treatmentOptions").append("<option value='emptyOption'>Choose a treatment</option>");

            //here we generate the options for the treatments based upon an array sent via json
            for (var i = 0; i < optionsObj['treatments'].length; i++) {
                var treatmentId = optionsObj['treatments'][i]['id'];
                var treatmentName = optionsObj['treatments'][i]['name'];
                var treatmentDuration = optionsObj['treatments'][i]['duration'];
                treatments[treatmentId] = {name:treatmentName, duration:treatmentDuration};
                $(".treatmentOptions").append("<option value='" + treatmentId + "'>" + treatmentName + "</option>");
            }
            treatmentDiv.append("</select>");

        });
    }


    function createAgenda(date) {
        $(".agenda").html("");
        var year = date.getFullYear();
        var month = date.getMonth();
        currentMonth = month;
        currentYear = year;
        // request hairdressernames
        $.ajax({
            type: "post",
            url: "../../controller/php/agenda.php",
            data: {getHairdresserNames: true}
        }).done(function (responsedata) {
            var i = 0;
            var optionsObj = JSON.parse(responsedata);
            optionsObj.forEach(function(){
                hairdressers[i] = optionsObj[i];
                i++;
            });
        });

        //add the month to the top of the page
        $(".monthTitle").html("<h2>" + monthNames[month] + " " + year + "</h2>");
        //get amount of days in this month.
        var days = new Date(year, month+1, 0).getDate();
        //Here i generate all the days and add an id corrosponding to the month and day to them.
        for (var i = 1; i <= days; i++) {
            $(".agenda").append("<div class='days' id='" + i + '-' + (month+1) + '-' + year + "'></div>");
            $("#" + i + '-' + (month+1) + '-' + year + "").html("<p class='daynumbers'>" + i + "</p>");
        }
        $(".days").on("click", getDay);
    }

//Here we enable the selection of a time, after the times are created so the classes are assigned properly
    function treatmentSelection(){
        $(".treatmentDiv").on("change",'#treatmentOptions', function(){
            var selectedTreatment = $(this).find(":selected").val();
            if(selectedTreatment == 'emptyOption'){
                var duration = 0;
            }else{
                var duration = treatments[selectedTreatment].duration;
            }
            timeSelection(duration);
        });
    }
    // this enables the possiblity of a treament being any length and still working.
    function timeSelection(duration){
        var available = true;
        $(".availableTime").unbind("mouseenter");
        $(".availableTime").each(function () {
            $(this).mouseenter(function (){
                if(!selected){
                    var id = $(this)[0].id;
                    selectedStartTime = parseInt(id.substr(id.length - 3));
                    selectedEndTime = selectedStartTime + duration;
                    var loopTime = selectedStartTime + duration -1;
                    if(loopTime.toString().substr(-2) <= 36 && $("#chair"+loopTime).hasClass("availableTime")){
                        for(var i = selectedStartTime; i <= loopTime; i++){
                            if($("#chair" + i).hasClass("occupiedTime")){
                                available = false;
                                $(".availableTime").css("background-color", "white");
                                $(".occupiedTime").css("background-color", "red");
                                $(".timeShadow").removeClass("timeShadow");
                                return;
                            }else{
                                available = true;
                            }
                            $("#chair" + i).addClass("timeShadow");
                            $(this).on('click', function(){
                                if(!available) return;
                                for(var y = selectedStartTime; y <= loopTime; y++) {
                                    $("#chair" + y).css('background-color', 'green');
                                }
                                $(".planTimeBtn").show();
                                $(".availableTime").removeClass("timeShadow");
                                selected = true;
                                $(".availableTime").on('click', function(){
                                    selected = false;
                                    $(".availableTime").css("background-color", "white");
                                    $(".occupiedTime").css("background-color", "red");
                                    $(".planTimeBtn").hide();
                                });
                            });
                        }
                    }


                }
            });
            $(this).mouseleave(function(){
                if(!selected) {
                    $(".availableTime").removeClass("timeShadow");
                }
            });

        });

    }
    $(".timeDisplay").on("click",".timetable > .occupiedTime", function(){
        $(".removeAbleTime").on("click", function(){
            $(".removeAbleTime").css("background-color", "red");
            var starttime = $(this).data("starttime");
            var endtime = $(this).data("endtime");
            for(var i = starttime; i <= endtime; i++){
                $("#chair"+ i).css("background-color","darkred");
            }
            $(".removeTimeBtn").show();
            $(".removeTimeBtn").on("click", function(){
                $.ajax({
                    type: "post",
                    url: "../../controller/php/agenda.php",
                    data: {
                        removeTime: true,
                        starttime: starttime,
                        endtime: endtime,
                        date: date
                    }
                }).done(function (responsedata) {
                    location.reload();
                });
            });
        });
    });


    $(".planTimeBtn").on("click", function () {
        var treatmentId = $(".treatmentOptions").val();
        var starttime = selectedStartTime.toString().substr(1);
        var endtime = selectedEndTime.toString().substr(1)-1;
        hairdresserId = selectedStartTime.toString().slice(0,1);
        $.ajax({
            type: "post",
            url: "../../controller/php/agenda.php",
            data: {
                setTime: true,
                treatment: treatmentId,
                hairdresser: hairdresserId,
                starttime: starttime,
                endtime: endtime,
                date: date
            }
        }).done(function (responsedata) {
            location.reload();
        });
    });
});

