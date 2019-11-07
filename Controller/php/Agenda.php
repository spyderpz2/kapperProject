<?php
include_once('../../Model/php/core.php');

$agenda =  new Agenda();

if(isset($_POST['getDay']) && $_POST['getDay']) {
    echo json_encode($agenda->getAgenda($_POST['date']));
}
if(isset($_POST['setTime']) && $_POST['setTime']) {
    echo json_encode($agenda->setTime($_POST['starttime'],$_POST['endtime'],$_POST['chair'],$_POST['date'],$_POST['treatment'],$_POST['hairdresser']));
}
if(isset($_POST['getOptions']) && $_POST['getOptions']){
    echo json_encode($agenda->getOptions($_POST['date']));
}
class Agenda{
    function getAgenda($date){
        global $pdo;
        $date = preg_split ("/\-/", $date);
        $date = $date[2].'-'.$date[1].'-'.$date[0];
        $agendaQuery = $pdo->prepare("SELECT * FROM agenda WHERE date = :date");
        $agendaResults = $agendaQuery->execute(['date' =>$date]);
        $i = 0;
        while($row = $agendaQuery->fetch()){
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
        $dresserNameQuery = $pdo->prepare("SELECT * FROM hairdresser");
        $dresserNameResults = $dresserNameQuery->execute();
        $i = 0;
        while($row = $dresserNameQuery->fetch()){
            $options['names'][$i]['id'] = $row['id'];
            $options['names'][$i]['name'] = $row['name'];
            $i++;
        }
        $treatmentQuery = $pdo->prepare("SELECT * FROM treatment");
        $treatmentResults = $treatmentQuery->execute();
        $i = 0;
        while($row = $treatmentQuery->fetch()){
            $options['treatments'][$i]['name'] = $row['name'];
            $options['treatments'][$i]['id'] = $row['id'];
            $i++;
        }
        return $options;
    }
    function setTime($starttime,$endtime,$chair,$date,$hairdresser,$treatment){
        global $pdo;
        $date = explode("-",$date);
        $date = $date[2].'-'.$date[1].'-'.$date[0];
           $availabilityQuery = $pdo->prepare("SELECT * FROM agenda WHERE hairdresserId = :hairdresser AND date = :date AND :starttime BETWEEN starttime AND endtime OR starttime = :starttime2");
        $availabilityResults =  $availabilityQuery->execute(['hairdresser' => $hairdresser, 'date' => $date, 'starttime' => $starttime, 'starttime2' => $starttime]);
        if($availabilityQuery->fetch()){
            return false;
        }else{
            $agendaQuery = $pdo->prepare("INSERT INTO agenda (chair, starttime, endtime, date, hairdresserId, treatmentId) VALUES(:chair, :starttime, :endtime, :date, :treatment, :hairdresser)");
            $agendaResults = $agendaQuery->execute(['date' =>$date, 'chair'=> $chair, 'starttime'=> $starttime, 'endtime'=>$endtime, 'treatment'=>$treatment, 'hairdresser'=>$hairdresser]);
            return true;

        }
    }
}