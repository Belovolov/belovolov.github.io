var volume;     //store sound volume as int

function changeVolume() {
    var dVolume = document.getElementById('myVolume').value;
    volume = (dVolume-10)*0.01;
}