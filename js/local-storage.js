(function() {
    "use strict";

    var module = angular.module('localStorage', []);
    var hasLocalStorage = typeof window.localStorage !== 'undefined';

    module.factory('localStorage', [function() {
        var store = {};
        var factory = {};

        factory.set = function(key, value) {
            var data = { value: value };
            hasLocalStorage ?
                window.localStorage.setItem(key, JSON.stringify(data)) :
                store[key] = value;
        };

        factory.get = function(key, defaultValue) {
            var value;
            var hasDefault = arguments.length > 1;
            if (hasLocalStorage) {
                try {
                    value = window.localStorage.getItem(key);
                    if (value) {
                        value = JSON.parse(value);
                        return value.value;
                    } else if (defaultValue) {
                        factory.set(key, defaultValue);
                        return factory.get(key);
                    }
                } catch (e) {
                    if (hasDefault) {
                        factory.set(key, defaultValue);
                        return factory.get(key);
                    } else {
                        return void 0;
                    }
                }
            } else {
                if (!store.hasOwnProperty(key) && hasDefault) factory.set(key, defaultValue);
                return store[key];
            }
        };

        return factory;
    }]);
})();