var services = angular.module('main.services', []).factory('loadJsonTemplate', function () {
    var jsonTemplate = {
        "quote_type": "auto"
        , "endpoint": "\/quotes\/send\/auto"
            //inputs        
            
        , "inputs": {
            //blocks
            "drivers": {
                //pages
                "license": {
                    "page_options": {
                        "hidden": false
                    }, //page-blocks
                    "license_info": {
                        pageBlock_options: {
                            "hidden": false
                        }, //leafs
                        "fullname": {
                            "type": "text"
                            , "size": 200
                            , "default_value": null
                            , "required": true
                            , "label": "Full Name"
                            , "validate_exp": "[a-zA-Z]"
                        }
                        , "license": {
                            "type": "number"
                            , "size": 20
                            , "default_value": null
                            , "required": true
                            , "label": "License No."
                            , "validate_exp": ""
                        }
                        , "licensedate": {
                            "type": "date"
                            , "size": 20
                            , "default_value": null
                            , "required": true
                            , "label": "License Issue Date"
                            , "validate_exp": ""
                        }
                        , "dob": {
                            "type": "date"
                            , "size": 12
                            , "default_value": null
                            , "required": true
                            , "label": "Date of Birth"
                            , "validate_exp": ""
                        }
                        , "street": {
                            "type": "text"
                            , "size": 200
                            , "default_value": null
                            , "required": true
                            , "label": "Street"
                            , "validate_exp": ""
                        }
                        , "city": {
                            "type": "text"
                            , "size": 50
                            , "default_value": null
                            , "required": true
                            , "label": "City"
                            , "validate_exp": "[a-zA-Z]"
                        }
                        , "state": {
                            "type": "text"
                            , "size": 2
                            , "default_value": null
                            , "required": true
                            , "label": "State"
                            , "validate_exp": "[a-zA-Z]"
                        }
                        , "zip": {
                            "type": "tel"
                            , "size": 5
                            , "default_value": null
                            , "required": true
                            , "label": "Zip"
                            , "validate_exp": "[0-9]"
                        }
                        , "sex": {
                            "type": "select"
                            , "label": "Gender"
                            , "options": [
                            "Male"
                            , "Female"]
                        }
                    }
                    //page-block
                    
                    , "garaging_address": {
                        pageBlock_options: {
                            hidden: "true"
                        }
                        , "gstreet": {
                            "type": "text"
                            , "size": 200
                            , "default_value": null
                            , "required": true
                            , "label": "Street"
                            , "validate_exp": ""
                        }
                        , "gcity": {
                            "type": "text"
                            , "size": 50
                            , "default_value": null
                            , "required": true
                            , "label": "City"
                            , "validate_exp": "[a-zA-Z]"
                        }
                        , "gstate": {
                            "type": "text"
                            , "size": 2
                            , "default_value": null
                            , "required": true
                            , "label": "State"
                            , "validate_exp": "[a-zA-Z]"
                        }
                        , "gzip": {
                            "type": "tel"
                            , "size": 5
                            , "default_value": null
                            , "required": true
                            , "label": "Zip"
                            , "validate_exp": "[0-9]"
                        }
                    }
                }
                //page
                
                , "driver_info": {
                    //page-block
                    "user_info": {
                        "pageBlock_options": {
                            "hidden": "false"
                        }, //leaf
                        "county": {
                            "type": "text"
                            , "size": 5
                            , "default_value": null
                            , "required": true
                            , "label": "County"
                            , "validate_exp": "[0-9]"
                        }
                        , "phone": {
                            "type": "text"
                            , "size": 5
                            , "default_value": null
                            , "required": true
                            , "label": "Phone"
                            , "validate_exp": "[0-9]"
                        }
                        , "email": {
                            "type": "email"
                            , "size": 5
                            , "default_value": null
                            , "required": true
                            , "label": "Email"
                            , "validate_exp": "[0-9]"
                        }
                        , "maritalstatus": {
                            "type": "select"
                            , "label": "Marital Status"
                            , "options": [
                            "single"
                            , "married"]
                        }
                    }
                }
            }, //block
            "cars": {
                //page
                "carInfo": {
                    //page-block
                    "carInfoBlock": {
                        //leaf
                        "vin": {
                            "type": "text"
                            , "size": 200
                            , "default_value": null
                            , "required": true
                            , "label": "Vin no."
                            , "validate_exp": ""
                        }
                        , "year": {
                            "type": "number"
                            , "size": 200
                            , "default_value": null
                            , "required": true
                            , "label": "Year"
                            , "validate_exp": ""
                        }
                        , "make": {
                            "type": "text"
                            , "size": 200
                            , "default_value": null
                            , "required": true
                            , "label": "Make"
                            , "validate_exp": ""
                        }
                        , "model": {
                            "type": "text"
                            , "size": 200
                            , "default_value": null
                            , "required": true
                            , "label": "Model"
                            , "validate_exp": ""
                        }
                    }
                }
                //page
                
                , "coverages": {
                    //page-block
                    "Coverages": {
                        //leaf
                        "BI": {
                            "type": "select"
                            , "label": "Bodily Injury"
                            , "options": [
                            "250"
                            , "500", "1000"]
                        }
                        , "PD": {
                            "type": "select"
                            , "label": "Property Destruction"
                            , "options": [
                            "250"
                            , "500", "1000"]
                        }
                        , "UML": {
                            "type": "select"
                            , "label": "Uninsured/Unserinsured Motorist"
                            , "options": [
                            "accept"
                            , "reject"]
                        }
                        , "MP": {
                            "type": "select"
                            , "label": "Medical Payments"
                            , "options": [
                             "accept"
                            , "reject"]
                        }
                        , "compdeduct": {
                            "type": "select"
                            , "label": "Comprehensive Deductible"
                            , "options": [
                             "250"
                            , "500", "1000"]
                        }
                        , "colldeduct": {
                            "type": "select"
                            , "label": "Comprehensive Obese Deductible"
                            , "options": [
                            "250"
                            , "500", "1000"]
                        }
                    }
                }
            }
            , "quote": {
                "discounts": {
                    "discounts": {
                        "prior-cov": {
                            "text": "Prior Coverage"
                            , "checked": "false"
                        }
                        , "multi-car": {
                            "text": "Multi Car"
                            , "checked": "false"
                        }
                        , "home-owner": {
                            "text": "Home Owner"
                            , "checked": "false"
                        }
                        , "paid-in-full": {
                            "text": "Paid in Full"
                            , "checked": "false"
                        }
                        , "good-student": {
                            "text": "Good Student"
                            , "checked": "false"
                        }
                    , }
                }
                , "policyterm": {
                    "date picker": {
                        "type": "date"
                        , label: "Date Picker"
                    }
                }
            }
        }
    }
    this.loadTemplate = function () {
        return jsonTemplate;
    };
    return this.loadTemplate()
}).factory('loadBlock', function () {
    //return keys for all but leaf values to keep from having duplicate json
    this.getPageNames = function (jsonObject, block, driverId) {
        var temp = Object.keys(jsonObject.inputs[block])
        if (driverId != 0) {
            var index = temp.indexOf('driver_info');
            if (index > -1) {
                temp.splice(index, 1);
            }
            return temp;
        }
        else {
            return Object.keys(jsonObject.inputs[block]);
        }
    };
    //gets page block names for each page within a block, strips page options which will be used by different services of the controller than the visible elements
    this.getBlockNames = function (jsonObject, block, pages) {
        var blocksObject = {};
        for (var page in pages) {
            var currentPageBlock = pages[page];
            var temp = Object.keys(jsonObject.inputs[block][currentPageBlock]);
            var temp2 = [];
            for (pageBlock in temp) {
                if (temp[pageBlock] != "page_options") {
                    temp2.push(temp[pageBlock]);
                }
            }
            blocksObject[currentPageBlock] = temp2;
        }
        return blocksObject;
    };
    this.getBlockOptions = function (jsonObject, block, pages) {
        var blockOptionsObject = {};
        for (var page in pages) {
            var currentPage = pages[page];
            var pageBlocks = Object.keys(jsonObject.inputs[block][currentPage]);
            for (pageBlock in pageBlocks) {
                if (pageBlocks[pageBlock] == "page_options") {
                    blockOptionsObject[currentPage] = jsonObject.inputs[block][currentPage][pageBlocks[pageBlock]];
                }
            }
        }
        return blockOptionsObject;
    };
    //returns leaf objects
    this.newGetPageBlockItems = function (jsonObject, block, pages, pageBlocks) {
        var pageBlockItems = {};
        var temp = {};
        var currentPageBlock = "";
        for (var page in pages) {
            var currentPage = pages[page];
            $.each(pageBlocks[currentPage], function (label, value) {
                var pageBlock = value;
                if (value != "page_options") {
                    temp[pageBlock] = {};
                    $.each(jsonObject.inputs[block][currentPage][pageBlock], function (label, pageBlockItem) {
                        if (label != "pageBlock_options") {
                            temp[pageBlock][label] = pageBlockItem;
                        }
                    });
                }
                //label = pageName
                //value = blocks
            });
        }
        return temp;
    };
    //returns options for page block
    this.getPageBlockOptions = function (jsonObject, block, pages, pageBlocks) {
        var pageBlockItems = {};
        var temp = {};
        var currentPageBlock = "";
        for (var page in pages) {
            var currentPage = pages[page];
            //            temp[currentPage] = {};
            $.each(pageBlocks[currentPage], function (label, value) {
                var pageBlock = value;
                if (value != "page_options") {
                    temp[pageBlock] = {};
                    $.each(jsonObject.inputs[block][currentPage][pageBlock], function (label, pageBlockItem) {
                        if (label == "pageBlock_options") {
                            temp[pageBlock][label] = pageBlockItem;
                        }
                    });
                }
                //label = pageName
                //value = blocks
            });
        }
        return temp;
    };
    return this;
}).factory('insurescanJson', function () {
    var currentTime = new Date();
    var formattedcurrentTime = formatDate(currentTime);
    this.insurescanJson = {
        "ACORD": {
            "-xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
            , "-xmlns:xsd": "http://www.w3.org/2001/XMLSchema"
            , "-xmlns": "http://www.ACORD.org/standards/PC_Surety/ACORD1.11.0/xml/"
            , "SignonRq": {
                "SignonPswd": {
                    "CustId": {
                        "SPName": "InsureScan"
                        , "CustLoginId": "Fggffcf"
                    }
                    , "CustPswd": {
                        "EncryptionTypeCd": "NONE"
                        , "Pswd": "cfdhxx"
                    }
                }
                , "ClientDt": "2016-08-18T15:41:19"
                , "CustLangPref": "en-US"
                , "ClientApp": {
                    "Org": "CIS"
                    , "Name": "CIS RTR"
                    , "Version": "1.0"
                }
            }
            , "InsuranceSvcRq": {
                "RqUID": "Q00250819"
                , "PersAutoPolicyQuoteInqRq": {
                    "RqUID": "37A5DA7E-6C00-4D80-9297-EF28CB8718B2"
                    , "TransactionRequestDt": "2016-08-18T15:41:19"
                    , "TransactionEffectiveDt": "2016-08-18T15:41:19"
                    , "CurCd": "USAD"
                    , "Producer": {
                        "GeneralPartyInfo": {
                            "NameInfo": {
                                "CommlName": {
                                    "CommercialName": "!ASI NOT A VALID ID CARD"
                                }
                                , "NonTaxIdentity": {
                                    "NonTaxIdTypeCd": "ProfLicense"
                                    , "NonTaxId": "Fggffcf"
                                }
                            }
                            , "Addr": {
                                "AddrTypeCd": "MailingAddress"
                                , "Addr1": "6037 FINANCIAL DRIVE"
                                , "City": "NORCROSS"
                                , "StateProvCd": "GA"
                                , "StateProv": "GA"
                                , "PostalCode": "30071"
                                , "CountryCd": "US"
                                , "Country": "USA"
                            }
                        }
                        , "ProducerInfo": {
                            "ContractNumber": "Fggffcf"
                        }
                    }
                    , "InsuredOrPrincipal": [{
                        "GeneralPartyInfo": {
                            "NameInfo": {
                                "PersonName": {
                                    "Surname": "DANIEL"
                                    , "GivenName": "CARLOS"
                                }
                            }
                            , "Addr": {
                                "AddrTypeCd": "MailingAddress"
                                , "Addr1": "211 W LONGLEAF DR"
                                , "City": "OXFORD"
                                , "StateProvCd": "MS"
                                , "StateProv": "MS"
                                , "PostalCode": "38655"
                                , "CountryCd": "US"
                                , "Country": "USA"
                                , "County": "Lafayette"
                            }
                        }
                        , "InsuredOrPrincipalInfo": {
                            "InsuredOrPrincipalRoleCd": "Insured"
                            , "InsuredOrPrincipalRoleDesc": "Insured"
                        }
                    }]
                    , "PersPolicy": {
                        "Company": "CIS RTR"
                        , "LOBCd": "AUTOP"
                        , "LOBSubCd": "NSTD"
                        , "NAICCd": "10906"
                        , "ControllingStateProvCd": "SC"
                        , "ContractTerm": {
                            "EffectiveDt": "2016-08-31"
                            , "ExpirationDt": "1969-12-31"
                            , "DurationPeriod": {
                                "NumUnits": "6"
                                , "UnitMeasurementCd": "Months"
                            }
                            , "ContinuousInd": "0"
                        }
                        , "LanguageCd": "en-US"
                        , "PaymentOption": {
                            "CollectedByAgentAmt": ""
                            , "MethodPaymentCd": "CASH"
                            , "DepositAmt": ""
                            , "DownPaymentPct": "25"
                            , "InstallmentFeeAmt": ""
                            , "NumPayments": "2"
                        }
                        , "QuoteInfo": {
                            "CompanysQuoteNumber": "Q00250819"
                        }
                        , "CreditScoreInfo": {
                            "com.AccuAuto_AssumedCreditScoreCd": "BEST"
                            , "CreditScoreDt": "2013-06-12"
                        }
                        , "PersApplicationInfo": {
                            "InsuredOrPrincipal": [{
                                "GeneralPartyInfo": {
                                    "NameInfo": {
                                        "PersonName": {
                                            "Surname": "DANIEL"
                                            , "GivenName": "CARLOS"
                                        }
                                    }
                                    , "Addr": {
                                        "AddrTypeCd": "MailingAddress"
                                        , "Addr1": "211 W LONGLEAF DR"
                                        , "City": "OXFORD"
                                        , "StateProvCd": "MS"
                                        , "StateProv": "MS"
                                        , "PostalCode": "38655"
                                        , "CountryCd": "US"
                                        , "Country": "USA"
                                        , "County": "Lafayette"
                                    }
                                }
                                , "InsuredOrPrincipalInfo": {
                                    "InsuredOrPrincipalRoleCd": "Insured"
                                    , "InsuredOrPrincipalRoleDesc": "Insured"
                                }
                            }]
                            , "ResidenceOwnedRentedCd": "RENTD"
                            , "NumResidentsInHousehold": "1"
                            , "NumVehsInHousehold": "1"
                            , "ResidenceTypeCd": "OTH"
                            , "LengthTimeCurrentAddr": {
                                "DurationPeriod": {
                                    "NumUnits": "13"
                                    , "UnitMeasurementCd": "Months"
                                }
                            }
                        }
                        , "DriverVeh": {
                            "-DriverRef": "Drv1"
                            , "-VehRef": "Veh1"
                            , "UsePct": "100"
                        }
                    }
                    , "PersAutoLineBusiness": {
                        "LOBCd": "AUTOP"
                        , "LOBSubCd": "NSTD"
                        , "NAICCd": "10906"
                        , "PersDriver": [{
                            "-id": "Drv1"
                            , "GeneralPartyInfo": {
                                "NameInfo": {
                                    "PersonName": {
                                        "Surname": "DANIEL"
                                        , "GivenName": "CARLOS"
                                    }
                                }
                            }
                            , "DriverInfo": {
                                "PersonInfo": {
                                    "GenderCd": "M"
                                    , "BirthDt": "1989-09-20"
                                    , "MaritalStatusCd": "1"
                                    , "OccupationDesc": "UNKNOWN(UN)"
                                    , "OccupationClassCd": "UN"
                                    , "LengthTimeCurrentOccupation": {
                                        "NumUnits": "0"
                                        , "UnitMeasurementCd": "ANN"
                                    }
                                }
                                , "License": {
                                    "LicenseStatusCd": "Active"
                                    , "LicensedDt": "2005-09-20"
                                    , "FirstLicensedCurrentStateDt": "2005-09-20"
                                    , "LicensePermitNumber": "8968103"
                                    , "StateProvCd": "MS"
                                    , "StateProv": "MS"
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
                                            "Surname": "DANIEL"
                                            , "GivenName": "CARLOS"
                                        }
                                    }
                                    , "FilingStatusCd": "N"
                                }
                                , "GoodDriverInd": "0"
                                , "GoodStudentCd": "N"
                                , "MatureDriverInd": "0"
                                , "RestrictedInd": "0"
                            }
                        }, {
                            "-id": "Drv2"
                            , "GeneralPartyInfo": {
                                "NameInfo": {
                                    "PersonName": {
                                        "Surname": "DE"
                                        , "GivenName": "REMY"
                                    }
                                }
                            }
                            , "DriverInfo": {
                                "PersonInfo": {
                                    "GenderCd": "M"
                                    , "BirthDt": "06/12/1992"
                                    , "MaritalStatusCd": "1"
                                    , "OccupationDesc": "UNKNOWN(UN)"
                                    , "OccupationClassCd": "UN"
                                    , "LengthTimeCurrentOccupation": {
                                        "NumUnits": "0"
                                        , "UnitMeasurementCd": "ANN"
                                    }
                                }
                                , "License": {
                                    "LicenseStatusCd": "Active"
                                    , "LicensedDt": "2008-06-12"
                                    , "FirstLicensedCurrentStateDt": "2008-06-12"
                                    , "LicensePermitNumber": "0000000"
                                    , "StateProvCd": "MS"
                                    , "StateProv": "MS"
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
                                            "Surname": "DE"
                                            , "GivenName": "REMY"
                                        }
                                    }
                                    , "FilingStatusCd": "N"
                                }
                                , "GoodDriverInd": "0"
                                , "GoodStudentCd": "N"
                                , "MatureDriverInd": "0"
                                , "RestrictedInd": "0"
                            }
                        }]
                        , "PersVeh": [{
                            "-id": "Veh1"
                            , "-RatedDriverRef": "Drv1"
                            , "-LocationRef": "Loc1"
                            , "Manufacturer": "VOLVO"
                            , "Model": "S40"
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
                            , "VehIdentificationNumber": "YV1MS682X62Y63688"
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
                            , "Coverage": [{
                                "CoverageCd": "BI"
                                , "CoverageDesc": "Bodily Injury Liability"
                                , "Limit": [{
                                    "FormatInteger": "25000"
                                    , "LimitAppliesToCd": "PerPerson"
                                }, {
                                    "FormatInteger": "50000"
                                    , "LimitAppliesToCd": "PerAcc"
                                }]
                            }, {
                                "CoverageCd": "PD"
                                , "CoverageDesc": "Property Damage"
                                , "Limit": [{
                                    "FormatInteger": "25000"
                                    , "LimitAppliesToCd": "PropDam"
                                }]
                            }, {
                                "CoverageCd": "UM"
                                , "CoverageDesc": "Uninsured/Underinsured Motorist Liability"
                                , "Limit": [{
                                    "FormatInteger": "25000"
                                    , "LimitAppliesToCd": "PerPerson"
                                }, {
                                    "FormatInteger": "50000"
                                    , "LimitAppliesToCd": "PerAcc"
                                }]
                            }, {
                                "CoverageCd": "MEDPM"
                                , "CoverageDesc": "Medical Payments"
                                , "Limit": [{
                                    "FormatInteger": "1000"
                                    , "LimitAppliesToCd": "PerPerson"
                                }]
                            }, {
                                "CoverageCd": "RREIM"
                                , "CoverageDesc": "Rental Reimbursement"
                                , "Limit": [{
                                    "FormatInteger": "20"
                                    , "LimitAppliesToCd": "PerDay"
                                }, {
                                    "FormatInteger": "400"
                                    , "LimitAppliesToCd": "MaxAmount"
                                }]
                            }, {
                                "CoverageCd": "TL"
                                , "CoverageDesc": "Towing and Labor"
                                , "Limit": [{
                                    "FormatInteger": "50"
                                    , "LimitAppliesToCd": "PerOcc"
                                }]
                            }]
                        }]
                        , "NumLicensed": "1"
                        , "NumNotLicensed": "0"
                        , "ContinuousInsuranceCd": "NoPrior"
                    }
                    , "Location": [{
                        "ItemIdInfo": {
                            "AgencyId": "Fggffcf"
                        }
                        , "Addr": {
                            "AddrTypeCd": "MailingAddress"
                            , "Addr1": "211 W LONGLEAF DR"
                            , "City": "OXFORD"
                            , "StateProvCd": "MS"
                            , "StateProv": "MS"
                            , "PostalCode": "38655"
                            , "CountryCd": "US"
                            , "Country": "USA"
                            , "County": "Lafayette"
                        }
                    }, {
                        "-id": "Loc1"
                        , "ItemIdInfo": {
                            "AgencyId": "Fggffcf"
                        }
                        , "Addr": {
                            "AddrTypeCd": "GaragingAddress"
                            , "Addr1": "211 W LONGLEAF DR"
                            , "City": "OXFORD"
                            , "StateProvCd": "MS"
                            , "StateProv": "MS"
                            , "PostalCode": "38655"
                            , "CountryCd": "US"
                            , "Country": "USA"
                            , "County": "Lafayette"
                        }
                    }]
                }
            }
        }
    }

    function formatDate(date) {
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
        var date = [year, month, day].join('-');
        var time = [hour, minute, second].join(':');
        var datetime = date.concat(time);
        return date;
    }
    //    var guid = function () {
    //        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    //    }
    //    var uuid = window.device.uuid;
    //    ionic.Platform.ready(function () {
    //        this.insurescanJson.ACORD.InsuranceSvcRq.RqUID = uuid;
    //        this.insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.RqUID = uuid;
    //    });
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    var uuid = guid()
        //    this.insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.QuoteInfo.CompanysQuoteNumber = uuid;
    this.insurescanJson.ACORD.SignonRq.SignonPswd.CustId.SPName = "InsureScan";
    this.insurescanJson.ACORD.SignonRq.SignonPswd.CustId.CustLoginId = escape("Mark@ms0288");
    this.insurescanJson.ACORD.SignonRq.SignonPswd.CustPswd.Pswd = "Chappell";
    this.insurescanJson.ACORD.SignonRq.ClientDt = formattedcurrentTime;
    this.insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.TransactionRequestDt = formattedcurrentTime;
    this.insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.TransactionEffectiveDt = formattedcurrentTime;
    //    this.insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Producer.GeneralPartyInfo.NameInfo.NonTaxIdentity.NonTaxId = "-";
    //    this.insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Producer.ProducerInfo.ContractNumber = "-";
    //    this.insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[0].ItemIdInfo.AgencyId = "80364";
    //    this.insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.Location[1].ItemIdInfo.AgencyId = "80364";
    sessionStorage.setItem('insurescanJson', JSON.stringify(this.insurescanJson));
    //    sessionStorage.setItem('session', {});
    //    verifyPassword(Mark@ms0288, password);
    return this;
});