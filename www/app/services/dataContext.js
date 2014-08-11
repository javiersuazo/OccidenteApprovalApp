define(['services/apiClient', 'plugins/router'], function(apiClient, router) {

    
    var bankId = "occidente";

    var baseUrl = "http://inviomobileapi.apphb.com/bank/" + bankId;
    if (window.location.hostname === "localhost") {
        baseUrl = "http://localhost:38397/bank/" + bankId;
    }
    
    return {
        Login : {
            authenticate: function (userRequest) {
                return $.post(baseUrl + "/login", {
                    Email: userRequest.email,
                    Password: userRequest.password
                });
            }
        },
        PendingAccounts: {
            
            GetAll: function () {
                var token = localStorage["bankToken"];
                return $.get(baseUrl + "/bankAccountApprovalRequests/pending?token=" + token);
            },
            ApprovedAcounts: function (accountId, reference) {
                var token = localStorage["bankToken"];
                return $.ajax({
                    url: baseUrl + "/bankAccountApprovalRequests/" + accountId + "/approve",
                    data: {
                        reference: reference,
                        token: token
                    },
                    type: 'PUT'
                });
            },
            DenialAccount: function (accountId, reason, reference) {
                var token = localStorage["bankToken"];
                return $.ajax({
                    url: baseUrl + "/bankAccountApprovalRequests/" + accountId + "/deny",
                    data: {
                        reason: reason,
                        reference: reference,
                        token: token
                    },
                    type: 'PUT'
                });
            },
            Details: function (approvalRequestId) {
                var token = localStorage["bankToken"];
                return $.get(baseUrl + "/bankAccountApprovalRequests/" + approvalRequestId, { token: token });
            }
        }
        
    };
});