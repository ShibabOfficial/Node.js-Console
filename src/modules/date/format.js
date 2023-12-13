// format function used in console //
function format(miliseconds, format) {
    // getting seconds //
    let seconds = Math.floor(miliseconds / 1000);
    // getting minutes //
    let minutes = Math.floor(seconds / 60);
    // getting hours //
    let hours = Math.floor(minutes / 60);
    // getting days (not used) //
    let days = Math.floor(hours / 24);

    // rounding hours //
    hours = hours % 24;
    // rounding seconds //
    seconds = seconds % 60;
    // rounding minutes //
    minutes = minutes % 60;
    // rounding miliseconds //
    miliseconds = miliseconds % 1000;

    // result //
    let _format = format.replace("${HH}", padTo2Digits(hours)).replace("${mm}", padTo2Digits(minutes)).replace("${ss}", padTo2Digits(seconds)).replace("${ms}", padTo3Digits(miliseconds));
    return _format;
}

// padding //
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function padTo3Digits(num) {
    return num.toString().padStart(3, '0');
}

module.exports = { format };