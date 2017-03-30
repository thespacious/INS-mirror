services.factory('acordServices', ['$http', 'BASE_SERVER', '$state', '$q', 'APP_DEBUG', 'sessionServices', '$injector', function ($http, BASE_SERVER, $state, $q, APP_DEBUG, sessionServices, $injector) {
    //=========================================================
    'use strict';
    //=========================================================
    //
    var TAG = "ACORD services: ";
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
    //
    //This funciton is only for storing additional named insured, after restructure all ACORD JSON manipulations should be done at the end of the of relevant component for example both the driver and car functions in this services will be called after the user submits info from the drivers(home) component, these may be promises
    this.storeNamedInsured = function () {
        //
        //DEBUG: promise? it's a pretty complex function, probably could be broken down
        var deferred = $q.defer();
        session.properties = session.refresh();
        var drivers = session.properties.drivers;
        //TODO: you need to handle the insurescan JSON with the session object as well
        var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
        /*If the user jumps between the screens to and fro, ten we need to make sure that we do not add multiple/duplicate entries. 
        Below logic sanitizes the insurescanJson before updating it every sigle time*/
        //Clears any existing additional named insured
        //TODO: validate before this point
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
            try {
                if (insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal.length < 2) {
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal.push(additionalInsuredOrPrincipal);
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal.push(additionalInsuredOrPrincipal);
                }
            }
            catch (err) {
                console.log(TAG + 'error creating additional named insured ACORD JSON entry', err);
            }
            //Update the address in two places*/
            finally {
                try {
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
                console.log(TAG + 'Additional Named INsured Stored: ', true);
                deferred.resolve(true);
            }
            catch (err) {
                console.log(TAG + "error storing addtional named insured, ", err);
                deferred.reject(false);
            }
        }
        return deferred.promise;
    };
    //
    //Add Primary to JSON
    //
    this.addPrimary() {
        //
        var deferred = $q.defer();
        session.properties = session.refresh();
        var drivers = session.properties.drivers;
        //Deriving the firstname and lastname from driver fullname
        var fullname = driver["fullname"];
        var split = fullname.split(" ");
        var Firstname = split[0];
        var Lastname = split[1];
        //TODO: you need to handle the insurescan JSON with the session object as well
        var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
        //
        //add to JSON
        //
        for (driver in drivers) {
            if (driver.primary) {
                try {
                    var fullname = driver["fullname"];
                    var split = fullname.split(" ");
                    var Firstname = split[0];
                    var Lastname = split[1];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.NameInfo.PersonName.Surname = Lastname;
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.NameInfo.PersonName.GivenName = Firstname;
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].GeneralPartyInfo.NameInfo.PersonName.Surname = Lastname;
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].GeneralPartyInfo.NameInfo.PersonName.GivenName = Firstname;
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.NameInfo.PersonName.Surname = Lastname;
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.NameInfo.PersonName.GivenName = Firstname;
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].PersDriverInfo.FinancialResponsibilityFiling.NameInfo.PersonName.Surname = Lastname;
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].PersDriverInfo.FinancialResponsibilityFiling.NameInfo.PersonName.GivenName = Firstname;
                    /*Update the aaddress*/
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.AddrTypeCd = "MailingAddress";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.Addr1 = driver["street"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.City = driver["city"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProvCd = driver["state"];
                    //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProvCd = "MS";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProv = driver["state"];
                    //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProv = "MS"
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.PostalCode = driver["zip"];
                    //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.PostalCode = "38601";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.CountryCd = "US";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.Country = "USA";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.AddrTypeCd = "MailingAddress";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.Addr1 = driver["street"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.City = driver["city"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProvCd = driver["state"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProv = driver["state"];
                    //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.PostalCode = "38601";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.PostalCode = driver["zip"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.CountryCd = "US";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.Country = "USA";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.AddrTypeCd = "MailingAddress";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.Addr1 = driver["street"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.City = driver["city"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.StateProvCd = driver["state"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.StateProv = driver["state"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.PostalCode = driver['zip'];
                    //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.PostalCode = driver["zip"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.CountryCd = "US";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.Country = "USA";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.AddrTypeCd = "GaragingAddress";
                    //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.Addr1 = driver["gstreet"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.Addr1 = "140 Kristen CtR";
                    //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.City = driver["gcity"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.City = "Jackson";
                    //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.StateProvCd = driver["gstate"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.StateProvCd = "MS";
                    //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.StateProv = driver["gstate"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.StateProv = "MS";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.PostalCode = "39211";
                    //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.PostalCode = driver["gzip"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.CountryCd = "US";
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.Country = "USA";
                    /*Update date of birth*/
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.PersonInfo.BirthDt = formatDate(driver["dob"]);
                    /*Update the License details*/
                    //Here we need to progress the dates by 16 years
                    var myDate = new Date(driver["dob"]);
                    myDate.setYear(myDate.getFullYear() + 16);
                    //alert("Progressed date: " + formatDate(myDate));
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.LicensePermitNumber = driver["license"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.LicensedDt = formatDate(driver.licensedate);
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.FirstLicensedCurrentStateDt = formatDate(driver.licenseDate);
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.StateProvCd = driver["state"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.StateProv = driver["state"];
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.CountryCd = "US";
                    /*Update the gender information for the first name insured*/
                    insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.PersonInfo.GenderCd = driver["sex"];
                    sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
                    //        userInfo.submit();
                    console.log(TAG + "primary Driver added to json");
                    deferred.resolve(true);
                }
                catch (err) {
                    console.log(TAG + "Storing Primary Driver in ACORD failed: ", err);
                    deferred.reject(false);
                }
            }
        }
        return deferred.promise;
    };
    //
    //
    //
    //this is called for all drivers regardless of category
    this.storeDrivers = function (drivers) {
        //
        //var deferred = $q.defer();
        ///
        var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
        /*If the user jumps between the screens to and fro, ten we need to make sure that we do not add multiple/duplicate entries. 
        Below logic sanitizes the insurescanJson before updating it every sigle time*/
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver.splice(1, insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver.length - 1);
        sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
        var driversIninsurescanJson = {
            "-id": "Drv1"
            , "GeneralPartyInfo": {
                "NameInfo": {
                    "PersonName": {
                        "Surname": "TESTERMAN"
                        , "GivenName": "MICHAEL"
                    }
                }
            }
            , "DriverInfo": {
                "PersonInfo": {
                    "GenderCd": "M"
                    , "BirthDt": "1980-03-28"
                    , "MaritalStatusCd": "S"
                    , "OccupationDesc": "UNKNOWN(UN)"
                    , "OccupationClassCd": "UN"
                    , "LengthTimeCurrentOccupation": {
                        "NumUnits": "0"
                        , "UnitMeasurementCd": "ANN"
                    }
                }
                , "License": {
                    "LicenseStatusCd": "Active"
                    , "LicensedDt": "2004-03-28"
                    , "FirstLicensedCurrentStateDt": "2004-03-28"
                    , "LicensePermitNumber": "090561329"
                    , "StateProvCd": "SC"
                    , "StateProv": "SC"
                    , "CountryCd": "US"
                }
            }
            , "PersDriverInfo": {
                "-VehPrincipallyDrivenRef": "Veh1"
                , "DefensiveDriverCd": "N"
                , "DistantStudentInd": "0"
                , "DriverRelationshipToApplicantCd": "IN"
                , "DriverTrainingInd": "0"
                , "FinancialResponsibilityFiling": {
                    "NameInfo": {
                        "PersonName": {
                            "Surname": "TESTERMAN"
                            , "GivenName": "MICHAEL"
                        }
                    }
                    , "FilingStatusCd": "N"
                }
                , "GoodDriverInd": "0"
                , "GoodStudentCd": "N"
                , "MatureDriverInd": "0"
                , "RestrictedInd": "0"
            }
        };
        try {
            for (i = 0; i < drivers.length; i++) {
                var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
                var indexDriver = i + 1;
                driversIninsurescanJson["-id"] = "Drv" + indexDriver;
                //alert("The driver id inserted is : " + driversIninsurescanJson["-id"]);
                driversIninsurescanJson.GeneralPartyInfo.NameInfo.PersonName.Surname = drivers[i]["fullname"].split(" ")[1];
                driversIninsurescanJson.GeneralPartyInfo.NameInfo.PersonName.GivenName = drivers[i]["fullname"].split(" ")[0];
                driversIninsurescanJson.PersDriverInfo.FinancialResponsibilityFiling.NameInfo.PersonName.Surname = drivers[i]["fullname"].split(" ")[1];
                driversIninsurescanJson.PersDriverInfo.FinancialResponsibilityFiling.NameInfo.PersonName.GivenName = drivers[i]["fullname"].split(" ")[0];
                driversIninsurescanJson.DriverInfo.PersonInfo.GenderCd = drivers[i]["sex"];
                driversIninsurescanJson.DriverInfo.PersonInfo.BirthDt = drivers[i]["dob"];
                driversIninsurescanJson.DriverInfo.PersonInfo.MaritalStatusCd = drivers[i]["maritalState"];
                driversIninsurescanJson.DriverInfo.License.LicensePermitNumber = drivers[i]["license"];
                //Here we need to progress the dates by 16 years
                var myDate = new Date(drivers[i]["dob"]);
                myDate.setYear(myDate.getFullYear() + 16);
                //alert("Progressed date: " + formatDate(myDate));
                driversIninsurescanJson.DriverInfo.License.LicensedDt = formatDate(myDate);
                driversIninsurescanJson.DriverInfo.License.FirstLicensedCurrentStateDt = formatDate(myDate);
                driversIninsurescanJson.DriverInfo.License.StateProvCd = drivers[i]["state"];
                driversIninsurescanJson.DriverInfo.License.StateProv = drivers[i]["state"];
                driversIninsurescanJson.PersDriverInfo.RestrictedInd = driver[i]["category"];
                //Add this driver to the insurescanJson
                insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver.push(driversIninsurescanJson);
                sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
                deferred.resolve(true);
                //            this.storeNamedInsured();
            }
        }
        catch (err) {
            console.log(TAG + "error storing drivers: ", err);
            deferred.reject(false);
        }
        return deferred.promise;
    };
    return this;
}]);