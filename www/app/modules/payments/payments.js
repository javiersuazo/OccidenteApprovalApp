define(["knockout", "underscore", "services/dataContext", "plugins/router"],
    function (ko, _, dataContext, router) {
        var Payments = function () {
            var date = ko.observable(moment().format('YYYY-MM-DD'));
            var payments = ko.observableArray();
            var paymentsProcessed = ko.observableArray();
            
            var getPayments = function (thisDate) {
                payments.removeAll();
                dataContext.Payments.GetAllForDate(thisDate)
                    .then(function (response) {
                        $.each(response.payments, function (index, p) {
                            p = $.extend({}, p, {
                                processing: ko.observable(false),
                                paymentDateFormatted: moment(p.paymentDate).format('YYYY-MM-DD')
                            });
                            payments.push(p);
                        });
                    });
            };

            date.subscribe(function (newVal) {
                getPayments(newVal);
            });
        
            var processPayment = function (payment) {
                payment.processing(true);
                var reference = prompt("Transaction Reference #");
                var newBalance = prompt("New Account Balance");
                dataContext.Payments.ProcessPayment(payment.id, newBalance, reference).then(function () {
                    payments.remove(payment);
                    payment = $.extend({}, payment, { status: 'Exito', reason: '', reference: reference });
                    paymentsProcessed.push(payment);
                });
            };

            var failPayment = function (payment) {
                payment.processing(true);
                var reference = prompt("Transaction Reference #");
                var reason = prompt("Reason for failure");
                dataContext.Payments.FailPayment(payment.id, reason, reference).then(function () {
                    payments.remove(payment);
                    payment = $.extend({}, payment, { status: 'Error', reason: reason, reference: reference });
                    paymentsProcessed.push(payment);
                });
            };
            
            return {
                Date: date,
                Payments: payments,
                ProcessPayment: processPayment,
                FailPayment: failPayment,
                ProcessedPayments: paymentsProcessed,
                activate: function() {
                    getPayments(date());
                },
                viewUrl: "modules/payments/payments.html"
                
        };
    };
    return Payments;
});