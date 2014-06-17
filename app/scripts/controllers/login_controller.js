Ember4.LoginController = Ember.ObjectController.extend({

    targetTransition: null,
    defaultTransitionAfterLogin: 'apps',
    
    init: function () {
    },

    actions: {
        loginUser: function () {
            var data = this.getProperties('username', 'password');
            console.dir(data);

            var encoded = btoa(data.username + ":" + data.password);
            console.log("encoded: " + encoded);

            var requestedTransition = this.get('targetTransition');
            var self = this;

            $.ajax({
                type: 'POST',
                url: 'https://auth.api.augmate.com/token',
                beforeSend: function (req) {
                    req.setRequestHeader('Authorization', 'Basic ' + encoded);
                },
                data: { grant_type: 'client_credentials' },
                dataType: 'json'
            }).then(
                function onAuthSuccess(result) {
                    console.log("authed and got result:");
                    console.dir(result);
                    
                    // create new session
                    self.session.createSession(result.access_token);
                    
                    // auth API
                    self.api.setAccessToken(this.session.getSessionAccessToken());
                    
                    // transition
                    if(requestedTransition != null) {
                        self.set('targetTransition', null);
                        console.log("redirecting to attempted transition: " + requestedTransition)
                        requestedTransition.retry();
                    } else
                    {
                        console.log("no redirect requested, transitioning to default route");
                        self.transitionToRoute(this.defaultTransitionAfterLogin);
                    }
                },
                function onAuthFailure(result) {
                    console.log("auth failed");
                }
            );
        }
    }
});

