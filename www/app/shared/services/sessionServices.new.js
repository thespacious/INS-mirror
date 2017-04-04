services.factory('sessionServices', ['$http', 'BASE_SERVER', '$state', '$q', 'APP_DEBUG', function ($http, BASE_SERVER, $state, $q, APP_DEBUG) {
    //========================================================================
    'use strict';
    //========================================================================
    //Session Services will handle all manipulations of the sessionStorage objects including drivers, cars, coverages, discounts, dates, garging info, 
    //All services should have at least these services injected
    //
    var TAG = "New Session Services: ";
    //As well as a Tag for console output from the service
    //
    //
    //=================================================================
    //SESSION OBJECT FROM MODEL, this will allow to define an arbitrary model for the session you create and perform CRUD opertions on it
    //==================================================================
    //
    const model = function () {
        // The model will determine what getters and setter for the session variable are created
        return ({
            drivers: []
            , garaging: {}
            , cars: []
            , coverages: {}
            , dates: {}
            , discounts: {}
            , credentials: {}
        });
    };
    //
    //Get session function returns session and ensures it has been instantiated on call, if not it is instatiated with the model
    var getSession = function () {
        if (!sessionStorage.getItem('session') || sessionStorage.getItem('session') == "undefined") {
            sessionStorage.setItem('session', JSON.stringify(model()));
        }
        return JSON.parse(sessionStorage.getItem('session'));
    };
    //==============
    //Session Object:
    //Responsible for holding session data and defines functions for CRUD operations on model.
    //==============
    this.SessionObject = function () {
        var self = this;
        this.properties = getSession();
        //refreshes copy of session variables in the scope this services is instantiated in
        //Must be called before and after operations on the session
        this.refresh = function () {
            //            var deferred = $q.defer();
            try {
                this.properties = getSession();
                return this.properties;
            }
            catch (err) {
                console.log(TAG + "error refreshing the session, ", err);
                return false;
            }
            //            return deferred.promise;
        };
        //
        //Publishes local changes to session
        //refresh before and after
        //
        this.publish = function () {
            try {
                sessionStorage.setItem('session', JSON.stringify(this.properties));
                return true;
            }
            catch (err) {
                console.log(TAG + "failed to store session, ", err);
                return false;
            }
        };
        //
        //Restores Session to original empty Model properties
        this.clear = function () {
            try {
                sessionStorage.setItem('session', JSON.stringify(model()));
                this.properties = getSession();
                return true;
            }
            catch (err) {
                console.log(TAG + "failed to clear session, ", err);
                return false;
            }
        };
    };
    this.$get = function () {
        return this.sessionObject();
    }
    return this;
}]);