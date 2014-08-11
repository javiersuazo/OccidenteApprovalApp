define(["knockout", "require", "knockout.validation"], function (ko, require) {
    var router = require('plugins/router');

    
    return {
        router: router,
        activate: function () {
            router.map([{
                    route: '',
                    title: 'Home',
                    moduleId: 'modules/home/home',
                    nav: true
                }, {
                    route: 'home',
                    title: 'Home',
                    moduleId: 'modules/home/home',
                    nav: true
                }, {
                    route: 'login',
                    title: 'Login',
                    moduleId: 'modules/login/login',
                    nav: true
                }]).buildNavigationModel()
                .mapUnknownRoutes('modules/home/home', 'home');
            return router.activate();
        }
    };
});
