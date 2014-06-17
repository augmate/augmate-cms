Ember4.AppsContentTriggerIndexRoute = Ember.AuthenticatedRoute.extend({

    model: function(params) {
        var models = Ember.A();

        this.api.setAccessToken(this.session.getSessionAccessToken());
        this.api.request('GET', 'v1/mvp_1/trigger/list', {}).then(
            function onSuccess(data, status, xhr){

                data.list.forEach(function(item) {
                    var model = Ember4.Trigger.create({});

                    model.setProperties({
                        qrcode: item._id,
                        title: item.title,
                        content: item.content_id.content_type
                    });

                    models.pushObject(model);
                });
                
            },
            function onFailure(xhr, status, err) {
                console.log("trigger-list fail:");
                console.dir(err);
            }
        );

        return models;
    }
});