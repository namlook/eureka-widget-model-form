import Ember from 'ember';
import WidgetModel from 'ember-eureka/widget-model';

export default WidgetModel.extend({

    /** if false, display the save button
     */
    isEmbedded: false,
    model: Ember.computed.alias('routeModel'),
    fields: Ember.computed.alias('model._fields'),

    label: Ember.computed.alias('config.label'),

    actions: {
        save: function() {
            var model = this.get('model');
            var that = this;
            var routePath = this.get('config.actions.save.transitionTo');
            model.save().then(function(m) {
                var payload = {model: m, routePath: routePath};
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
