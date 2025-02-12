function getUrlParams() {
    var params = {};
    var queryString = window.location.search.substring(1);
    var pairs = queryString.split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return params;
}

var params = getUrlParams();

var names = params.htag;


window.onload=()=>{
    document.getElementsByClassName('tabletname')[0].innerHTML=names;

}
