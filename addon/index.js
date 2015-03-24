import Ember from 'ember';
import WidgetModel from 'ember-eureka/widget-model';

export default WidgetModel.extend({

    /** if false, display the save button
     */
    isEmbedded: false,
    model: Ember.computed.alias('routeModel'),

    fieldNames: Ember.computed.alias('config.fields'),

    /** display only the fields specified in `config.fields`
     * If `config.fields` doesn't exists, display all model's fields
     */
    fields: function() {
        var fieldNames = this.get('fieldNames');
        var fields, field;
        if (fieldNames) {
            var model = this.get('model');
            fields = Ember.A();
            fieldNames.forEach(function(fieldName) {
                field = model.get(fieldName+'Field');
                fields.pushObject(field);
            });
        } else {
            fields = this.get('model._fields');
        }

        return fields;
    }.property('fieldNames.[]', 'model._fields'),

    label: Ember.computed.alias('config.label'),

    actions: {
        save: function() {
            var model = this.get('model');
            var that = this;
            var routePath = this.get('config.actions.save.transitionTo');
            model.save().then(function(m) {
                var payload = {model: m, routePath: routePath};
                that.sendAction('toControllerAction', {name: 'refreshModel'});
                that.sendAction('toControllerAction', {name: 'transitionTo', payload: payload});
            });
        },
        cancel: function() {
            var model = this.get('model');
            model.rollback();
            var routePath = this.get('config.actions.cancel.transitionTo');
            var payload = {model: model, routePath: routePath};
            this.sendAction('toControllerAction', {name: 'transitionTo', payload: payload});
        }
    },

    _focusOnFirstElement: function() {
        this.$('input:eq(0)').focus();
    }.on('didInsertElement'),

    _focusOnNextElement: function() {
        // XXX check li
        this.$().closest('li').next().find('input').focus();
    }.on('willDestroyElement')
});
