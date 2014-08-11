define(function() {

    var url = localStorage.getItem("apiUrl");
    var bankId = localStorage.getItem("bankId");
    
    if(!url) 
    	url = "http://inviomobileapi.apphb.com/bank/" + bankId;
    
    if (window.location.hostname === "localhost") {
        url = "http://localhost:38397/bank/" + bankId;  
    }
    return {
        apiRootUrl: url
    };
});