define(["knockout", "underscore", "services/dataContext", "plugins/router"],
    function (ko, _, dataContext, router) {
        var Remittances = function () {
            
            var remittances = ko.observableArray();
            var remittancesProcessed = ko.observableArray();
            var remittanceDetails = ko.observable();
            
            var getRemittances = function () {
                remittances.removeAll();
                dataContext.Remittances.GetAll()
                    .then(function (response) {
                        $.each(response.remittances, function (index, r) {
                            r = $.extend({}, r, {
                                processing: ko.observable(false),
                            });
                            remittances.push(r);
                        });
                    });
            };
            
            var failRemittance = function (remittance) {
                remittance.processing(true);
                var reference = prompt("Transaction Reference #");
                var reason = prompt("Reason for failure");
                dataContext.Remittances.FailRemittance(remittance.id, reason, reference).then(function () {
                    remittances.remove(remittance);
                    remittance = $.extend({}, remittance, { status: 'Error', reason: reason, reference: reference });
                    remittancesProcessed.push(remittance);
                });
            };

            var viewRemittanceDetails = function (remittance) {
                remittanceDetails(remittance);
            };

            var processRemittance = function (remittance) {
                remittance.processing(true);
                var reference = prompt("Transaction Reference #");
                var newBalance = prompt("New Account Balance");
                dataContext.Remittances.ProcessRemittance(remittance.id, newBalance, reference).then(function () {
                    remittances.remove(remittance);
                    remittance = $.extend({}, remittance, { status: 'Exito', reason: '', reference: reference });
                    remittancesProcessed.push(remittance);
                });
            };
            
            return {
                ViewRemittanceDetails: viewRemittanceDetails,
                RemittanceDetails: remittanceDetails,
                Remittances: remittances,
                ProcessRemittance: processRemittance,
                FailRemittance: failRemittance,
                ProcessedRemittances: remittancesProcessed,
                activate : function() {
                    getRemittances();
                },
                viewUrl: "modules/remittances/remittances.html"
            };
        };
        return Remittances;
});