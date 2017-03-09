services.factory('newCarService', function (BASE_SERVER, $state) {
    //=================
    //GENERAL VARIABLES
    //=================
    var pictureHolder = ["file:///android_asset/www/img/default1.png", "file:///android_asset/www/img/default2.png"];
    var counter = 1;
    var TAG = "new car services: ";
    ////////////////////////// IMAGE MANIPULATION /////////////////////
    // ======================== base64 encode images for storage and display ==
    this.b64tob = function (b64) {
        var binary = atob(b64);
        var bytes = new Array(binary.length);
        for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return new Blob([new Uint8Array(bytes)]);
    };
    // =========== Upload images to server =============
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
    // ===================== callbacks =========================
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
    //=============
    //VIN FUNCTIONS
    //=============
    //
    this.capturePhotoVin = function () {
        _this = this;
        //        window.plugins.VINBarcodeScanner.scan(this.scannerSuccess, this.scannerFailure);
        mwbScanner.startScanning(function (result) {
            reutrnData = getVin(result);
        });
    };
    this.selectPhotoVIN = function () {
        navigator.camera.getPicture(this.uploadsuccess, function () {}, {
            destinationType: Camera.DestinationType.DATA_URL
            , sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    };
    // ======= callbacks ==============
    //==================================
    this.uploadsuccess = function (imageData) {
        mwb.scanImage(function (result) {
            returnData = getVin(result);
        });
        return returnData;
    };
    this.scannerSuccess = function (result) {
        _this.getVin(result.VINCode);
    };
    this.scannerFailure = function (message) {
        alert("scanner error");
    };
    //
    //=============
    //CAR PHOTO FUNCTIONS
    //=============
    //
    this.takePhotoCar = function () {
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality: 100
            , sourceType: Camera.PictureSourceType.CAMERA
            , destinationType: Camera.DestinationType.FILE_URI, //        encodingType: Camera.EncodingType.PNG,
            correctOrientation: true
        });
    };
    this.selectPhotoCar = function () {
        //        if (photoID != null) photoDestination = photoID.toString();
        navigator.camera.getPicture(this.onSuccess, this.onFail, {
            quality: 50
            , destinationType: Camera.DestinationType.FILE_URI
            , sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        });
    };
    // ================= callbacks ==================
    this.onSuccess = function (imageData) {
        this.imageData = imageData;
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
        photoDestination = null;
    };
    this.onFail = function (message) {
        alert('Failed because ' + message);
    };
    //////////////////////////////////// STORE USER INFO /////////////////////
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
    //////////////////////////// COVERAGES STORING //////////////////////////
    // ============ Store coverages and modify JSON =======================
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
    // ============= Submit Forms =====================
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
    return this;
});