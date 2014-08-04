function slideIn()
{
    document.getElementById("panel1").style.left = "-100%";
    document.getElementById("panel2").style.left = "0";
}
function slideOut()
{
    document.getElementById("panel2").style.left = "100%";
    document.getElementById("panel1").style.left = "0";
}