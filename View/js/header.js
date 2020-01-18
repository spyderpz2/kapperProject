$(document).ready(function () {
    //This function gets activated when one of the buttons in the menu get clicked on,
    // then it checks which button it was and sends you to this page.
    $(".menuRow > .col-md-12 > div").on("click", function () {
        var destination = $(this).children("h1").text();
        document.location.href = "../php/"+destination+".php";
    });
}); 