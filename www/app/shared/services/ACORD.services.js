services.factory('acordServices', ['$http', 'BASE_SERVER', '$state', '$q', 'APP_DEBUG', 'sessionServices', '$injector', function ($http, BASE_SERVER, $state, $q, APP_DEBUG, sessionServices, $injector) {
    //=========================================================
    'use strict';
    //=========================================================
    //
    //Include session for getting current user data
    var session = sessionServices.SessionObject();
    //
    //always refresh session properties before use
    session.properties = session.refresh();
    //ACORD services handle all functions related to adding the user entered data to our original json sample found in app.services.js.
    //
    //DEBUG: A side note we must confront, Saleel used session storage a bunch because his app was not angular and did not have singleton service objects, I don;t REALLY NEED to use it at all, I can inject a service to the same effect, but since the implementation was already done this there is some redundancy between sessionStorage and our services as it stands
    //
    //So first inject that JSON
    //    var modelJSON = $injector.get('insurescanJson');
    //
    //from here we will all the functions that adds the user data in the various ACORD approriate locations
    //
    //====================================================
    //DRIVERS - is so much shit -
    //====================================================
    this.storeNamedInsured = function () {
        //
        //DEBUG: promise? it's a pretty complex function, probably could be broken down
        var drivers = session.properties.drivers;
        //DEBUG: you need to handle the insurescan JSON with the session object as well
        var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
        /*If the user jumps between the screens to and fro, ten we need to make sure that we do not add multiple/duplicate entries. 
        Below logic sanitizes the insurescanJson before updating it every sigle time*/
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal.splice(1, insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal.length - 1);
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal.splice(1, insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal.length - 1);
        var namedInsuredQuantity = 0;
        // Counts how many named insured are saved in the session
        for (i = 0; i < drivers.length; i++) {
            if (drivers[i]["category"] == categories[NAMED_INSURED]) namedInsuredQuantity++;
            if (namedInsuredQuantity == 2) {
                var additionalInsuredOrPrincipalName = drivers[i]["fullname"];
                var additionalInsuredOrPrincipalLicense = drivers[i]["license"];
                var additionalInsuredOrPrincipalDOB = drivers[i]["dob"];
                var additionalInsuredOrPrincipalstate = drivers[i]["state"];
                var additionalInsuredOrPrincipalsex = drivers[i]["sex"];
                var additionalInsuredOrPrincipalmaritalstatus = drivers[i]["maritalState"];
            }
        }
        if (namedInsuredQuantity == 2) {
            //Here is what we are gonna add to the insurescanJson for additional nameinsured
            var additionalInsuredOrPrincipal = {
                "GeneralPartyInfo": {
                    "NameInfo": {
                        "PersonName": {
                            "Surname": "TESTERMAN"
                            , "GivenName": "MITCHELL"
                        }
                    }
                    , "Addr": {
                        "AddrTypeCd": "MailingAddress"
                        , "Addr1": "1234 e main st"
                        , "City": "Travelers Rest"
                        , "StateProvCd": "SC"
                        , "StateProv": "SC"
                        , "PostalCode": "29690"
                        , "CountryCd": "US"
                        , "Country": "USA"
                        , "County": "Greenville"
                    }
                }
                , "InsuredOrPrincipalInfo": {
                    "InsuredOrPrincipalRoleCd": "Insured"
                    , "InsuredOrPrincipalRoleDesc": "Insured"
                }
            };
            /*Add the new name insured to the insurescanJson in two places*/
            if (insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal.length < 2) {
                insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal.push(additionalInsuredOrPrincipal);
                insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal.push(additionalInsuredOrPrincipal);
            }
            /*Update the address in two places*/
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[1].GeneralPartyInfo.NameInfo.PersonName.Surname = additionalInsuredOrPrincipalName.split(" ")[1];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[1].GeneralPartyInfo.NameInfo.PersonName.GivenName = additionalInsuredOrPrincipalName.split(" ")[0];
            //DEBUG: with this setup additional named insured can't have a different address than the primary, is that right?
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.AddrTypeCd = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.AddrTypeCd;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.Addr1 = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.Addr1;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.City = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.City;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.StateProvCd = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProvCd;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.StateProv = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProv;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.PostalCode = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.PostalCode;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.CountryCd = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.CountryCd;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.Country = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.Country;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.County = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.County;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[1].GeneralPartyInfo.NameInfo.PersonName.Surname = additionalInsuredOrPrincipalName.split(" ")[1];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[1].GeneralPartyInfo.NameInfo.PersonName.GivenName = additionalInsuredOrPrincipalName.split(" ")[0];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.AddrTypeCd = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.AddrTypeCd;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.Addr1 = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.Addr1;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.City = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.City;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.StateProvCd = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProvCd;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.StateProv = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProv;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.PostalCode = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.PostalCode;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.CountryCd = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.CountryCd;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.Country = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.Country;
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[1].GeneralPartyInfo.Addr.County = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.County;
            //alert(JSON.stringify(insurescanJson));
        }
        sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
    };
}]);