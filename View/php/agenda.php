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
            <div class='col-md-4 treatmentDiv'></div>
        </div>
        <div class="col-md-8 timeDisplay">
        </div>


    </div>
        <div class="planTimeBtn btn-primary">
            <p>Plan afspraak</p>
        </div>
</div>
</body>

</html>