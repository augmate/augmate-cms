Ember4.ApplicationController = Ember.ObjectController.extend({

    //sessionToken: null,
    //isLoggedIn: Ember.computed.notEmpty('sessionToken'),
    
    //currentTab: null,

    isLoggedIn: function() {
        return this.session.isAuthenticated();
    },
    
    init: function() {
    }
});

