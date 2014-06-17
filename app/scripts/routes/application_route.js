Ember4.ApplicationRoute = Ember.Route.extend({
    init: function() {
    	this._super();
    	console.log("application route");

        // authenticate with API at startup
        // this also happens at login/logout
        if(this.session.isAuthenticated())
            this.api.setAccessToken(this.session.getSessionAccessToken());
    },
    
    beforeModel: function() {
        var self = this;
        
        /*
        auth = this.controllerFor('login');
        if(auth.get('isLoggedIn')) {
            console.log("auth controller claims user is logged in");
        } else {
            console.log("auth controller claims user is NOT logged in");
            self.transitionTo('/login');
        }
        */
    },
    
    actions: {
//        error: function(error) {
//            console.log("-------------------------------------------------");
//            console.log("Ember caught error:");
//            console.warn(error);
//            console.log("-------------------------------------------------");
//        }
    }
});
