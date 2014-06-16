import Ember from 'ember';

export default Ember.Component.extend({
  ctx: null,
  nextX: 20,
  nextY: 20,

  _resetCounters: function () {
    var nextX = this.get('nextX');
    var nextY = this.get('nextY');
    if (nextX >= 320 || nextY >= 240) {
      this.set('nextX', 0);
      this.set('nextY', 0);
    }
  }.observes('nextX', 'nextY'),

  _getRandomColor: function () {
    var output = 'rgba(%s, .75)';
    var colors = [0,0,0].map(this._getRandom255);
    return output.replace('%s', colors.join(','));
  },

  _getRandom255: function () {
    return Math.floor(Math.random() * 256);
  },

  didInsertElement: function () {
    var canvas = this.$('canvas')[0];
    var ctx = canvas.getContext('2d');
    ctx.setFillColor('rgba(255, 192, 203, .75)');
    ctx.fillRect(0, 0, 640, 480);
    this.set('ctx', ctx);
  },

  actions: {
    doSomething: function () {
      var ctx = this.get('ctx');
      var nextX = this.get('nextX');
      var nextY = this.get('nextY');
      var fillColor = this._getRandomColor();
      ctx.setFillColor(fillColor);
      ctx.fillRect(nextX, nextY, 640 - nextX * 2, 480 - nextY * 2);
      this.set('nextX', nextX + 20);
      this.set('nextY', nextY + 20);
    }
  }
});
