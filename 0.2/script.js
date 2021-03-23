function change(){
    var area = document.getElementById('area').value
    var input = document.getElementById('input').value
    alert("Vous avez choisi comme css : " + area + ", le sélector est : " + input)
    document.getElementById(input).style.cssText=area;
}