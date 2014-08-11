define(["knockout", "jquery", "zepto.selector"], function(ko, $) {
    var TestHelper = function () {

        var baseUrl = window.location.protocol == 'file:' ? '../app/' : 'http://localhost:24328/www/app/';

        var viewLoaded = ko.observable(false);

        var viewSuccessfullyLoaded = ko.observable(false);

        var loadViewToBeTested = function (module, element, viewUrl) {
            viewLoaded(false);
            var $element = element ? element : $('body');
            viewUrl = module.viewUrl || viewUrl;
            $element.load(baseUrl + viewUrl, function (response, status) {
                if (status == "error")
                    viewSuccessfullyLoaded(false);
                if (status == "success")
                    viewSuccessfullyLoaded(true);
                viewLoaded(true);
                ko.cleanNode($element[0]);
                ko.applyBindings(module);
            });
        };
        
        return {
            loadViewToBeTested: loadViewToBeTested,
            viewLoaded: viewLoaded,
            viewSuccessfullyLoaded: viewSuccessfullyLoaded
        };
    };
    return TestHelper;
});
