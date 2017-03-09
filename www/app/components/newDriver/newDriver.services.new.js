services.factory('newDriverService', function (APP_DEBUG) {
    /////////////////// set/unset UI Elements ////////////////
    this.setGaraging = function (garagingInfo, driver) {
        garagingInfo.gstreet.value = driver.street.value;
        garagingInfo.gcity.value = driver.city.value;
        garagingInfo.gstate.value = driver.state.value;
        garagingInfo.gzip.value = driver.zip.value;
    };
    this.unSetGaraging = function (garagingInfo) {
        garagingInfo.gstreet.value = '';
        garagingInfo.gcity.value = '';
        garagingInfo.gstate.value = '';
        garagingInfo.gzip.value = '';
    };
    /////////////////// Formatting Data //////////////////////
    //============ Available driver status types ======================
    var NAMED_INSURED = 0
        , EXCLUDED = 1
        , REGULAR = 2
        , categories = ["named insured", "excluded", "regular"];
    //=========== Date formatting for matching ACORD standard ==========
    var formatDate = function (date) {
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
    //////////////////////////////////////////////////////////
    /////////////////// scanning functions ///////////////////
    //======================================
    //Call mwb Functions and pass to callback
    //=====================================
    this.capturePhoto = function () {
        var returnData = {};
        //TODO: set key somewhere less obtrusive    
        mwbScanner.setKey("kwILwP2bCHIfNLMOJadaGwR3V0sRh+kPA6LgV1jyXYY=").then(function (response) {
            if (response) console.log('VALID KEY');
            else console.log('INVALID KEY');
        });
        mwbScanner.startScanning(function (result) {
            reutrnData = InsureScan.onLicensePhoto(result);
        });
        return returnData;
    };
    //===========================================
    this.uploadPhoto = function () {
        //        if (photoID != null) photoDestination = photoID.toString();
        navigator.camera.getPicture(this.uploadsuccess, this.uploadfail, {
            quality: 50
            , destinationType: Camera.DestinationType.FILE_URI
            , sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    };
    this.uploadsuccess = function (imageData) {
        mwb.scanImage(function (result) {
            returnData = InsureScan.onLicensePhoto(result);
        });
        return returnData;
    };
    this.uploadfail = function (imageData) {
        console.log('image upload failed: \n', imageData);
    };
    //====== Define Isurescan Namespace =========
    if (typeof InsureScan === 'undefined' || InsureScan === null) {
        InsureScan = {};
    }
    //========= Callback for manatee (mwb) =================
    InsureScan.onLicensePhoto = function (result) {
        var driverInfo = {};
        var userInformation = result.code.split("ANSI")[1].split("</pre>")[0].split(/\n/);
        var userDataMap = {}
            , line;
        for (line = 1; line < userInformation.length; ++line)
        // From each line from the informations, the first 3 are the key (the pattern, example: DAJ) and the rest is the value (example: AL)
            userDataMap[userInformation[line].substr(0, 3)] = userInformation[line].substr(3);
        //JMW HACK: userDataMap[DAC] is alabama license first name, but userDataMap[DCT] is WA. We need to handle each state's IDs differently probably.
        if (userDataMap["DAJ"] == "WA") {
            driverInfo['fullname'] = userDataMap["DCT"] + " " + userDataMap["DCS"];
        }
        else {
            driverInfo['fullname'] = userDataMap["DAC"] + " " + userDataMap["DCS"];
        }
        driverInfo['license'] = userDataMap["DAQ"];
        driverInfo['dob'] = userDataMap["DBB"].substr(0, 2) + "/" + userDataMap["DBB"].substr(2, 2) + "/" + userDataMap["DBB"].substr(4);
        driverInfo['licensedate'] = userDataMap["DBD"].substr(0, 2) + "/" + userDataMap["DBD"].substr(2, 2) + "/" + userDataMap["DBD"].substr(4);
        driverInfo['state'] = userDataMap["DAJ"];
        driverInfo['street'] = userDataMap["DAG"];
        driverInfo['city'] = userDataMap["DAI"];
        driverInfo['zip'] = userDataMap["DAK"].substr(0, 5);
        driverInfo['sex'] = ["M", "F"][userDataMap["DBC"] - 1];
        return driverInfo;
    };
    /////////////////// Store Drivers //////////////////////////////
    // Store Primary(named insured) and regular drivers differently //////
    //======================== Primary Driver =======================
    this.primaryDriverSubmit = function (driver, garagingInfo) {
        var newDriver = {};
        var session = JSON.parse(sessionStorage.getItem("session"));
        newDriver['fullname'] = driver.fullname.value;
        newDriver['license'] = driver.license.value;
        newDriver['licensedate'] = driver.licensedate.value;
        newDriver['dob'] = driver.dob.value;
        newDriver['street'] = driver.street.value;
        newDriver['city'] = driver.city.value;
        newDriver['state'] = driver.state.value;
        newDriver['zip'] = driver.zip.value;
        newDriver['sex'] = driver.sex.selected;
        newDriver['id'] = session['drivers'].length;
        newDriver['category'] = categories[NAMED_INSURED];
        //        session['drivers'] = newDriver;
        if (session['drivers'] && Array.isArray(session['drivers'])) {
            session['drivers'].push(newDriver);
        }
        else {
            session['drivers'] = [];
            session['drivers'].push(newDriver);
        }
        sessionStorage.setItem("session", JSON.stringify(session));
        try {
            addPrimaryToJson(newDriver, garagingInfo);
        }
        catch (err) {
            console.log("failed to add primary driver to Insurescan Json: ", err);
        }
    };
    //
    //=========================== Additional Info for Primary Driver ========
    //
    this.submitUserInfo = function (userInfo) {
        var drivers = JSON.parse(sessionStorage.getItem("session"))["drivers"];
        drivers[0]["county"] = userInfo.county.value;
        drivers[0]["phone"] = userInfo.phone.value;
        drivers[0]["email"] = userInfo.email.value;
        //        if (userInfo.maritalstatus["0"].selected == true) {
        //            drivers[0]["maritalState"] = userInfo.maritalstatus["single"].value;
        //        }
        //        else if (userInfo.maritalstatus["1"].selected == true) {
        //            drivers[0]["maritalState"] = userInfo.maritalstatus["married"].value;
        //        }
        drivers[0]['maritalState'] = userInfo.maritalstatus.selected;
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
    //
    //=========================== Secondary Drivers =========================
    //
    this.secondaryDriverSubmit = function (driver) {
        var session = JSON.parse(sessionStorage.getItem("session"));
        var driver = {};
        driver["fullname"] = driver.fullname.value;
        driver["license"] = driver.license.value;
        driver["licensedate"] = driver.licensedate.value;
        driver["dob"] = driver.dob.value;
        driver["state"] = driver.state.value;
        driver["sex"] = driver.sex.value;
        driver["maritalState"] = driver.maritalstatus.value;
        driver["category"] = categories[2];
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
    };
    ////////////////////////// Helper Functions ///////////////////////////
    // ======================= Modify Primary Driver JSON =================
    var addPrimaryToJson = function (driver, garagingInfo) {
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
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.LicensedDt = formatDate(myDate);
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.FirstLicensedCurrentStateDt = formatDate(myDate);
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.StateProvCd = driver["state"];
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.StateProv = driver["state"];
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.License.CountryCd = "US";
        /*Update the gender information for the first name insured*/
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersDriver[0].DriverInfo.PersonInfo.GenderCd = driver["sex"];
        sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
        //        userInfo.submit();
        console.log(drivers);
    };
    //////////////////////////////////////////////////////////////////////////
});