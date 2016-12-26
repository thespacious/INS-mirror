services.factory('driversService', function (BASE_SERVER, $state) {
    //
    //SESSION MANIPULATION
    //
    this.session = function () {
        if (!JSON.parse(sessionStorage.getItem('session'))) {
            sessionStorage.setItem('session', JSON.stringify({}));
        }
        return JSON.parse(sessionStorage.getItem('session'));
    };
    this.checkDrivers = function (session) {
        if (session['drivers']) {
            return true;
        }
        else {
            return false;
        }
    };
    this.primaryDriver = function (driverId) {
        if ((session['drivers'] == null) && driverId == 0) {
            return true;
        }
        else {
            return false;
        }
    };
    this.drivers = function () {
        if (this.checkDrivers(this.session()) == true) {
            var sess = this.session();
            return sess.drivers;
        }
        else {
            var session = this.session();
            session['drivers'] = [];
            sessionStorage.setItem('session', JSON.stringify(session));
            return session.drivers;
        }
    };
    this.checkCars = function (session) {
        if (session['cars']) {
            return true;
        }
        else {
            return false;
        }
    };
    this.cars = function () {
        if (this.checkCars(this.session()) == true) {
            var sess = this.session();
            return sess.cars;
        }
        else {
            var sess = this.session();
            sess['cars'] = [];
            sessionStorage.setItem('session', JSON.stringify(sess));
            return sess.cars;
        };
    };
    //
    //UI MANIPULATIONS
    //
    this.removeCar = function (position) {
        var cars = this.cars();
        cars.splice(position, 1);
        sessionStorage.setItem("session", JSON.stringify(session));
        return this.cars();
    };
    this.removeDriver = function (position) {
        var drivers = this.drivers();
        drivers.splice(position, 1);
        sessionStorage.setItem("session", JSON.stringify({
            "drivers": drivers
        }));
        // Make it visual that it is possible to add a new driver
        return this.drivers();
    };
    //
    //AJAX CALLS
    //
    this.getQuoteId = function () {
        if (sessionStorage.getItem('credentials') == null) {
            sessionStorage.setItem('credentials', JSON.stringify({}));
        }
        var creds = JSON.parse(sessionStorage.getItem('credentials'));
        var req = {
            type: "POST"
            , url: BASE_SERVER + "/getquoteid"
            , headers: {
                'SESSIONID': creds.userCreds.sessionId
            }
            , async: false
        };
        if (creds['quoteId'] == null) {
            $.ajax(req).done(function (data) {
                var creds = JSON.parse(sessionStorage.getItem('credentials'));
                creds['quoteId'] = data;
                sessionStorage.setItem('credentials', JSON.stringify(creds));
            }).fail(function (data) {
                console.log("quote id return error, find out why:");
                console.log(data);
            });
            return true;
        }
        else {
            return false;
        }
    };
    //
    //DEBUG: What do we do with this, do we need this?
    var formatDate = function (date) {
        console.log("we're using the format date funcction in drivers.services.js: ", date);
        var d = new Date(date)
            , month = '' + (d.getMonth() + 1)
            , day = '' + d.getDate()
            , year = d.getFullYear();
        hour = d.getHours();
        minute = '' + d.getMinutes();
        second = '' + d.getSeconds();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hour.length < 2) {
            hour = 'T0' + hour;
        }
        else {
            hour = 'T' + hour;
        }
        if (minute.length < 2) minute = '0' + minute;
        if (second.length < 2) second = '0' + second;
        var date = [month, day, year].join('/');
        var time = [hour, minute, second].join(':');
        return date;
    };
    //
    //TODO: should we put this somewhere global so we can refernce the enumeration in the future?
    //
    var NAMED_INSURED = 0
        , EXCLUDED = 1
        , REGULAR = 2
        , categories = ["named insured", "excluded", "regular"];
    //
    //Store Drivers and add to the existing insurescan JSON
    //
    this.storeDrivers = function (drivers) {
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
        for (i = 0; i < drivers.length; i++) {
            if (i > 0) {
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
                //Add this driver to the insurescanJson
                insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver.push(driversIninsurescanJson);
                sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
            }
        }
    };
    //
    //Named insured is stored with slightly diferent JSON than the other drivers
    //TODO: add function to handle excluded drivers and test these two functions
    //
    this.storeNamedInsured = function () {
        var drivers = this.drivers();
        var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
        /*If the user jumps between the screens to and fro, ten we need to make sure that we do not add multiple/duplicate entries. 
        Below logic sanitizes the insurescanJson before updating it every sigle time*/
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal.splice(1, insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal.length - 1);
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal.splice(1, insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal.length - 1);
        var namedInsuredQuantity = 0;
        // Counts how many named insured are saved in the session
        for (i = 0; i < drivers.length; i++) {
            if (drivers[i]["category"] == categories[NAMED_INSURED]) namedInsuredQuantity++;
            if (i == 1) {
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
    //
    //MAKE sure this,session gets called to set up the session for everyone else,
    //TODO: do this more proper like
    this.session();
    //
    return this;
});