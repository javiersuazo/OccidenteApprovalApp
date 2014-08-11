define(['$http', 'config', 'plugins/router'], function ($http, config, router) {

    var failure = function (err, message, method) {

        switch (method) {
            case "Unauthorized":
                router.navigate("login", { replace: true, trigger: true });
                return;
            case "Bad Request":
                alert(err.response);
                return;            
        }

        console.log(err);
    };

    return {
        'get': function (resource, payload) {
            payload = payload || {};
            payload.token = localStorage["invioToken"];
            return $http.get(config.apiRootUrl + resource, payload).fail(failure);
        },
        'post': function (resource, payload) {
            payload.token = localStorage['invioToken'];
            return $http.post(config.apiRootUrl + resource,  payload).fail(failure);
        },
        'postStringified': function (resource, payload) {
            payload.token = localStorage['invioToken'];
            return $http.post(config.apiRootUrl + resource, JSON.stringify(payload)).fail(failure);
        },
        'put': function (resource, payload) {
            return $http.put(config.apiRootUrl + resource, payload).fail(failure);
        },
        'delete': function (resource, id) {
            return $http.delete(config.apiRootUrl + resource + "/" + id, { token: localStorage["invioToken"] }).fail(failure);
        }
    };
});