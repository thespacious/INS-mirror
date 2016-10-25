services.factory("newJson", function () {
    this.json = {
            "quote_type": "auto"
            , "endpoint": "\/quotes\/send\/auto"
                //inputs        
                
            , "inputs": {
                //blocks
                "drivers": {
                    //pages
                    "license": {
                        //pageBlock
                        "license_info":
                        //leaves
                    [{
                                    "type": "text"
                                    , "size": 200
                                    , "value": ""
                                    , "required": true
                                    , "label": "Full Name"
                                    , "id": "fullname"
                                    , "validate_exp": "/[a-zA-Z]+/"
                        }, {
                                    "type": "number"
                                    , "size": 20
                                    , "value": null
                                    , "required": true
                                    , "label": "License No."
                                    , "id": "licenseno"
                                    , "validate_exp": "/[0-9]+/"
                        }, {
                                    "type": "date"
                                    , "size": 20
                                    , "value": null
                                    , "required": true
                                    , "label": "License Issue Date"
                                    , "id": "issuedate"
                                    , "validate_exp": ""
                        }, {
                                    "type": "date"
                                    , "size": 12
                                    , "value": null
                                    , "required": true
                                    , "label": "Date of Birth"
                                    , "id": "dob"
                                    , "validate_exp": ""
                        }, {
                                    "type": "text"
                                    , "size": 200
                                    , "value": null
                                    , "required": true
                                    , "label": "Street"
                                    , "id": "street"
                                    , "validate_exp": ""
                        }, {
                                    "type": "text"
                                    , "size": 50
                                    , "value": null
                                    , "required": true
                                    , "label": "City"
                                    , "id": "city"
                                    , "validate_exp": "/[a-zA-Z]+/"
                        }, {
                                    "type": "text"
                                    , "size": 2
                                    , "value": null
                                    , "required": true
                                    , "label": "State"
                                    , "id": "state"
                                    , "validate_exp": "/[a-zA-Z]+/"
            }
                        , {
                                    "type": "tel"
                                    , "size": 5
                                    , "value": null
                                    , "required": true
                                    , "label": "Zip"
                                    , "id": "zip"
                                    , "validate_exp": "/[0-9]+/"
                        }, {
                                    "type": "select"
                                    , "label": "Gender"
                                    , "id": "sex"
                                    , "options": [
                            "Male"
                            , "Female"]
                        }]
                            //page-block
                            
                        , "garaging_address": [{
                                "type": "text"
                                , "size": 200
                                , "default_value": null
                                , "required": true
                                , "label": "Street"
                                , id: "gstreet"
                                , "validate_exp": ""
                    }
                    , {
                                "type": "text"
                                , "size": 50
                                , "default_value": null
                                , "required": true
                                , "label": "City"
                                , id: "gcity"
                                , "validate_exp": "/[a-zA-Z]+/"
                    }
                    , {
                                "type": "text"
                                , "size": 2
                                , "default_value": null
                                , "required": true
                                , "label": "State"
                                , id: "gstate"
                                , "validate_exp": "/[a-zA-Z]+/"
                    }
                    , {
                                "type": "tel"
                                , "size": 5
                                , "default_value": null
                                , "required": true
                                , "label": "Zip"
                                , id: "gzip"
                                , "validate_exp": "/[0-9]+/"
                    }
                        ]
                    }
                    //page
                    
                    , "driver_info": {
                        //page-block
                        "user_info":
                        //leaves
            [{
                            "type": "text"
                            , "size": 5
                            , "default_value": null
                            , "required": true
                            , "label": "County"
                            , "id": "county"
                            , "validate_exp": "/[0-9]+/"
}, {
                            "type": "text"
                            , "size": 5
                            , "default_value": null
                            , "required": true
                            , "label": "Phone"
                            , "id": "phone"
                            , "validate_exp": "/[0-9]+/"
}, {
                            "type": "email"
                            , "size": 5
                            , "default_value": null
                            , "required": true
                            , "label": "Email"
                            , "id": "email"
                            , "validate_exp": "/[0-9]+/"
}, {
                            "type": "select"
                            , "id": "maritalstatus"
                            , "label": "Marital Status"
                            , "options": [
                            "single"
                            , "married"]
}]
                    }
                }, //block
                "cars": {
                    //page
                    "carInfo": {
                        //page-block
                        "carInfoBlock": [{
                                "type": "text"
                                , "size": 200
                                , "default_value": null
                                , "required": true
                                , "label": "Vin no."
                                , "id": "vin"
                                , "validate_exp": ""
                }
                , {
                                "type": "number"
                                , "size": 200
                                , "default_value": null
                                , "required": true
                                , "label": "Year"
                                , "id": "year"
                                , "validate_exp": ""
                }
                , {
                                "type": "text"
                                , "size": 200
                                , "default_value": null
                                , "required": true
                                , "label": "Make"
                                , "id": "make"
                                , "validate_exp": ""
                }
                , {
                                "type": "text"
                                , "size": 200
                                , "default_value": null
                                , "required": true
                                , "label": "Model"
                                , "id": "model"
                                , "validate_exp": ""
                }]
                    }
                    //page
                    
                    , "coverages": {
                        //page-block
                        "Coverages":
                        //leaves
                [{
                                "type": "select"
                                , "label": "Bodily Injury"
                                , "id": "BI"
                                , "options": [
                            "250"
                            , "500", "1000"]
                }
                , {
                                "type": "select"
                                , "label": "Property Destruction"
                                , "id": "PD"
                                , "options": [
                            "250"
                            , "500", "1000"]
    }
    , {
                                "type": "select"
                                , "label": "Uninsured/Unserinsured Motorist"
                                , "id": "UML"
                                , "options": [
                            "accept"
                            , "reject"]
    }, {
                                "type": "select"
                                , "label": "Medical Payments"
                                , "id": "MP"
                                , "options": [
                             "accept"
                            , "reject"]
    }, {
                                "type": "select"
                                , "label": "Comprehensive Deductible"
                                , "id": "compdeduct"
                                , "options": [
                             "250"
                            , "500", "1000"]
    }, {
                                "type": "select"
                                , "label": "Comprehensive Obese Deductible"
                                , "id": "colldeduct"
                                , "options": [
                            "250"
                            , "500", "1000"]
    }]
                    }
                }
                //block
                
                , "quote": {
                    //[page]
                    "discounts": {
                        //pageBlock
                        "discounts": [{
                                "text": "Prior Coverage"
                                , "id": "prior-cov"
                                , "checked": "false"
                }
                , {
                                "text": "Multi Car"
                                , "id": "multi-car"
                                , "checked": "false"
                }
                , {
                                "text": "Home Owner"
                                , "id": "home-owner"
                                , "checked": "false"
                }
                , {
                                "text": "Paid in Full"
                                , "id": "paid-in-full"
                                , "checked": "false"
                }
                , {
                                "text": "Good Student"
                                , "id": "good-student"
                                , "checked": "false"
                }]
                    }
                    //page
                    
                    , "policyterm": {
                        "date picker": {
                            "type": "date"
                            , label: "Date Picker"
                        }
                    }
                }
            }
        }
        //pages gotten has to change as do page blocks, depending on state, so we need to do the parsing of the json per parent state
        //for drivers:
    this.getPageBlockItems = function (json, block, pageBlocks) {
        var temp = [];
        var currentBlock = json.inputs[block]
        $.each(currentBlock, function (page, pageBlock) {
            console.log(page, pageBlock);
            if (pageBlocks == true) {
                for (var i = 0; i < pageBlock.length; i++) {
                    if (pageBlock[i].id == 'maritalstatus' || pageBlock[i].id == 'issuedate') {
                        pageBlock.splice(i, 1);
                    }
                }
                console.log("primary driver:", currentBlock);
            }
            else {
                if (page == 'driver_info') {
                    delete currentBlock['driver_info'];
                    console.log("not primary:", currentBlock);
                }
            }
        });
        return currentBlock
            //        for (var page in pages) {
            //            var currentPage = pages[page];
            //            $.each(pageBlocks[currentPage], function (label, value) {}
            //            }
            //            if (this.checkPrimary == true) {
            //                var id1 = "licenseno";
            //                var id2 = "issuedate";
            //                for (var i = 0; i < )
            //            }
    }
    return this;
});