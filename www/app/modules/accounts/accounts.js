define(["knockout", "underscore", "services/dataContext", "plugins/router", "alertify", "bootstrap"],
    function (ko, _, dataContext, router, alertify) {
        var Accounts = function () {

            var pendingAccounts = ko.observableArray();
            var currentDetails = ko.observable();
            var isLoading = ko.observable(true);
            var isLoadingDetails = ko.observable(true);
            
            var getPendingAccounts = function () {
                pendingAccounts.removeAll();
                isLoading(true);
                dataContext.PendingAccounts.GetAll()
                    .done(function (response) {
                        $.each(response.approvalRequests, function (index, r) {
                            r = $.extend({}, r, {
                                processing: ko.observable(false),
                            });
                            pendingAccounts.push(r);
                        });
                        isLoading(false);
                    }).fail(function () {
                        router.navigate('/login');
                    });
            };

            var approvedAccounts = function (pendingAccount) {
                alertify.prompt("Transaccion de Referencia #", function (e, str) {
                    if (e) {
                        dataContext.PendingAccounts.ApprovedAcounts(pendingAccount.id, str).done(getPendingAccounts);
                    }
                }, "");
            };

            var denyAccounts = function (pendingAccount) {
                var reference = "",
                    reason = "";

                alertify.prompt("Transaccion de Referencia #", function (e, str) {
                    if (e) {
                        reference = str;
                        alertify.prompt("Razon para denegar", function (e, str) {
                            if (e) {
                                reason = str;
                                if (reference !== "" && reason !== "") {
                                    dataContext.PendingAccounts.DenialAccount(pendingAccount.id, reason, reference).done(getPendingAccounts);
                                } else {
                                    alertify.alert("No puede enviar ninguno de los campos requeridos vacios.");
                                }
                            }
                        }, "");
                    }
                }, "");

            };

            var showDetails = function (approvalRequest) {
                isLoadingDetails(true);
                dataContext.PendingAccounts.Details(approvalRequest.id).done(function (response) {
                    currentDetails(response);
                    isLoadingDetails(false);
                });
            };

            var humanize = function (fieldName) {
                return fieldName
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/(\w+)/g, function (match) {
                        return match.charAt(0).toLowerCase() + match.slice(1);
                    })
                    .replace(/^./, function (str) { return str.toUpperCase(); });
            };

            return {
                viewUrl: "modules/accounts/accounts.html",
                pendingAccounts: pendingAccounts,
                ApprovedAccounts: approvedAccounts,
                DenyAccounts: denyAccounts,
                GetPendingAccounts : getPendingAccounts,
                humanize: humanize,
                ShowDetails: showDetails,
                CurrentDetails: currentDetails,
                isLoading: isLoading,
                isLoadingDetails : isLoadingDetails,
                attached: function () {
                    getPendingAccounts();
                }

            };
        };
        return Accounts;
    });