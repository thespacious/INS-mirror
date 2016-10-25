var insurescanJson = {
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
            , "ClientDt": "2016-10-24T15:41:19"
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
                , "TransactionRequestDt": "2016-10-24T15:41:19"
                , "TransactionEffectiveDt": "2016-10-24T15:41:19"
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
                , "InsuredOrPrincipal": [{
                    "GeneralPartyInfo": {
                        "NameInfo": {
                            "PersonName": {
                                "Surname": "WILLIAMS"
                                , "GivenName": "PATRICK"
                            }
                        }
                        , "Addr": {
                            "AddrTypeCd": "MailingAddress"
                            , "Addr1": "228 W CHEWACLA DR"
                            , "City": "AUBURN"
                            , "StateProvCd": "MS"
                            , "StateProv": "MS"
                            , "PostalCode": "38601"
                            , "CountryCd": "US"
                            , "Country": "USA"
                            , "County": "Lee"
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
                    , "ControllingStateProvCd": "MS"
                    , "ContractTerm": {
                        "EffectiveDt": "2016-10-23T19:00:00"
                        , "ExpirationDt": "2017-04-23T19:00:00"
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
                        , "CreditScoreDt": "2013-06-12"
                    }
                    , "PersApplicationInfo": {
                        "InsuredOrPrincipal": [{
                            "GeneralPartyInfo": {
                                "NameInfo": {
                                    "PersonName": {
                                        "Surname": "WILLIAMS"
                                        , "GivenName": "PATRICK"
                                    }
                                }
                                , "Addr": {
                                    "AddrTypeCd": "MailingAddress"
                                    , "Addr1": "228 W CHEWACLA DR"
                                    , "City": "AUBURN"
                                    , "StateProvCd": "AL"
                                    , "StateProv": "AL"
                                    , "PostalCode": "38601"
                                    , "CountryCd": "US"
                                    , "Country": "USA"
                                    , "County": "Lee"
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
                                    "Surname": "WILLIAMS"
                                    , "GivenName": "PATRICK"
                                }
                            }
                        }
                        , "DriverInfo": {
                            "PersonInfo": {
                                "GenderCd": "Male"
                                , "BirthDt": "1993-02-10T0:00:00"
                                , "MaritalStatusCd": "single"
                                , "OccupationDesc": "UNKNOWN(UN)"
                                , "OccupationClassCd": "UN"
                                , "LengthTimeCurrentOccupation": {
                                    "NumUnits": "0"
                                    , "UnitMeasurementCd": "ANN"
                                }
                            }
                            , "License": {
                                "LicenseStatusCd": "Active"
                                , "LicensedDt": "2009-02-10T0:00:00"
                                , "FirstLicensedCurrentStateDt": "2009-02-10T0:00:00"
                                , "LicensePermitNumber": "8165433"
                                , "StateProvCd": "AL"
                                , "StateProv": "AL"
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
                                        "Surname": "WILLIAMS"
                                        , "GivenName": "PATRICK"
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
                        , "Manufacturer": "Toyota"
                        , "Model": "Corolla"
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
                        , "VehIdentificationNumber": "1273hshwuqqu"
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
                            "CoverageCd": "COMP"
                            , "CoverageDesc": "Comprehensive Coverage"
                            , "Deductible": [{
                                "FormatInteger": "250"
                                , "DeductibleAppliesToCd": "ALLPeril"
                            }]
                        }, {
                            "CoverageCd": "COLL"
                            , "CoverageDesc": "Collision Coverage"
                            , "Deductible": [{
                                "FormatInteger": "250"
                                , "DeductibleAppliesToCd": "ALLPeril"
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
                        "AgencyId": "102481"
                    }
                    , "Addr": {
                        "AddrTypeCd": "MailingAddress"
                        , "Addr1": "228 W CHEWACLA DR"
                        , "City": "AUBURN"
                        , "StateProvCd": "AL"
                        , "StateProv": "AL"
                        , "PostalCode": "38601"
                        , "CountryCd": "US"
                        , "Country": "USA"
                        , "County": "Lee"
                    }
                }, {
                    "-id": "Loc1"
                    , "ItemIdInfo": {
                        "AgencyId": "102481"
                    }
                    , "Addr": {
                        "AddrTypeCd": "GaragingAddress"
                        , "Addr1": "228 W CHEWACLA DR"
                        , "City": "AUBURN"
                        , "StateProvCd": "MS"
                        , "StateProv": "MS"
                        , "PostalCode": "38601"
                        , "CountryCd": "US"
                        , "Country": "USA"
                        , "County": "Lee"
                    }
                }]
            }
        }
    }
}

function sendquote() {
    //    var creds = JSON.parse(sessionStorage.getItem('credentials'));
    var json = insurescanJson;
    var returnData = "";
    var req = {
        type: "POST"
        , url: "http://is.androidbox.tv" + "/quote/" + "439"
        , headers: {
            'SESSIONID': "7f372c8f7871c3bda42e0646ccaf9df5abe24810239819b6f0498d079663b774"
        }
        , context: this
        , crossDomain: true
        , async: false
        , dataType: "json"
        , contentType: 'application/json; charset=UTF-8'
        , data: JSON.stringify(json)
    };
    $.ajax(req).done(function (data) {
        console.log(data);
        returnData = data;
        //            return data;
    }).fail(function (data) {
        console.log("send quote return error, find out why:");
        console.log(data);
        returnData = data;
        //            return data.responseText;
    });
    return returnData;
};