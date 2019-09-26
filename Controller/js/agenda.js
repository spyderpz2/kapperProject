$(document).ready(function () {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    createAgenda();


    $(".days").on("click", function () {
        $(".days").hide();
        $(".agenda").html("<div class='singleDay'><h2>" + this.id + "</h2></div>");
        $(".dayDisplay").show();

        $.post('../../controller/php/Agenda.php', {
            date: this.id
        }).done(function (responsedata) {
            var timeObj = JSON.parse(responsedata);
            Object.keys(timeObj).forEach(function (key) {
                var starttime = timeObj[key]['starttime'];
                var endtime = timeObj[key]['endtime'];
                var chair = timeObj[key]['chair'];
                for (var i = endtime; i >= starttime; i--) {
                    $("#chair" + chair + "" + i).css('background-color', 'red');
                }
            });

        });
    });


    function createAgenda() {
        var date = new Date();
        var month = date.getMonth() + 1;
        //add the month to the top of the page
        $(".monthTitle").html("<h2>" + monthNames[month - 1] + "</h2>");
        var year = date.getYear() + 1900;
        //get amount of days in this month.
        var days = new Date(date.getYear(), month, 0).getDate();
        //Here i generate all the days and add an id corrosponding to the month and day to them.
        for (var i = 1; i <= days; i++) {
            $(".agenda").append("<div class='days' id='" + i + '-' + month + '-' + year + "'></div>");
            $("#" + i + '-' + month + '-' + year + "").html("<p class='daynumbers'>" + i + "</p>");

        }
    }


    //
    // $(".agenda").html("");
    // $(".days").css("display", "inline-block");
    // var date = new Date();
    // if (firsttime) {
    //     month = date.getMonth() + 1;
    // }
    // var days = daysinMonth(month, date.getYear());
    // if (firsttime) {
    //     year = date.getYear().toString().substring(1, date.getYear().length);
    //     firsttime = false;
    // }
    // console.log(month, year);
    // $(".agendatitlediv").html("<h1 class='title'>" + monthNames[month - 1] + "</h1>");
    // //Ophalen van de maand aan informatie
    // $.ajax({
    //     type: "post",
    //     url: "../../controller/php/persoon.php",
    //     data: {agenda: true, month: month},
    //     dataType: 'json',
    //     success: function (data) {
    //
    //         $('.appointmentpagebtn').show();
    //         $('.daypagetitle').show();
    //
    //         if (month < 10) {
    //             month = 0 + '' + month;
    //         }
    //
    //         //adding the apointment name
    //         if (data[0] !== false) {
    //             for (var y = 1; y <= data.length; y = y + 2) {
    //                 var daymonthnum = data[y].slice(5);
    //                 daymonthnum = daymonthnum.replace("-", "");
    //                 $('#' + daymonthnum + '').append("<p>" + data[y - 1] + "</p>");
    //             }
    //         }
    //         // here i get the names of the logged in persons friends
    //         getfriends();
    //         //here i throw arround the value of the users friends so that you can select different sizes rooms or add more options without losing the
    //         //possible friend or having to re query the database
    //         $(document).on("click", '.locationoption', function () {
    //             //all the multiple times used functions are defined in the functions.js file
    //             var location = $(".location option:selected").val();
    //             if (location == 'DCschaikweg') {
    //                 $(".friendoptionsdiv").hide();
    //                 $(".friendbold").hide();
    //                 $(".sizeroom").show();
    //                 $(document).on("click", '.sizeroomoption', function () {
    //                     $(".timeline").addClass("correcttimes");
    //                     // dit is iets nieuws het is net als callbacks maar dan met promises en hierdoor kan je zorgen dat
    //                     // de rest van je code wacht op de eerdere... dit is ook de eerste keer dat ik er mee werk dus ben benieuwd// hoe het precies werkt.
    //                     // wat hier precies gebeurt is dat er een object promise is en die heeft de functie resolve wat in princiepe
    //                     // gewoon betekent dat hij een resolve wil krijgen en deze in promise zet voor later te checken
    //                     var promise = Promise.resolve(getpossiblerooms(clickeddate));
    //                     // en dan de then checkt of de promise gedaan is en zo wel dan pakt hij de response van de functie die je in je
    //                     // resolve invult en cast hij die in de variabel response.
    //                     promise.then(function (response) {
    //                         roomtimes = response;
    //                         // hierin moet dan het maken van het dagrooster zodat de tijden en ruimtes van die dag wel bekend zijn
    //                         // hier checken we de tijden voor het maken van de tijdlijn
    //                         var starttime = Math.round(starttimeint / 30);
    //                         var endtime = Math.round(endtimeint / 30);
    //                         var timeincrementer = 0;
    //                         var isDragging = false;
    //                         var selected = false;
    //                         //hier checken we of ze in de start tijd van de user zitten
    //                         $(".timeline").each(function () {
    //                             if (timeincrementer >= starttime && timeincrementer <= endtime) {
    //                                 $(this).addClass("correcttimes");
    //                             } else {
    //                                 $(this).removeClass("correcttimes");
    //                                 $(this).addClass("wrongtimes");
    //                             }
    //                             timeincrementer++;
    //                         });
    //                         // hier checken we de tijden waar de geselecteerde ruimte al gekozen is
    //                         roomtimes.forEach(function (roomtime) {
    //                             if (roomtime[0] == roomsize) {
    //                                 for (var i = roomtime[1] / 30; i <= roomtime[2] / 30; i++) {
    //                                     $("#" + i + "").removeClass("correcttimes");
    //                                     $("#" + i + "").addClass("wrongtimes");
    //                                 }
    //                             }
    //                         });
    //                         // ik voel me daadwerkelijk schuldig voor de code hier in deze each function
    //                         // als u een beter oplossing ziet zou ik dit graag willen weten
    //                         // het is over het hoveren en dan die een kleur geeft en anders geen kleur en de kleur
    //                         // laten staan alleen niet op weer nieuwe klik omdat je dan nieuwe selectie maakt
    //                         var timelines = $(".correcttimes").each(function () {
    //                             $(this).hover(function () {
    //                                 $(this).mousedown(function () {
    //                                     if (selected) {
    //                                         $(".correcttimes").css({"background-color": 'white'});
    //                                     }
    //                                     isDragging = true;
    //                                     selectedstarttime = $(this);
    //                                     $(this).css({'background-color': 'green'});
    //                                 });
    //                                 $(".timeline").mouseup(function () {
    //                                     if (selected) {
    //                                         selected = false;
    //                                     } else {
    //                                         selected = true;
    //                                     }
    //                                     isDragging = false;
    //                                 });
    //                                 $(this).mouseup(function () {
    //                                     selectedendtime = $(this);
    //                                 });
    //                                 if (isDragging) {
    //                                     $(this).css({'background-color': 'green'});
    //                                 } else {
    //                                     if (!selected) {
    //                                         $(this).css({"background-color": 'gainsboro'})
    //                                     }
    //                                 }
    //                             }, function () {
    //                                 $(".wrongtimes").hover(function () {
    //                                     $(".wrongtimes").mouseup(function () {
    //                                         isDragging = false;
    //                                         selected = false;
    //                                     });
    //                                 });
    //                                 if (!isDragging) {
    //                                     if (!selected) {
    //                                         $(this).css({"background-color": 'white'});
    //                                     }
    //                                 }
    //                             });
    //
    //                         });
    //                         // hier checken we of de ruimtes niet al bezet zijn voor die dag en datum en ruimte
    //
    //                     });
    //                     $(".friendoptionsdiv").show();
    //                     var sizeroom = $(".sizeroom option:selected").val();
    //                     if (sizeroom == '') {
    //                         $(".dayDisplay").hide();
    //                         $(".friendoptionsdiv").hide();
    //                     } else {
    //                         roomsize = sizeroom;
    //                         if ($(".friendoptions0").val() == '') {
    //                             $(".friendoptionsdiv").hide();
    //                             $(".dayDisplay").show();
    //                             console.log("friendoptions is empty");
    //                             friendoptionhtml = '';
    //                         } else {
    //                             for (var i = 0; i < parseInt(sizeroom, 10); i++) {
    //                                 friendoptionhtml += "<select class='friendoptions' id='friendoptions" + i + "'>" + $(".friendoptions").html() + "</select>";
    //                             }
    //                             $(".friendoptionsdiv").html(friendoptionhtml);
    //                             $(".friendoptionsdiv").show();
    //                             $(".dayDisplay").show();
    //                         }
    //                     }
    //                 });
    //             } else if (location == '') {
    //                 $(".dayDisplay").hide();
    //                 $(".friendoptionsdiv").hide();
    //                 $(".friendbold").hide();
    //                 $(".sizeroom").hide();
    //             } else {
    //                 $(".sizeroom").hide();
    //                 $(".friendbold").show();
    //                 $(".dayDisplay").show();
    //                 $(".friendoptionsdiv").show();
    //                 $(".friendoptionsdiv").html("<select class='friendoptions' id='friendoptions" + 0 + "'>" + $(".friendoptions").html() + "</select>");
    //             }
    //             if (!addedempty) {
    //                 $(".friendoptions").prepend("<option class='emptyfriendoption' value=''></option>");
    //                 addedempty = true;
    //             }
    //         });
    //         // friendbold is the button you can press to add extra field in the other location option on the appointment page
    //         $(document).on("click", '.friendbold', function () {
    //             $(".friendoptionsdiv").append("<select class='friendoptions' id='friendoptions" + roomsize + "'>" + $(".friendoptions").html() + "</select>");
    //             roomsize++;
    //         });
    //         //adding the number
    //         //adding an event listener for each button
    //         var buttons = document.getElementsByClassName('days');
    //         for (var i = 0; i < buttons.length; i++) {
    //             buttons[i].addEventListener('click', function () {
    //                 $(".daypagetitle").html(this.id.substring(2) + '-' + monthNames[month - 1] + '-' + year);
    //                 clickedday = this.id;
    //                 agendapage.hide();
    //                 daypage.show();
    //                 var clickedyear = $('.daypagetitle').text();
    //                 clickedyear = clickedyear.slice(-2);
    //                 clickeddate = clickedyear + '' + clickedday;
    //                 $(".sizeroom").html('<option class="sizeroomoption" value=""></option><option class="sizeroomoption" value="3">3</option><option class="sizeroomoption" value="4">4</option>');
    //             });
    //         }
    //     }
    // });
});