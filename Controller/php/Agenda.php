<?php
include_once('../../Model/php/core.php');

$agenda =  new Agenda();

if(isset($_POST['getDay']) && $_POST['getDay']) {
    echo json_encode($agenda->getAgenda($_POST['date']));
}
if(isset($_POST['setTime']) && $_POST['setTime']) {
    echo json_encode($agenda->setTime($_POST['starttime'],$_POST['endtime'],$_POST['chair'],$_POST['date']));
}
if(isset($_POST['getOptions']) && $_POST['getOptions']){
    echo json_encode($agenda->getOptions($_POST['date']));
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
            $filledTime[$i]['chair'] = $row['chair'];
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
            $dresserNames[$i] = $row['name'];
            $i++;
        }
        return $dresserNames;
    }
    function setTime($starttime,$endtime,$chair,$date){
        global $pdo;
        $date = explode("-",$date);
        $date = $date[2].'-'.$date[1].'-'.$date[0];

        $agendaquery = $pdo->prepare("INSERT INTO agenda (chair, starttime, endtime, date) VALUES(:chair, :starttime, :endtime, :date)");
        $agendares = $agendaquery->execute(['date' =>$date, 'chair'=> $chair, 'starttime'=> $starttime, 'endtime'=>$endtime]);
        return true;
    }
}