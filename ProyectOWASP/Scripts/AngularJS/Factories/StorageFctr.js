ProjectOWASP.factory('StorageService', [function () {

    let Storage = {
        Session: {

            set: function (key, value) {
                sessionStorage.setItem(key, value);
            },

            get: function (key) {
                return sessionStorage.getItem(key);
            },

            setObject: function (key, obj) {
                let objectString = JSON.stringify(obj);
                sessionStorage.setItem(key, objectString);
            },

            getObject: function (key) {
                let objectString = sessionStorage.getItem(key);
                let result = objectString == null ? null : JSON.parse(objectString);
                return result;
            },

            clear: function () {
                sessionStorage.clear();
            }

        },
        Local: {

            set: function (key, value) {
                localStorage.setItem(key, value);
            },

            get: function (key) {
                return localStorage.getItem(key);
            },

            setObject: function (key, obj) {

                let objectString = JSON.stringify(obj);
                localStorage.setItem(key, objectString);
            },

            getObject: function (key) {
                let objectString = localStorage.getItem(key);
                let result = objectString == null ? null : JSON.parse(objectString);
                return result;
            },

            clear: function () {
                localStorage.clear();
            }

        }
    }

    return Storage;

}]);

