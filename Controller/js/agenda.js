$(document).ready(function () {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var hairdressers = [];
    var hairdresserId;
    var currentMonth = date.getMonth();
    var currentYear = date.getFullYear();
    var selectedStartTime;
    var selectedEndTime;
    var generatedPromise;
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
    $(".treatmentDiv, .namesDiv").on("click", function () {
        if ($(".nameOptions").val() != 'emptyOption' && $(".treatmentOptions").val() != 'emptyOption') {
            $(".timeDisplay").show();
            $(".planTimeBtn").show();
        }
    });





    function getDay() {
        date = this.id;
        var options = getOptions(date);
        $(".days , .nextMonth, .prevMonth, .monthTitle").hide();
        $(".agenda").html("<div class='singleDay'><h2>" + this.id + "</h2></div>");
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
                timeSelection();
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
            treatmentDiv.append("<select class='form-control treatmentOptions'>");
            $(".treatmentOptions").append("<option value='emptyOption'>Choose a treatment</option>");

            //here we generate the options for the treatments based upon an array sent via json
            for (var i = 0; i < optionsObj['treatments'].length; i++) {
                $(".treatmentOptions").append("<option value='" + optionsObj['treatments'][i]['id'] + "'>" + optionsObj['treatments'][i]['name'] + "</option>");
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
        var days = new Date(year, month++, 0).getDate();
        //Here i generate all the days and add an id corrosponding to the month and day to them.
        for (var i = 1; i <= days; i++) {
            $(".agenda").append("<div class='days' id='" + i + '-' + month + '-' + year + "'></div>");
            $("#" + i + '-' + month + '-' + year + "").html("<p class='daynumbers'>" + i + "</p>");
        }
        $(".days").on("click", getDay);
    }

//Here we enable the selection of a time, after the times are created so the classes are assigned properly

    function timeSelection(){
        $(".availableTime").each(function () {
            $(this).mousedown(function () {
                hairdresserId = $(this).parent().attr('id');
                if (selectedStartTime) {
                    $(".alertMessage").html("<p>Selecteer alstublieft maar eén tijd per afspraak.</p>");
                }
                selectedStartTime = $(this);
                $(".selectedTime").each(function () {
                    $(this).removeClass("selectedTime").addClass("availableTime");
                });
                $(this).removeClass("availableTime").addClass("selectedTime");
                $(".availableTime").on("mouseenter", function () {
                    $(this).removeClass("availableTime").addClass("selectedTime");
                });
            });
            $(this).mouseup(function () {
                selectedEndTime = $(this);
                $(".availableTime").off("mouseenter");
            });
        });

    }

    $(".planTimeBtn").on("click", function () {
        var treatmentId = $(".treatmentOptions").val();
        var starttime = selectedStartTime[0].id.substr(5).substr(-2);
        var endtime = selectedEndTime[0].id.substr(5).substr(-2);
        hairdresserId = hairdresserId.slice(5,6);
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
