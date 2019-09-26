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
<div class="row">
    <div class="col-md-12">
        <div class="col-md-4">

        </div>
        <div class="col-md-4 monthTitle">
        </div>
        <div class="col-md-4">

        </div>
    </div>
</div>
<div class="agenda">


</div>
<div class="row">
    <div class="col-md-12 dayDisplay">
        <div class="col-md-8 timeDisplay">
            <div class="col-md-2 timetable" id="chair1">
                <?php
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
                    echo '<div id="chair1' . $i . '" class="timeline"><p>' . $time . '</p></div>';
                }
                ?>
            </div>
            <div class="col-md-2 timetable" id="chair2">
                <?php
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
                    echo '<div id="chair2' . $i . '" class="timeline"><p>' . $time . '</p></div>';
                }
                ?>
            </div>
            <div class="col-md-2 timetable" id="chair3">
                <?php
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
                    echo '<div id="chair3' . $i . '" class="timeline"><p>' . $time . '</p></div>';
                }
                ?>
            </div>
            <div class="col-md-2 timetable" id="chair4">
                <?php
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
                    echo '<div id="chair4' . $i . '" class="timeline"><p>' . $time . '</p></div>';
                }
                ?>
            </div>
        </div>
    </div>
</div>
</body>

</html>