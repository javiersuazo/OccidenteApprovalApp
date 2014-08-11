define(["knockout", "underscore", "services/dataContext", "plugins/router"],
    function (ko, _, dataContext, router) {
    var Home = function () {
        var childRouter = router.createChildRouter()
                           .makeRelative({ fromParent: true }).map([
                           {
                               route: 'accounts',
                               title: 'Accounts',
                               moduleId: 'modules/accounts/accounts',
                               nav: true
                           }]).buildNavigationModel();
        
        return {
            viewUrl: "modules/home/home.html",
            router: childRouter,
            attached: function () { router.navigate('accounts'); },
            logout: function () {
                localStorage["bankToken"] = null;
                 router.navigate('login');
            }
        };
    };
    return Home;
});