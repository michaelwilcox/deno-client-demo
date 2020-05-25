export function dateToHours(time: string) {
    let date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minutesFormatted = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutesFormatted + ' ' + ampm;
    return strTime;
}