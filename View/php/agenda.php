<?php
include_once("header.php");
include_once("../../Controller/php/Agenda.php")
?>

<html>
<head>
    <script src="../../Controller/js/agenda.js"></script>
    <link rel="stylesheet" href="../css/agenda.css">

</head>
<body>
<div class="titleRow row">
    <div class="col-md-12">
        <div class="col-md-4">
            <div class="prevMonth btn-primary">
                <p>Previous month</p>
            </div>
        </div>
        <div class="col-md-4 monthTitle">
        </div>
        <div class="col-md-4">
            <div class="nextMonth btn-primary">
                <p>Next month</p>
            </div>
        </div>
    </div>
</div>
<div class="agenda">


</div>

<div class="row alertRow">
    <div class="alertMessage">
    </div>

</div>

<div class="row">
    <div class="col-md-12 dayDisplay">
        <div class="col-md-8 optionDisplay">
            <div class='col-md-2'></div>
            <div class='col-md-4 optionsDiv'></div>
            <div class='col-md-2'></div>
        </div>
        <div class="col-md-8 timeDisplay">
            <?php
            for ($y = 1; $y <= 4; $y++) {
                echo '<div class="col-md-2 timetable" id="chair""' . $y . '">';
                echo '<p class="chairTitle">Chair ' . $y . '</p>';
                for ($i = 14; $i <= 36; $i++) {
                    $alltime = $i * 30;
                    $hour = floor($alltime / 60);
                    $minutes = $alltime % 60;
                    if ($minutes == 0) {
                        $minutes = '00';
                    }
                    $minutes = ':' . $minutes;
                    if ($hour < 10) {
                        $hour = '0' . $hour;
                    }
                    $time = $hour . '' . $minutes;
                    echo '<div id="chair' . $y . $i . '" class="timeline availableTime"><p>' . $time . '</p></div>';
                }
                echo '</div>';
            }
            ?>


    </div>
        <div class="planTimeBtn btn-primary">
            <p>Plan afspraak</p>
        </div>
</div>
</body>

</html>