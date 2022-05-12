const d = Date();

document.getElementById("date").innerHTML = d;

function show() {
    document.getElementById("demo").innerHTML = "Hello World!";
}
function hide() {
    document.getElementById("demo").innerHTML = "";
    alert("Message Hidden");
}

const x = 12;
x = 13;
x += 1;
document.getElementById("test1").innerHTML = x;
