'use strict';

var Source = function (data) {
    this.data = data;
}
    
Source.prototype.data = {}

Source.prototype.get = function (name) {
    return this.data[name];
}

Source.prototype.set = function (name, value) {
    this.data[name] = value;
}

module.exports = Source;