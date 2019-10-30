$(document).ready(function () {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    var currentMonth = date.getMonth();
    var currentYear = date.getFullYear();
    createAgenda(date);


    $(".prevMonth").on("click", function () {
        var date = new Date(currentYear, currentMonth,15);
        date.setMonth(currentMonth - 1);
        createAgenda(date);
    });
    $(".nextMonth").on("click", function () {
        var date = new Date(currentYear, currentMonth,15);
        date.setMonth(currentMonth+1);
        createAgenda(date);
    });




    function getDay() {
        var options = getOptions(this.id);
        $(".days , .nextMonth, .prevMonth, .monthTitle").hide();
        $(".agenda").html("<div class='singleDay'><h2>" + this.id + "</h2></div>");
        $(".dayDisplay").show();
        date = this.id;

        $.ajax({
            type: "post",
            url: "../../controller/php/agenda.php",
            data: {getDay: true, date: this.id}
        }).done(function (responsedata) {
            var timeObj = JSON.parse(responsedata);
            Object.keys(timeObj).forEach(function (key) {
                var starttime = timeObj[key]['starttime'];
                var endtime = timeObj[key]['endtime'];
                var chair = timeObj[key]['chair'];
                for (var i = endtime; i >= starttime; i--) {
                    $("#chair" + chair + "" + i).removeClass("availableTime").addClass("occupiedTime");
                }
            });

        });
    }

    function getOptions(date){
        $.ajax({
            type: "post",
            url: "../../controller/php/agenda.php",
            data: {getOptions: true, date: date}
        }).done(function (responsedata) {
            $(".optionDisplay").show();
            const optionsDiv  = $('.optionsDiv');
            var optionsObj = JSON.parse(responsedata);
            optionsDiv.append("<select class='form-control nameOptions'>");
            $(".nameOptions").append("<option value='emptyOption'>Choose a name</option>");
            for(var i = 0; i< optionsObj.length;i++){
                $(".nameOptions").append("<option value='"+optionsObj[i]+"'>"+optionsObj[i]+"</option>");
            }
            optionsDiv.append("</select>");

        });
    }


    function createAgenda(date) {
        $(".agenda").html("");
        var year = date.getFullYear();
        var month = date.getMonth();
        currentMonth = month;
        currentYear = year;
        console.log(currentYear);
        //add the month to the top of the page
        $(".monthTitle").html("<h2>" + monthNames[month] + " " + year + "</h2>");
        //get amount of days in this month.
        var days = new Date(year, month+1, 0).getDate();
        //Here i generate all the days and add an id corrosponding to the month and day to them.
        for (var i = 1; i <= days; i++) {
            $(".agenda").append("<div class='days' id='" + i + '-' + month + '-' + year + "'></div>");
            $("#" + i + '-' + month + '-' + year + "").html("<p class='daynumbers'>" + i + "</p>");
        }
        $(".days").on("click", getDay);
    }

//this is for te selecting of a particular time on a certain day

    var selectedStartTime;
    var selectedEndTime;

    $(".availableTime").each(function () {
        $(this).mousedown(function(){
            if(selectedStartTime){
                $(".alertMessage").html("<p>Selecteer alstublieft maar eén tijd per afspraak.</p>");
            }
            selectedStartTime = $(this);
            $(".selectedTime").each(function(){
               $(this).removeClass("selectedTime").addClass("availableTime");
            });
            $(this).removeClass("availableTime").addClass("selectedTime");
            $(".availableTime").on("mouseenter", function(){
                $(this).removeClass("availableTime").addClass("selectedTime");
            });
        });
        $(this).mouseup(function(){
            selectedEndTime = $(this);
            $(".availableTime").off("mouseenter");
        });
    });


    $(".planTimeBtn").on("click", function () {
        var chair = selectedStartTime[0].id.substr(5)[0];
        var starttime = selectedStartTime[0].id.substr(5).substr(-2);
        var endtime = selectedEndTime[0].id.substr(5).substr(-2);
        $.ajax({
            type: "post",
            url: "../../controller/php/agenda.php",
            data: {setTime: true, starttime: starttime, endtime: endtime, chair: chair, date: date}
        }).done(function (responsedata) {
            location.reload();
        });
    });
});
