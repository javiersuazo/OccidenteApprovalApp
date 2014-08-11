define(["knockout", "services/dataContext", "plugins/router", "alertify"], function (ko, dataContext, router, alertify) {

    var Login = function (injectedDataConext, injectedRouter) {
        dataContext = injectedDataConext || dataContext;
        router = injectedRouter || router;

        var loginInProgress = ko.observable(false);

        var processAuthenticateResponse = function (response, status) {
            if (status === "success") {
                localStorage["bankToken"] = response.token;
                router.navigate('/home');
            }
            if (status === "error") {
                password("");
                loginInProgress(false);
                alertify.alert("El usuario o contraña no son correctas. Por favor intentelo de nuevo.");
            }
        };
        
        var authenticate = function () {
            if (formErrors().length > 0) {
                alertify.alert(formErrors()[0]);
                formErrors.showAllMessages(true);
                return false;
            }
            loginInProgress(true);
            dataContext.Login.authenticate({ email: email(), password: password() }).always(processAuthenticateResponse);
            return false;
        };

        var email = ko.observable().extend({ required: { message: 'Por favor, ingresa tu correo electonico' }, email: true });

        var password = ko.observable().extend({ required: { message: 'Por favor, ingresa tu contraseña' } });

        var formErrors;
        var activate = function () {
            formErrors = ko.validation.group(this);
        };

        return {
            viewUrl: "modules/login/login.html",
            authenticate: authenticate,
            email: email,
            password: password,
            processAuthenticateResponse: processAuthenticateResponse,
            loginInProgress: loginInProgress,
            formErrors: formErrors,
            activate: activate
        };
    };

    return Login;
});