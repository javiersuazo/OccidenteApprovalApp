requirejs.config({
    baseUrl: window.location.protocol == 'file:' || window.location.host.indexOf("apphb") > 0 ? '../app/' : 'http://localhost:24328/www/app/',
    paths: {
        'jquery': '../lib/jquery-2.1.1.min',
        'text': '../lib/require/text',
        'durandal': '../lib/durandal/js',
        'plugins': '../lib/durandal/js/plugins',
        '$http': '../lib/durandal/js/plugins/http',
        'transitions': '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout',
        'knockout.validation': '../lib/knockout/knockout.validation',
        'underscore': '../lib/underscore/underscore',
        'datepicker': '../lib/datepicker/js/datepicker',
        'alertify': '../lib/alertify.min',
        'bootstrap': '../lib/bootstrap.min'
    },
    map: {

    },
    shim: {
        'bootstrap': {
            deps: ["jquery"]
        },
    }
});
