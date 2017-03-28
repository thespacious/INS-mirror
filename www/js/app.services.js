var services = angular.module('main.services', []).factory('loadJsonTemplate', function () {
    var newDate = function () {
        var today = new Date();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        var formattedToday = today.getFullYear() + '-' + month + '-' + day;
        return formattedToday;
    };
    var today = newDate();
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
                        , "CustLoginId": "Mark@ms0288"
                    }
                    , "CustPswd": {
                        "EncryptionTypeCd": "NONE"
                        , "Pswd": "Chappell"
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
                "RqUID": "Q02369965"
                , "PersAutoPolicyQuoteInqRq": {
                    "RqUID": "Q02369965"
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
                                    , "NonTaxId": "102481"
                                }
                            }
                            , "Addr": {
                                "AddrTypeCd": "MailingAddress"
                                , "Addr1": "6037 FINANCIAL DRIVE"
                                , "City": "NORCROSS"
                                , "StateProvCd": "SC"
                                , "StateProv": "SC"
                                , "PostalCode": "30071"
                                , "CountryCd": "US"
                                , "Country": "USA"
                            }
                        }
                        , "ProducerInfo": {
                            "ContractNumber": "102481"
                        }
                    }
                    , "InsuredOrPrincipal": [
                        {
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
          }
        ]
                    , "PersPolicy": {
                        "Company": "CIS RTR"
                        , "LOBCd": "AUTOP"
                        , "LOBSubCd": "NSTD"
                        , "NAICCd": "10906"
                        , "ControllingStateProvCd": "MS"
                        , "ContractTerm": {
                            "EffectiveDt": "08/31/2016"
                            , "ExpirationDt": "12/31/1969"
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
                            "CompanysQuoteNumber": "Q02369965"
                        }
                        , "CreditScoreInfo": {
                            "com.AccuAuto_AssumedCreditScoreCd": "BEST"
                            , "CreditScoreDt": "06/12/2016"
                        }
                        , "PersApplicationInfo": {
                            "InsuredOrPrincipal": [
                                {
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
              }
            ]
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
                        , "PersDriver": [
                            {
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
                                        , "FirstLicensedCurrentStateDt": "09/20/2016"
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
            }
                            , {
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
                                        , "LicensedDt": "06/12/2008"
                                        , "FirstLicensedCurrentStateDt": "06/12/2016"
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
                                    , "GoodStudentCd": "0"
                                    , "MatureDriverInd": "0"
                                    , "RestrictedInd": "0"
                                }
            }
          ]
                        , "PersVeh": [
                            {
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
                                , "RegistrationStateProvCd": "MS"
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
                                        , "Limit": [
                                            {
                                                "FormatInteger": "25000"
                                                , "LimitAppliesToCd": "PropDam"
                    }
                  ]
                }
                                    , {
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
                }, {
                                        "CoverageCd": "COLL"
                                        , "CoverageDesc": "Collision Coverage"
                                        , "Deductible": [{
                                            "FormatInteger": "250"
                                            , "DeductibleAppliesToCd": "ALLPeril"
                }]
            }, {
                                        "CoverageCd": "COMP"
                                        , "CoverageDesc": "Comprehensive Coverage"
                                        , "Deductible": [{
                                            "FormatInteger": "250"
                                            , "DeductibleAppliesToCd": "ALLPeril"
                }]
            }
                                    , {
                                        "CoverageCd": "MEDPM"
                                        , "CoverageDesc": "Medical Payments"
                                        , "Limit": [
                                            {
                                                "FormatInteger": "1000"
                                                , "LimitAppliesToCd": "PerPerson"
                    }
                  ]
                }
                                    , {
                                        "CoverageCd": "RREIM"
                                        , "CoverageDesc": "Rental Reimbursement"
                                        , "Limit": [
                                            {
                                                "FormatInteger": "20"
                                                , "LimitAppliesToCd": "PerDay"
                    }
                                            , {
                                                "FormatInteger": "400"
                                                , "LimitAppliesToCd": "MaxAmount"
                    }
                  ]
                }
                                    , {
                                        "CoverageCd": "TL"
                                        , "CoverageDesc": "Towing and Labor"
                                        , "Limit": [
                                            {
                                                "FormatInteger": "50"
                                                , "LimitAppliesToCd": "PerOcc"
                    }
                  ]
                }
              ]
            }
          ]
                        , "NumLicensed": "1"
                        , "NumNotLicensed": "0"
                        , "ContinuousInsuranceCd": "NoPrior"
                    }
                    , "Location": [
                        {
                            "ItemIdInfo": {
                                "AgencyId": "102481"
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
                        , {
                            "-id": "Loc1"
                            , "ItemIdInfo": {
                                "AgencyId": "102481"
                            }
                            , "Addr": {
                                "AddrTypeCd": "GaragingAddress"
                                , "Addr1": "140 Kristen CtR"
                                , "City": "Jackson"
                                , "StateProvCd": "MS"
                                , "StateProv": "MS"
                                , "PostalCode": "39211"
                                , "CountryCd": "US"
                                , "Country": "USA"
                                , "County": "Jackson"
                            }
          }
        ]
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
        var date = [month, day, year].join('/');
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
}).factory('mwbSetup', function () {
    var _this = this;
    // ===============void function for manatee setup ==================
    var noop = function () {};
    // ======== after manatee setup set this function to void ==========
    this.manateeSetup = function () {
        _this.manateeSetup = noop;
        mwbScanner.setKey("kwILwP2bCHIfNLMOJadaGwR3V0sRh+kPA6LgV1jyXYY=").then(function (response) {
            if (response) console.log('VALID KEY');
            else console.log('INVALID KEY');
        });
    };
    return this;
});