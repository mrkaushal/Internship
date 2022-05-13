$(document).ready(function () {
    $("button").click(function () {
        $("#h1").css("color", "red");
        $("#h1").css("font-size", "50px");
    });
    $("#Btn2").click(function () {
        $("h2").addClass("he");
    });
    
    
    $("input").keypress(function () {
        $("#h3").html($("input").val());
    });
});