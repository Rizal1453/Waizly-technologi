function timeConversion(s){
    let amPm = s.substring(8)
    let fullTIme = s.substring(0,8)
    let time = fullTIme.split(':')
    if(amPm === 'PM'){
        if(time[0] !== '12'){
            time[0] = parseInt(time[0]) + 12
        }
    }else{
        if(time[0]==="12"){
            time[0] = "00"
        }
    }
    return time.join(':')
}
console.log(timeConversion('07:05:45PM'));