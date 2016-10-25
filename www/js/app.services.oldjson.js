{
    "ACORD": {
        "-xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance"
        , "-xmlns:xsd": "http://www.w3.org/2001/XMLSchema"
        , "-xmlns": "http://www.ACORD.org/standards/PC_Surety/ACORD1.11.0/xml/"
        , "SignonRq": {
            "SignonPswd": {
                "CustId": {
                    "SPName": "InsureScan"
                    , "CustLoginId": escape("Mark@ms0288")
                }
                , "CustPswd": {
                    "EncryptionTypeCd": "NONE"
                    , "Pswd": "Chappell"
                }
            }
            , "ClientDt": "2013-06-12T11:19:04"
            , "CustLangPref": "en-US"
            , "ClientApp": {
                "Org": "CIS"
                , "Name": "CIS RTR"
                , "Version": "1.0"
            }
        }
        , "InsuranceSvcRq": {
            "RqUID": "Q00269000"
            , "PersAutoPolicyQuoteInqRq": {
                "RqUID": "37A5DA7E-6C00-4D80-9297-EF28CB8718B2"
                , "TransactionRequestDt": "2013-06-12T11:19:04"
                , "TransactionEffectiveDt": "2013-06-12"
                , "CurCd": "USAD"
                , "Producer": {
                    "GeneralPartyInfo": {
                        "NameInfo": {
                            "CommlName": {
                                "CommercialName": "!ASI NOT A VALID ID CARD"
                            }
                            , "NonTaxIdentity": {
                                "NonTaxIdTypeCd": "ProfLicense"
                                , "NonTaxId": "-"
                            }
                        }
                        , "Addr": {
                            "AddrTypeCd": "MailingAddress"
                            , "Addr1": "1234 e main st"
                            , "City": "Jackson"
                            , "StateProvCd": "MS"
                            , "StateProv": "MS"
                            , "PostalCode": "29690"
                            , "CountryCd": "US"
                            , "Country": "USA"
                            , "County": "Hinds"
                        }
                    }
                    , "ProducerInfo": {
                        "ContractNumber": "-"
                    }
                }
                , "InsuredOrPrincipal": [
                    {
                        "GeneralPartyInfo": {
                            "NameInfo": {
                                "PersonName": {
                                    "Surname": "TESTERMAN"
                                    , "GivenName": "MICHAEL"
                                }
                            }
                            , "Addr": {
                                "AddrTypeCd": "MailingAddress"
                                , "Addr1": "1234 e main st"
                                , "City": "Jackson"
                                , "StateProvCd": "MS"
                                , "StateProv": "MS"
                                , "PostalCode": "29690"
                                , "CountryCd": "US"
                                , "Country": "USA"
                                , "County": "Hinds"
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
                        "EffectiveDt": "2013-06-12"
                        , "ExpirationDt": "2013-12-12"
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
                        "CompanysQuoteNumber": "Q00269000"
                    }
                    , "CreditScoreInfo": {
                        "com.AccuAuto_AssumedCreditScoreCd": "BEST"
                        , "CreditScoreDt": "2013-06-12"
                    }
                    , "PersApplicationInfo": {
                        "InsuredOrPrincipal": [
                            {
                                "GeneralPartyInfo": {
                                    "NameInfo": {
                                        "PersonName": {
                                            "Surname": "TESTERMAN"
                                            , "GivenName": "MICHAEL"
                                        }
                                    }
                                    , "Addr": {
                                        "AddrTypeCd": "MailingAddress"
                                        , "Addr1": "1234 e main st"
                                        , "City": "Jackson"
                                        , "StateProvCd": "MS"
                                        , "StateProv": "MS"
                                        , "PostalCode": "29690"
                                        , "CountryCd": "US"
                                        , "Country": "USA"
                                        , "County": "Hinds"
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
          }
         ]
                    , "PersVeh": [
                        {
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
                            , "RegistrationStateProvCd": "MS"
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
                                    , "Limit": [{
                                        "FormatInteger": "25000"
                                        , "LimitAppliesToCd": "PropDam"
                                        }, ]
              }]
          }
        ]
                    , "NumLicensed": "1"
                    , "NumNotLicensed": "0"
                    , "ContinuousInsuranceCd": "NoPrior"
                }
                , "Location": [
                    {
                        "ItemIdInfo": {
                            "AgencyId": "80364"
                        }
                        , "Addr": {
                            "AddrTypeCd": "MailingAddress"
                            , "Addr1": "1234 e main st"
                            , "City": "Jackson"
                            , "StateProvCd": "MS"
                            , "StateProv": "MS"
                            , "PostalCode": "29690"
                            , "CountryCd": "US"
                            , "Country": "USA"
                            , "County": "Hinds"
                        }
          }
                        , {
                        "-id": "Loc1"
                        , "ItemIdInfo": {
                            "AgencyId": "80364"
                        }
                        , "Addr": {
                            "AddrTypeCd": "GaragingAddress"
                            , "Addr1": "1234 e main st"
                            , "City": "Jackson"
                            , "StateProvCd": "MS"
                            , "StateProv": "MS"
                            , "PostalCode": "29690"
                            , "CountryCd": "US"
                            , "Country": "USA"
                            , "County": "Hinds"
                        }
          }
        ]
            }
        }
    }
};