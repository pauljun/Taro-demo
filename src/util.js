function add0(m) { 
    return m < 10 ? '0' + m : m 
}


function formatDate(needTime, bool = true, isDate = false) {
    //needTime是整数，否则要parseInt转换
    var time = new Date(parseInt(needTime,10));
    if(isDate){
        time = new Date(needTime)
    }
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    if(bool){
        return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    }else{
        return y + '-' + add0(m) + '-' + add0(d);
    }
}

export default formatDate
