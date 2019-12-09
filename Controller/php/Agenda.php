<?php
include_once('../../Model/php/core.php');

$agenda =  new Agenda();

if(isset($_POST['getDay']) && $_POST['getDay']) {
    echo json_encode($agenda->getAgenda($_POST['date']));
}
if(isset($_POST['setTime']) && $_POST['setTime']) {
    echo json_encode($agenda->setTime($_POST['starttime'],$_POST['endtime'],$_POST['date'],$_POST['treatment'],$_POST['hairdresser']));
}
if(isset($_POST['getOptions']) && $_POST['getOptions']){
    echo json_encode($agenda->getOptions($_POST['date']));
}
if(isset($_POST['getHairdresserNames']) && $_POST['getHairdresserNames']){
    echo json_encode($agenda->getHairdresserNames());
}


class Agenda{
    function getAgenda($date){
        global $pdo;
        $date = preg_split ("/\-/", $date);
        $date = $date[2].'-'.$date[1].'-'.$date[0];

        $agendaquery = $pdo->prepare("SELECT * FROM agenda WHERE date = :date");
        $agendares = $agendaquery->execute(['date' =>$date]);
        $i = 0;
        while($row = $agendaquery->fetch()){
            $filledTime[$i]['starttime'] = $row['starttime'];
            $filledTime[$i]['endtime'] = $row['endtime'];
            $filledTime[$i]['hairdresserId'] = $row['hairdresserId'];
            $i++;
        }

        return $filledTime;
    }
    function getOptions($date){
        global $pdo;
        $date = preg_split ("/\-/", $date);
        $date = $date[2].'-'.$date[1].'-'.$date[0];
        $dresserNamequery = $pdo->prepare("SELECT * FROM hairdresser");
        $dresserNameres = $dresserNamequery->execute();
        $i = 0;
        while($row = $dresserNamequery->fetch()){
            $options['names'][$i]['id'] = $row['id'];
            $options['names'][$i]['name'] = $row['name'];
            $i++;
        }
        $treatmentquery = $pdo->prepare("SELECT * FROM treatment");
        $treatmentres = $treatmentquery->execute();
        $i = 0;
        while($row = $treatmentquery->fetch()){
            $options['treatments'][$i]['name'] = $row['name'];
            $options['treatments'][$i]['id'] = $row['id'];
            $i++;
        }
        return $options;
    }
    function setTime($starttime,$endtime,$date,$hairdresser,$treatment){
        global $pdo;
        $date = explode("-",$date);
        $date = $date[2].'-'.$date[1].'-'.$date[0];

        $agendaquery = $pdo->prepare("INSERT INTO agenda ( starttime, endtime, date, hairdresserId, treatmentId) VALUES( :starttime, :endtime, :date, :treatment, :hairdresser)");
        $agendares = $agendaquery->execute(['date' =>$date, 'starttime'=> $starttime, 'endtime'=>$endtime, 'treatment'=>$treatment, 'hairdresser'=>$hairdresser]);
        return true;
    }
    function getHairdresserNames(){
        global $pdo;
        $hairdressers = array();
        $hairdresserquery = $pdo->prepare("SELECT * FROM hairdresser");
        $hairdresserres = $hairdresserquery->execute();
        while($row = $hairdresserquery->fetch()){
        array_push( $hairdressers, $row['name']);
        }
        return $hairdressers;
    }
}