services.factory('newCarService', function (BASE_SERVER, $state) {
    //
    //=================
    //GENERAL VARIABLES
    //=================
    //
    // TODO: We're goin to need to know who the owner of the car is and what type of driver they are up front
    //
    var _this = this;
    var photoDestination = null;
    var pictureHolder = ["file:///android_asset/www/img/default1.png", "file:///android_asset/www/img/default2.png"];
    var counter = 1;
    var TAG = "new car services: ";
    //
    // Options of the spinner
    //TODO: remove, we don't use this spinner anymore
    //
    this.opts = {
        lines: 13, // The number of lines to draw
        length: 7, // The length of each line
        width: 4, // The line thickness
        radius: 10, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        color: '#000', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent in px
        left: '50%' // Left position relative to parent in px
    };
    //
    //=================
    //GENERAL FUNCTIONS
    //=================
    //
    //checks if current page block is hidden or not
    //
    this.checkHidden = function (pageBlockOptions) {
        if (pageBlockOptions['pageBlock_options']) {
            if (pageBlockOptions['pageBlock_options'].hidden == "true") {
                return false;
            }
        }
        else {
            return true;
        }
    };
    /**
     * Converts image from base64 to a Blob containing the binary of the image
     *
     * @param b64
     * The image in base64
     *
     * @returns {Blob}
     * Blob containing the binary of the image
     */
    this.b64tob = function (b64) {
        var binary = atob(b64);
        var bytes = new Array(binary.length);
        for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return new Blob([new Uint8Array(bytes)]);
    };
    /**
     * Cleans all the fields
     */
    this.cleanFields = function () {
        document.carInfo.vin.value = "";
        document.carInfo.year.value = "";
        document.carInfo.make.value = "";
        document.carInfo.model.value = "";
        document.getElementById("drivers").selectedIndex = 0;
    };
    /**
     * Populates the foem fields with decoded vin values 
     *
     * @param response
     * Response received from website
     */
    var populatefields2 = function (xmldoc) {
        var doc = {};
        //        document.carInfo.year.value = xmldoc.getElementsByTagName("DecodedVariable")[8].childNodes[3].textContent;
        doc['year'] = xmldoc.getElementsByTagName("DecodedVariable")[8].childNodes[3].textContent;
        doc['make'] = xmldoc.getElementsByTagName("DecodedVariable")[5].childNodes[3].textContent;
        //        document.carInfo.make.value = xmldoc.getElementsByTagName("DecodedVariable")[5].childNodes[3].textContent;
        doc['model'] = xmldoc.getElementsByTagName("DecodedVariable")[7].childNodes[3].textContent;
        //        document.carInfo.model.value = xmldoc.getElementsByTagName("DecodedVariable")[7].childNodes[3].textContent;
        //        alert(autoFillElms[i].className);
        return doc;
    };
    this.populateCarFields = function (response) {
        document.carInfo.year.value = response.split("profile.year=")[1].split("'")[0];
        document.carInfo.make.value = response.split("profile.make=")[1].split("'")[0];
        document.carInfo.model.value = response.split("profile.model=")[1].split("'")[0];
    };
    /**
     * Goes to the previous page
     */
    this.back = function () {
        window.history.back();
    };

    function populateDriverDropdown() {
        // Populates dropdown of Driver with all named insured's name
        var tags = ""; //"<option value='default' disabled selected>Select a Driver </option>";
        var drivers = JSON.parse(sessionStorage.getItem("session"))["drivers"];
        for (var i = 0; i < drivers.length; i++) {
            if (drivers[i]["category"] == "named insured") {
                tags += "<option value='" + drivers[i]['fullname'] + "'>" + drivers[i]['fullname'] + "</option>";
            }
        }
        document.getElementById("drivers").innerHTML = tags;
    }
    //
    //=============
    //VIN FUNCTIONS
    //=============
    //
    /**
     * Called when the user is trying to select an image from his/her gallery
     * In this case, the image should be of the VIN
     *
     */
    this.selectPhotoVIN = function () {
        navigator.camera.getPicture(this.loadImage, function () {}, {
            destinationType: Camera.DestinationType.DATA_URL
            , sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    };
    this.scannerSuccess = function (result) {
        _this.getVin(result.VINCode);
    };
    this.scannerFailure = function (message) {
        alert("scanner error");
    };
    //
    /**
     * Gets the information about the car from VIN
     *
     * @param vin
     * VIN from the car which the information is needed
     */
    this.getVin = function (vin) {
        var returnData = {};
        var req = {
            type: "GET"
            , async: false
            , success: function (data) {
                returnData = data;
                return data;
            }
            , url: "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/" + vin + "*BA?format=json"
        };
        $.ajax(req);
        //            .done(function (data) {
        //            console.log(data);
        //            returnData = data;
        //        }).fail(function (data) {
        //            console.log("vin lookup failed: \n", data);
        //            returnData = data;
        //        });
        return returnData;
    };
    this.getInfoFromWeb = function (vin) {
        //        document.carInfo.vin.value = vin;
        // Make spinner appear
        //        var target = document.getElementById('spinnerContainer');
        //        var spinner = new Spinner(opts).spin(target);
        //        document.getElementById('messageToUser').innerHTML = "";
        var xmlhttp2 = new XMLHttpRequest();
        var requestUrl = "http://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/" + vin + "*BA?format=xml";
        console.log("URL requested: " + requestUrl);
        xmlhttp2.open("GET", requestUrl, true);
        xmlhttp2.onreadystatechange = function () {
            console.log("xmlhttp status code " + xmlhttp2.status);
            console.log("response text:" + xmlhttp2.responseXML);
            if (xmlhttp2.readyState == 4 && (xmlhttp2.status == 200 || xmlhttp2.status == 0)) {
                //                spinner.stop();
                // If response comes with results, populate fields
                if (xmlhttp2.responseXML !== null) {
                    return populatefields2(xmlhttp2.responseXML);
                }
                else {
                    alert("vin error code: " + xmlhttp2.responseXML.getElementsByTagName("DecodedVariable")[1].childNodes[2].textContent + "\nMessage: " + xmlhttp2.responseXML.getElementsByTagName("DecodedVariable")[1].childNodes[3].textContent);
                }
                //            if (xmlhttp2.responseText.match('YOUR SEARCH RESULTS')) this.populateCarFields(xmlhttp2.responseText);
                //            // Else, check if the response say the VIN is incorrect or the VIN length is incorrect
                //            else if (xmlhttp2.responseText.match('the VIN you entered is incorrect') || vin.length > 17) document.getElementById('messageToUser').innerHTML = "The VIN you entered is incorrect";
                //            else document.getElementById('messageToUser').innerHTML = "There is no record of this vehicle";
            }
        };
        xmlhttp2.setRequestHeader("Content-Type", "text/plain; charset=utf-8");
        xmlhttp2.setRequestHeader('User-Agent', "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0");
        xmlhttp2.send();
        return;
    };
    //
    //DEBUG: do we still use this?
    //
    this.loadImage = function (imageData) {
        console.log("load image called from " + TAG);
        var VINInformation;
        // If photoDestination is not null, then the picture is from the car and should be displayed
        /*if (photoDestination != null){
            var smallImage = document.getElementById(photoDestination.toString());

            smallImage.style.display = 'block';

            smallImage.src = "data:image/jpeg;base64," + imageData;
            photoDestination = null;

        }
        // If photoDestionation is null, then the picture is from a VIN and the information about the car should be retrieved
        else {
        */
        this.cleanFields();
        // Make spinner appear
        var target = document.getElementById('spinnerContainer');
        var spinner = new Spinner(opts).spin(target);
        document.getElementById('messageToUser').innerHTML = "";
        // Creating and sending request
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "http://zxing.org/w/decode", true);
        xmlhttp.setRequestHeader("Content-Type", "multipart/form-data; boundary=----WebKitFormBoundary1hATJLhX1IgEklAf");
        var contentTopBoundary = '------WebKitFormBoundary1hATJLhX1IgEklAf\r\n';
        var contentBottomBoundary = '\r\n------WebKitFormBoundary1hATJLhX1IgEklAf--';
        var contentHeader = 'Content-Disposition: form-data; name="f"; filename="aaa.gif"\r\n' + 'Content-Type: image/png\r\n\r\n';
        var blob = new Blob([contentTopBoundary, contentHeader, b64tob(imageData), contentBottomBoundary]);
        xmlhttp.send(blob);
        // Getting response
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 0)) {
                // Stop spinner
                spinner.stop();
                // Check if the barcode was found
                if (xmlhttp.responseText.trim().indexOf("No Barcode") != -1) document.getElementById('messageToUser').innerHTML = "No VIN found.";
                else {
                    // Gets the VIN in the response
                    VINInformation = xmlhttp.responseText.split("<tr><td>Raw text</td><td><pre>")[1].split("</pre>")[0];
                    // Check if VIN is international, if it is remove the I at the beggining of it
                    if (VINInformation.length == 18 && VINInformation[0] == "I") VINInformation = VINInformation.substr(1);
                    this.cleanFields();
                    // Displaying the VIN scanned
                    document.carInfo.vin.value = VINInformation;
                    // If VIN is not from one of the cars already listed, retrieve information about it
                    if (!this.VINlisted(VINInformation)) this.getInfoFromWeb(VINInformation);
                    else document.getElementById('messageToUser').innerHTML = "Car already listed.";
                }
            }
        };
        //}
    };
    /**
     * Check if VIN is from one of the cars already listed
     *
     * @param vin
     * VIN being searched
     */
    //
    //DEBUG: do we still use this
    //
    this.VINlisted = function (vin) {
        console.log("VIn listed called from " + TAG);
        var session = JSON.parse(sessionStorage.getItem("session"))
            , i, found = false;
        if ("cars" in session) {
            var cars = session["cars"];
            for (i = 0; i < cars.length; i++) {
                if (cars[i]["vin"] == vin) {
                    found = true;
                    break;
                }
            }
        }
        if (found == true) document.getElementById('barcodestatus').innerHTML = "Car already listed.";
        return found;
    };
    /**
     * Called when the user is trying to take a picture
     *
     * @param photoID
     * This will identify which frame the user is trying to fill with his/her car's picture
     */
    this.capturePhotoVin = function () {
        _this = this;
        window.plugins.VINBarcodeScanner.scan(this.scannerSuccess, this.scannerFailure);
    };
    //
    //===================
    //CAR PHOTO FUNCTIONS
    //===================
    //
    /**
     * Called when the user is trying to select an image from his/her gallery
     * In this case, the image should be of the car
     *
     * @param photoID
     * This will identify which frame the user is trying to fill with his/her car's image
     */
    this.selectPhotoCar = function (photoID) {
        if (photoID != null) photoDestination = photoID.toString();
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality: 50
            , destinationType: Camera.DestinationType.FILE_URI
            , sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    };
    /**
     * Called when the user is trying to upload an existing picture
     *
     * @param photoID
     * This will identify which frame the user is trying to fill with his/her car's picture
     */
    this.selectPhotoCar = function () {
        //        if (photoID != null) photoDestination = photoID.toString();
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality: 50
            , destinationType: Camera.DestinationType.FILE_URI
            , sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    };
    //
    //
    this.takePhotoCar = function () {
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality: 100
            , sourceType: Camera.PictureSourceType.CAMERA
            , destinationType: Camera.DestinationType.FILE_URI, //        encodingType: Camera.EncodingType.PNG,
            correctOrientation: true
        });
    };
    /**
     * Called when the capture or selection of the picture is done without any problem
     *
     * @param imageData
     * Picture in base64
     */
    this.onSuccess = function (imageData) {
        this.imageData = imageData;
        //        if (document.getElementById('photo1').src == "img/adam.jpg") {
        //            document.getElementById('photo1').src = imageData;
        //        }
        //        else if (document.getElementById('photo2').src == "img/adam.jpg") {
        //            document.getElementById('photo2').src = imageData
        //        }
        //        else {
        //            console.log("no, no sir, that does nothing");
        //        }
        var image1 = document.getElementById('photo1');
        var image2 = document.getElementById('photo2');
        //        smallImage.style.display = 'block';
        if ((counter % 2) == 0) {
            image2.src = imageData;
            pictureHolder[1] = imageData;
            counter++;
        }
        else {
            image1.src = imageData;
            pictureHolder[0] = imageData;
            counter++;
        }
        //        pictureHolder.push(imageData);
        photoDestination = null;
        //        uploadImage2(imageData);
    };
    this.onFail = function (message) {
        alert('Failed because ' + message);
    };
    //
    //DEBUG: which of these is called?
    var uploadImage3 = function (imageData) {
        console.log(TAG, "we use uploadImage3");
        var creds = JSON.parse(sessionStorage.getItem('credentials'));
        images = ['file:///android_asset/www/img/adam.jpg', 'file:///android_asset/www/img/adam.jpg'];
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageData.substr(imageData.lastIndexOf('/') + 1);
        //        options.mimeType = "image/jpeg";
        options.chunkedMode = true;
        options.httpMethod = "POST";
        //        options.headers = {
        //            Connection: "close"
        //            , 'SessionID': creds.userCreds.sessionId
        //        };
        var ft = new FileTransfer();
        ft.upload(imageData, encodeURI(BASE_SERVER + "/accept/" + creds.quoteId), win, fail, options);
    };
    var uploadImages = function (images) {
        console.log(TAG, "we use uploadImages");
        var creds = JSON.parse(sessionStorage.getItem('credentials'));
        for (image in images) {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = images[image].substr(image.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;
            options.fileName = images[image].substr(image.lastIndexOf('/') + 1);
            options.headers = {
                Connection: "close"
                , 'SessionID': creds.userCreds.sessionId
            };
            //
            var ft = new FileTransfer();
            ft.upload(images[image], encodeURI(BASE_SERVER + "/upload/" + creds.quoteId + "/property"), win, fail, options);
        }
    };
    //
    //Called if file transfer is successful
    //
    var win = function (r) {
        console.log("File transferred successfully.");
        try {
            console.log(r.response);
        }
        catch (err) {
            console.log(r);
            console.log(err);
        }
        return true;
    };
    //
    //called if file transfer fails
    //
    var fail = function (error) {
        console.log(error);
        return false
    };
    //
    //======================
    //VALIDATE AND STORE CAR
    //======================
    //
    //TODO: break into smaller functions?
    this.storeCar = function (owner) {
        var session = JSON.parse(sessionStorage.getItem("session"));
        var cars = [];
        if (session.cars != null) {
            cars = session.cars;
        }
        var car = {};
        car["vin"] = document.carInfo.vin.value;
        car["year"] = document.carInfo.year.value;
        car["make"] = document.carInfo.make.value;
        car["model"] = document.carInfo.model.value;
        car["owner"] = owner;
        car["photo1"] = document.getElementById('photo1').src;
        car["photo2"] = document.getElementById('photo2').src;
        cars.push(car);
        session["cars"] = cars;
        sessionStorage.setItem("session", JSON.stringify(session));
        //Here we will update the car information
        if (session.cars.length == 1) {
            var car = JSON.parse(sessionStorage.getItem("session"))["cars"][0];
            var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[0].Manufacturer = car["make"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[0].Model = car["model"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[0].ModelYear = car["year"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[0].VehIdentificationNumber = car["vin"];
            sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
            return true;
        }
        else {
            var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
            var session = JSON.parse(sessionStorage.getItem("session"));
            var cars = session["cars"];
            var drivers = session.drivers;
            /*If the user jumps between the screens to and fro, ten we need to make sure that we do not add multiple/duplicate entries. 
            Below logic sanitizes the insurescanJson before updating it every sigle time*/
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh.splice(1, insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh.length - 1);
            //Here we need to see that the JSON gets updated
            var carsIninsurescanJson = {
                "-id": "Veh1"
                , "-RatedDriverRef": "Drv1"
                , "-LocationRef": "Loc1"
                , "Manufacturer": "Ford"
                , "Model": "Taurus SE"
                , "ModelYear": "2006"
                , "VehBodyTypeCd": "SEDAN"
                , "VehTypeCd": "PP"
                , "AntiTheftDeviceInfo": {
                    "AntiTheftDeviceCd": "P"
                    , "AntiTheftProductCd": "99"
                }
                , "NumDaysDrivenPerWeek": "5"
                , "EstimatedAnnualDistance": {
                    "NumUnits": "12000"
                    , "UnitMeasurementCd": "Miles"
                }
                , "Displacement": {
                    "NumUnits": "3"
                    , "UnitMeasurementCd": "Liters"
                }
                , "LeasedVehInd": "0"
                , "NumCylinders": "6"
                , "RegistrationStateProvCd": "SC"
                , "VehIdentificationNumber": "1FAFP53U06"
                , "AlteredInd": "0"
                , "AntiLockBrakeCd": "Y"
                , "DaytimeRunningLightInd": "0"
                , "EngineTypeCd": "G"
                , "DistanceOneWay": {
                    "NumUnits": "12"
                    , "UnitMeasurementCd": "SMI"
                }
                , "MultiCarDiscountInd": "0"
                , "NewVehInd": "0"
                , "NonOwnedVehInd": "0"
                , "LengthTimePerMonth": {
                    "NumUnits": "4"
                    , "UnitMeasurementCd": "MON"
                }
                , "NumYouthfulOperators": "0"
                , "SeenCarInd": "0"
                , "VehInspectionStatusCd": "N"
                , "VehUseCd": "DW"
                , "FourWheelDriveInd": "0"
                , "SeatBeltTypeCd": "Active"
                , "AirBagTypeCd": "FrontBoth"
                , "Coverage": [
                    {
                        "CoverageCd": "BI"
                        , "CoverageDesc": "Bodily Injury Liability"
                        , "Limit": [
                            {
                                "FormatInteger": "25000"
                                , "LimitAppliesToCd": "PerPerson"
                  }
                    , {
                                "FormatInteger": "50000"
                                , "LimitAppliesToCd": "PerAcc"
                  }
                ]
              }
            , {
                        "CoverageCd": "PD"
                        , "CoverageDesc": "Property Damage"
                        , "Limit": {
                            "FormatInteger": "25000"
                            , "LimitAppliesToCd": "PropDam"
                        }
              }
			]
            };
            carsIninsurescanJson["-id"] = "Veh" + cars.length;
            carsIninsurescanJson["-RatedDriverRef"] = "Drv" + ($state.params.driverId + 1);
            carsIninsurescanJson.Manufacturer = car["make"];
            carsIninsurescanJson.Model = car["model"];
            carsIninsurescanJson.ModelYear = car["year"];
            carsIninsurescanJson.VehIdentificationNumber = car["vin"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh.push(carsIninsurescanJson);
            sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
        }
        return true;
    };
    //
    //TODO: break into smaller functions?
    this.validateCoverages = function validateCoverage(page) {
        //alert("validateCoverage starts");
        var selectedcompdeduct = "";
        var selectedcolldeduct = "";
        var selectedcompdeductOptionValue = "";
        var selectedcolldeductOptionValue = "";
        //
        var rentalreimbursement = document.forms[page].elements["RR"].selectedOptions[0].value;
        //
        var towing = document.forms[page].elements["towing"].selectedOptions[0].value
        var selectedUML = document.forms[page].elements["UML"].selectedIndex;
        var selectedUMLOptionValue = document.forms[page].elements["UML"].options[selectedUML].value;
        //alert("The Uninsured/Underinsured Motorist Liability is " + selectedUMLOptionValue);
        var selectedMP = document.forms[page].elements["MP"].selectedIndex;
        var selectedMPOptionValue = document.forms[page].elements["MP"].options[selectedMP].value;
        //alert("Medical Payments is " + selectedMPOptionValue);
        selectedcompdeduct = document.forms[page].elements["compdeduct"].selectedIndex;
        selectedcompdeductOptionValue = document.forms[page].elements["compdeduct"].options[selectedcompdeduct].value;
        //alert("The Comprehensive Deductible is " + selectedcompdeductOptionValue);
        selectedcolldeduct = document.forms[page].elements["colldeduct"].selectedIndex;
        selectedcolldeductOptionValue = document.forms[page].elements["colldeduct"].options[selectedcolldeduct].value;
        //alert("The Collision Deductible is " + selectedcolldeductOptionValue);
        /*If amongst Comprehensive Deductible and Collision Deductible, one is "No Coverage", the other should be the same*/
        if ((selectedcompdeductOptionValue == "nocov" && selectedcolldeductOptionValue != "nocov") || (selectedcompdeductOptionValue != "nocov" && selectedcolldeductOptionValue == "nocov")) {
            alert("If one of the deductible is No Coverage, other should be the also be No Coverage. Please select reselect the same.");
            return;
        }
        var session = JSON.parse(sessionStorage.getItem("session"));
        var position = session.cars.length - 1;
        var coverage = {};
        /*
            coverage["UBI"] = document.getElementById('optUniBI').checked;
            coverage["MP"] = document.getElementById('optMedPay').checked;
        	coverage["CompCollision"] = document.document.forms[page].coverages.value;
        */
        /*Adding the new coverage parameters*/
        coverage["UML"] = selectedUMLOptionValue;
        coverage["MP"] = selectedMPOptionValue;
        coverage["compdeduct"] = selectedcompdeductOptionValue;
        coverage["colldeduct"] = selectedcolldeductOptionValue;
        coverage["towing"] = towing;
        coverage["RR"] = rentalreimbursement;
        session["cars"][position]["coverage"] = coverage;
        var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
        //alert("The car position we are dealing with is: " + position);
        /*Below ensures that the coverages are clean before we push in anything
        The BI and PD coverages will always be present*/
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[position].Coverage.splice(2, insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[position].Coverage.length - 2);
        if (session["cars"][position]["coverage"]["UML"] == "Accept") {
            var UMLJSON = {
                "CoverageCd": "UM"
                , "CoverageDesc": "Uninsured/Underinsured Motorist Liability"
                , "Limit": [
                    {
                        "FormatInteger": "25000"
                        , "LimitAppliesToCd": "PerPerson"
                  }
                , {
                        "FormatInteger": "50000"
                        , "LimitAppliesToCd": "PerAcc"
                  }
                ]
            };
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[position].Coverage.push(UMLJSON);
            //sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
            //alert("After the UMBI push:" + JSON.stringify(insurescanJson));
        }
        if (session["cars"][position]["coverage"]["MP"] != "No Coverage") {
            var MPJSON = {
                "CoverageCd": "MEDPM"
                , "CoverageDesc": "Medical Payments"
                , "Limit": [{
                    "FormatInteger": "1000"
                    , "LimitAppliesToCd": "PerPerson"
                }]
            };
            MPJSON.Limit[0].FormatInteger = session["cars"][position]["coverage"]["MP"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[position].Coverage.push(MPJSON);
            //alert("After the MEDPM push:" + JSON.stringify(insurescanJson));
        }
        if (session["cars"][position]["coverage"]["compdeduct"] != "nocov") {
            var compdeductJSON = {
                "CoverageCd": "COMP"
                , "CoverageDesc": "Comprehensive Coverage"
                , "Deductible": [{
                    "FormatInteger": "250"
                    , "DeductibleAppliesToCd": "ALLPeril"
                }]
            };
            compdeductJSON.Deductible[0].FormatInteger = session["cars"][position]["coverage"]["compdeduct"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[position].Coverage.push(compdeductJSON);
            //alert("After the COMP push:" + JSON.stringify(insurescanJson));
        }
        if (session["cars"][position]["coverage"]["colldeduct"] != "nocov") {
            var colldeductJSON = {
                "CoverageCd": "COLL"
                , "CoverageDesc": "Collision Coverage"
                , "Deductible": [{
                    "FormatInteger": "250"
                    , "DeductibleAppliesToCd": "ALLPeril"
                }]
            };
            colldeductJSON.Deductible[0].FormatInteger = session["cars"][position]["coverage"]["colldeduct"];
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[position].Coverage.push(colldeductJSON);
            //alert("After the COLL push:" + JSON.stringify(insurescanJson));
        }
        if (session["cars"][position]["coverage"]["RR"] == "Accept") {
            var RRJSON = {
                "CoverageCd": "RREIM"
                , "CoverageDesc": "Rental Reimbursement"
                , "Limit": [{
                        "FormatInteger": "20"
                        , "LimitAppliesToCd": "PerDay"
                }
            , {
                        "FormatInteger": "400"
                        , "LimitAppliesToCd": "MaxAmount"
                }
				]
            };
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[position].Coverage.push(RRJSON);
        }
        else {
            var coverages = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[position].Coverage;
            $.each(coverages, function (index, object) {
                if (object.CoverageCd == "REIM") {
                    coverages.splice(index, 1);
                }
            });
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[position].Coverage = coverages;
        }
        if (session["cars"][position]["coverage"]["towing"] == "Accept") {
            var TLJSON = {
                "CoverageCd": "TL"
                , "CoverageDesc": "Towing and Labor"
                , "Limit": [{
                    "FormatInteger": "50"
                    , "LimitAppliesToCd": "PerOcc"
            }]
            };
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[position].Coverage.push(TLJSON);
        }
        else {
            var coverages = insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[position].Coverage;
            $.each(coverages, function (index, object) {
                if (object.CoverageCd == "TL") {
                    coverages.splice(index, 1);
                }
            });
            insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersAutoLineBusiness.PersVeh[position].Coverage = coverages;
        }
        sessionStorage.setItem("session", JSON.stringify(session));
        //alert("After the push:" + JSON.stringify(insurescanJson));
        //	alert("validateCoverage ends");
        sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
        //alert("Finally the insurescanJson looks like: " + JSON.stringify(insurescanJson) )
        //        window.history.back();
        return true;
    };
    this.submitForms = function (owner) {
        if (this.storeCar(owner) == true) {
            try {
                uploadImages(pictureHolder);
                this.validateCoverages('coverages');
                return true;
            }
            catch (err) {
                alert("car storage failure\n", err);
            }
        }
        else {
            return false;
        }
    };
    //
    //
    this.testScan = function () {
        cordova.plugins.barcodeScanner.scan(function (result) {
            alert("We got a barcode\n" + "Result: " + result.text + "\n" + "Format: " + result.format + "\n" + "Cancelled: " + result.cancelled);
        }, function (error) {
            alert("Scanning failed: " + error);
        }, {
            "preferFrontCamera": false, // iOS and Android
            "showFlipCameraButton": true, // iOS and Android
            "prompt": "Place a barcode inside the scan area", // supported on Android only
            "formats": "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            "orientation": "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
        });
    };
    return this;
});