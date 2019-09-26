<?php
include_once('../../Model/php/core.php');
if(isset($_POST['date'])) {
    $agenda =  new Agenda();
    echo json_encode($agenda->getAgenda($_POST['date']));

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
}