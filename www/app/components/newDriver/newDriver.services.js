services.factory('testService', function () {
    //
    //
    this.seePrimary = function () {
        try {
            var session = JSON.parse(sessionStorage.getItem('session'));
            if (session.drivers == null || (Object.keys(session.drivers).length == 0)) {
                session['drivers'] = {};
                sessionStorage.setItem('session', JSON.stringify(session));
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log('primary check failed with this error: \n', err);
            return false;
        }
    };
    //
    this.checkEdit = function (statename, driverId) {
        if (statename == "newDriver.edit") {
            var session = JSON.parse(sessionStorage.getItem('session'));
            var driver = session.drivers[driverId];
            if (driverId == 0) {
                document.forms[0].fullname.value = driver["fullname"];
                document.forms[0].license.value = driver["license"];
                document.forms[0].street.value = driver["street"];
                document.forms[0].dob.value = driver["dob"];
                document.forms[0].city.value = driver["city"];
                document.forms[0].state.value = driver["state"];
                document.forms[0].zip.value = driver["zip"];
                document.forms[0].sex.value = driver["sex"];
                document.forms[0].gstreet.value = driver["gstreet"];
                document.forms[0].gcity.value = driver["gcity"];
                document.forms[0].gstate.value = driver["gstate"];
                document.forms[0].gzip.value = driver["gzip"];
                document.forms[1].county.value = driver["county"];
                document.forms[1].phone.value = driver["phone"];
                document.forms[1].email.value = driver["email"]
                if (document.forms[1].maritalstatus["0"].value == driver["maritalState"]) {
                    document.forms[1].maritalstatus["0"].selcted = true;
                }
                else if (document.forms[1].maritalstatus["1"].value == driver["maritalState"]) {
                    document.forms[1].maritalstatus["1"].selcted = true;
                }
                document.getElementById('gcheckbox-yes').checked = true;
            }
            else {
                document.forms[0].fullname.value = driver["fullname"];
                document.forms[0].license.value = driver["license"];
                document.forms[0].licensedate.value = driver["licensedate"];
                document.forms[0].dob.value = driver["dob"];
                document.forms[0].state.value = driver["state"];
                document.forms[0].sex.value = driver["sex"];
                document.forms[0].maritalstatus.value = driver["maritalState"];
            }
        }
    };
    this.addMaritalStatus = function (driverId, pageBlockItems) {
        var maritalstatus = {
            "type": "select"
            , "label": "Marital Status"
            , "options": [
                            "single"
                            , "married"]
        };
        if (driverId != "0") {
            pageBlockItems['license_info']['maritalstatus'] = maritalstatus;
            return pageBlockItems;
        }
        else {
            return pageBlockItems;
        }
    };
    //captures photo on camera icon clicked
    this.capturePhoto = function () {
        scanner.startScanning(MWBSInitSpace.init, InsureScan.onLicensePhoto);
    };
    //
    this.uploadPhoto = function () {
        //        if (photoID != null) photoDestination = photoID.toString();
        navigator.camera.getPicture(this.uploadsuccess, this.uploadfail, {
            quality: 50
            , destinationType: Camera.DestinationType.FILE_URI
            , sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    };
    this.uploadsuccess = function (imageData) {
        scanner.scanImage(MWBSInitSpace.init, InsureScan.onLicensePhoto, imageData);
    };
    this.uploadfail = function (imageData) {
        console.log('image upload failed: \n', imageData);
    };
    //defines insurescan object and parses response from manatee
    if (typeof InsureScan === 'undefined' || InsureScan === null) {
        InsureScan = {};
    }
    InsureScan.onLicensePhoto = function (result) {
        var userInformation = result.code.split("ANSI")[1].split("</pre>")[0].split(/\n/);
        var userDataMap = {}
            , line;
        for (line = 1; line < userInformation.length; ++line)
        // From each line from the informations, the first 3 are the key (the pattern, example: DAJ) and the rest is the value (example: AL)
            userDataMap[userInformation[line].substr(0, 3)] = userInformation[line].substr(3);
        //JMW HACK: userDataMap[DAC] is alabama license first name, but userDataMap[DCT] is WA. We need to handle each state's IDs differently probably.
        if (userDataMap["DAJ"] == "WA") {
            document.forms[0].fullname.value = userDataMap["DCT"] + " " + userDataMap["DCS"];
        }
        else {
            document.forms[0].fullname.value = userDataMap["DAC"] + " " + userDataMap["DCS"];
        }
        document.forms[0].license.value = userDataMap["DAQ"];
        //return date in proper format
        document.forms[0].dob.value = userDataMap["DBB"].substr(0, 2) + "-" + userDataMap["DBB"].substr(2, 2) + "-" + userDataMap["DBB"].substr(4);
        if (document.forms[0].licensedate) {
            document.forms[0].licensedate.value = userDataMap["DBD"].substr(0, 2) + "-" + userDataMap["DBD"].substr(2, 2) + "-" + userDataMap["DBD"].substr(4);
        }
        document.forms[0].state.value = userDataMap["DAJ"];
        document.forms[0].street.value = userDataMap["DAG"];
        document.forms[0].city.value = userDataMap["DAI"];
        document.forms[0].zip.value = userDataMap["DAK"].substr(0, 5);
        document.forms[0].sex.value = ["M", "F"][userDataMap["DBC"] - 1];
        //        var driversInputs = document.getElementsByClassName("mdl-textfield");
        //        for (var i = 0; i < driversInputs.length; i++) {
        //            driversInputs[i].className = driversInputs[i].className + " is-dirty";
        //        }
        //        SetGaraging(true); // Auto fill out garaging info after license scan
    };
    //    this.populateUserFields = function (page) {
    //        document.forms[page].fullname.value = userDataMap["DAC"] + " " + userDataMap["DCS"];
    //        document.forms[page].license.value = userDataMap["DAQ"];
    //        document.forms[page].dob.value = userDataMap["DBB"].substr(page, 2) + "/" + userDataMap["DBB"].substr(2, 2) + "/" + userDataMap["DBB"].substr(4);
    //        document.forms[page].state.value = userDataMap["DAJ"];
    //        document.forms[page].street.value = userDataMap["DAG"];
    //        document.forms[page].city.value = userDataMap["DAI"];
    //        document.forms[page].zip.value = userDataMap["DAK"].substr(page, 5);
    //        document.forms[page].sex.value = ["M", "F"][userDataMap["DBC"] - 1];
    //    };
    this.cleanFields = function cleanFields() {
        document.forms[0].fullname.value = "";
        document.forms[0].street.value = "";
        document.forms[0].license.value = "";
        document.forms[0].dob.value = "";
        document.forms[0].city.value = "";
        document.forms[0].state.value = "";
        document.forms[0].zip.value = "";
        document.forms[0].sex.value = "";
    };
    this.setGaraging = function () {
        document.forms[0].gstreet.value = document.forms[0].street.value;
        document.forms[0].gcity.value = document.forms[0].city.value;
        document.forms[0].gstate.value = document.forms[0].state.value;
        document.forms[0].gzip.value = document.forms[0].zip.value;
    };
    this.unSetGaraging = function () {
        document.forms[0].gstreet.value = '';
        document.forms[0].gcity.value = '';
        document.forms[0].gstate.value = '';
        document.forms[0].gzip.value = '';
    };
    this.formatDate = function (date) {
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
        //        var date = [year, month, day].join('-');
        var time = [hour, minute, second].join(':');
        return date;
    };
    this.licenseSubmit = function (driver) {
        drivers = sessionStorage.getItem('drivers');
        drivers.push(driver);
    };
    var NAMED_INSURED = 0
        , EXCLUDED = 1
        , REGULAR = 2
        , categories = ["named insured", "excluded", "regular"];
    this.onDriversLicenseSubmit = function (page, primary, driverId) {
        if (primary == true) {
            var driver = {};
            driver["fullname"] = document.forms[page].fullname.value;
            driver["license"] = document.forms[page].license.value;
            driver["street"] = document.forms[page].street.value;
            driver["dob"] = document.forms[page].dob.value;
            driver["city"] = document.forms[page].city.value;
            driver["state"] = document.forms[page].state.value;
            driver["zip"] = document.forms[page].zip.value;
            driver["sex"] = document.forms[page].sex.value;
            //garaging details
            driver["gstreet"] = document.forms[page].gstreet.value;
            driver["gcity"] = document.forms[page].gcity.value;
            driver["gstate"] = document.forms[page].gstate.value;
            driver["gzip"] = document.forms[page].gzip.value;
            var issueDate = sessionStorage.getItem("issueDate");
            var expDate = sessionStorage.getItem("expDate");
            driver["issueDate"] = issueDate;
            driver["expDate"] = expDate;
            driver['id'] = 0;
            driver
            //        sessionStorage.setItem("driverId", parseInt(sessionStorage.getItem("driverId")) + 1);
            //        driver["id"] = sessionStorage.getItem("driverId");
            sessionStorage.setItem("session", JSON.stringify({
                "drivers": [driver]
            }));
            var drivers = JSON.parse(sessionStorage.getItem("session"))["drivers"];
            //Deriving the firstname and lastname from driver fullname
            var fullname = driver["fullname"];
            var split = fullname.split(" ");
            var Firstname = split[0];
            var Lastname = split[1];
            //            sessionStorage.setItem("session", JSON.stringify(driver));
            //var driver1 = JSON.parse(sessionStorage.getItem("session"));
            var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
            /*Update the Name */
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
            //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProvCd = driver["state"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProvCd = "MS";
            //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProv = driver["state"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProv = "MS"
                //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.PostalCode = driver["zip"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.PostalCode = "38601";
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.CountryCd = "US";
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.Country = "USA";
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.AddrTypeCd = "MailingAddress";
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.Addr1 = driver["street"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.City = driver["city"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProvCd = driver["state"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.StateProv = driver["state"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.PostalCode = "38601";
            //            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.PostalCode = driver["zip"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.CountryCd = "US";
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.Country = "USA";
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.AddrTypeCd = "MailingAddress";
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.Addr1 = driver["street"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.City = driver["city"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.StateProvCd = driver["state"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.StateProv = driver["state"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.PostalCode = "38601";
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
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.PersonInfo.BirthDt = this.formatDate(driver["dob"]);
            /*Update the License details*/
            //Here we need to progress the dates by 16 years
            var myDate = new Date(driver["dob"]);
            myDate.setYear(myDate.getFullYear() + 16);
            //alert("Progressed date: " + this.formatDate(myDate));
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.LicensePermitNumber = driver["license"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.LicensedDt = this.formatDate(myDate);
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.FirstLicensedCurrentStateDt = this.formatDate(myDate);
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.StateProvCd = driver["state"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.StateProv = driver["state"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.CountryCd = "US";
            /*Update the gender information for the first name insured*/
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.PersonInfo.GenderCd = driver["sex"];
            sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
            //        document.forms[page].submit();
            console.log(drivers);
        }
        else {
            var session = JSON.parse(sessionStorage.getItem("session"));
            var driver = {};
            driver["fullname"] = document.forms[page].fullname.value;
            driver["license"] = document.forms[page].license.value;
            driver["licensedate"] = document.forms[page].licensedate.value;
            driver["dob"] = document.forms[page].dob.value;
            driver["state"] = document.forms[page].state.value;
            driver["sex"] = document.forms[page].sex.value;
            driver["maritalState"] = document.forms[page].maritalstatus.value;
            driver["category"] = "regular";
            driver["category"] = "regular";
            driver['id'] = session['drivers'].length;
            for (var i; i < session.drivers.length; i++) {
                if (driver[i]['id'] == driverId) {
                    session.drivers[driverId] = driver;
                    sessionStorage.setItem("session", JSON.stringify(session));
                    return true
                }
            }
            session["drivers"].push(driver);
            sessionStorage.setItem("session", JSON.stringify(session));
            var drivers = JSON.parse(sessionStorage.getItem("session"))["drivers"];
            return true;
        }
    };
    this.checkHidden = function (pageBlockOptions) {
        if (pageBlockOptions['pageBlock_options'].hidden == "true") {
            return false;
        }
        else {
            return true;
        }
    };
    this.makeVisible = function (pageBlock, pageBlockOptions, bool) {
        if (bool == true) {
            pageBlockOptions[pageBlock]['pageBlock_options'].hidden = "true";
        }
        else {
            pageBlockOptions[pageBlock]['pageBlock_options'].hidden = "false";
        }
        return pageBlockOptions;
    };
    this.onUserInfoSubmit = function (page) {
        var drivers = JSON.parse(sessionStorage.getItem("session"))["drivers"];
        drivers[0]["county"] = document.forms[page].county.value;
        drivers[0]["phone"] = document.forms[page].phone.value;
        drivers[0]["email"] = document.forms[page].email.value;
        if (document.forms[page].maritalstatus["0"].selected == true) {
            drivers[0]["maritalState"] = document.forms[page].maritalstatus["0"].value;
        }
        else if (document.forms[page].maritalstatus["1"].selected == true) {
            drivers[0]["maritalState"] = document.forms[page].maritalstatus["1"].value;
        }
        //            else {
        //                alert("marital status error");
        //            }
        drivers[0]["category"] = "named insured";
        sessionStorage.setItem("session", JSON.stringify({
            "drivers": drivers
        }));
        var drivers = JSON.parse(sessionStorage.getItem("session"))["drivers"];
        var retAgentLogin = sessionStorage.getItem("agentlogin");
        var retAgentPasswd = sessionStorage.getItem("agentpasswd");
        //alert("The number of drivers stored so far: " + drivers.length + " the agent details are: " + retAgentLogin + " " + retAgentPasswd);
        /*Update the county*/
        var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.County = drivers[0]["county"];
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.PersApplicationInfo.InsuredOrPrincipal[0].GeneralPartyInfo.Addr.County = drivers[0]["county"];
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].Addr.County = drivers[0]["county"];
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].Addr.County = drivers[0]["county"];
        /*Update the marital status for the first nameinsured driver*/
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.PersonInfo.MaritalStatusCd = drivers[0]["maritalState"];
        sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
    };
    return this;
});