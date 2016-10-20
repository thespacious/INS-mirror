services.factory('quoteInfoServices', function (BASE_SERVER) {
    this.ipObj1 = {
        callback: function (val) { //Mandatory
            var dates = {};
            dates.oldDate = val;
            dates.newDate = val.setMonth(val.getMonth() + 6);
            console.log("new date is: " + dates.newDate);
            return dates;
        }
        , disabledDates: [
      ]
        , from: new Date(2012, 1, 1), //Optional
        to: new Date(2016, 10, 30), //Optional
        inputDate: new Date(), //Optional
        mondayFirst: true, //Optional
        disableWeekdays: [0], //Optional
        closeOnSelect: false, //Optional
        templateType: 'modal' //Optional
    };
    this.openDatePicker = function (ionicDatePicker) {
        ionicDatePicker.openDatePicker(ipObj1);
    };
    this.populateDiscounts = function () {
        var session = JSON.parse(sessionStorage.getItem("session"));
        var discounts = session["discounts"];
        if (session['discounts'] != null) {
            document.getElementById('prior-cov').checked = discounts["PC"];
            document.getElementById('multi-car').checked = discounts["MC"];
            document.getElementById('home-owner').checked = discounts["H"];
            document.getElementById('paid-in-full').checked = discounts["PF"];
            document.getElementById('good-student').checked = discounts["GS"];
        }
    };
    this.validateDiscounts = function () {
        var session = JSON.parse(sessionStorage.getItem("session"));
        var discounts = [];
        discounts["PC"] = document.getElementById('prior-cov').checked;
        discounts["MC"] = document.getElementById('multi-car').checked;
        discounts["H"] = document.getElementById('home-owner').checked;
        discounts["PF"] = document.getElementById('paid-in-full').checked;
        discounts["GS"] = document.getElementById('good-student').checked;
        session["discounts"] = discounts;
        sessionStorage.setItem("session", JSON.stringify(session));
        return true;
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
        var date = [year, month, day].join('-');
        var time = [hour, minute, second].join(':');
        return date.concat(time);
    };
    this.incrementDate = function () {
        console.log($('startDatePicker').datepicker('getDate'));
        var oldDate = new Date(document.forms.PolicyTermForm.startDatePicker.getDate());
        var newDate = new Date(((oldDate.getMonth() + 7) % 12) + '/' + oldDate.getDate() + '/' + oldDate.getFullYear());
        document.forms.PolicyTermForm.endDatePicker.value = newDate;
    };
    this.populateDate = function () {
        var session = JSON.parse(sessionStorage.getItem("session"));
        var date = session["policyTerm"];
        if (date != null) {
            document.PolicyTermForm.date.value = date;
        }
    };
    this.recieveQuote = function () {
        /*
        	// Options of the spinner
        	var opts = {
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
        	
        	// Make spinner appear
            var target = document.getElementById('spinnerContainer');
            var spinner = new Spinner(opts).spin(target);
        	
        	document.getElementById('messageToUser').innerHTML = "";
        	*/
        //creating XMLhttpRequest object  
        var xhr;
        xhr = new XMLHttpRequest();
        //creating a Json
        var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
        //        params = JSON.stringify(insurescanJson);
        var newParams = JSON.stringify(insurescanJson);
        //    alert(params);
        // Open a connection to the server
        //TODO find out endpoint
        xhr.open("POST", BASE_SERVER + "quote", true);
        // declaring that the data being sent is in JSON format  
        xhr.setRequestHeader("Content-Type", "application/json");
        // Send the request  
        xhr.send(params);
        alert("Request sent to IDMI for a quote. Wait for a few moments.");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                //            alert(xhr.status);
                // Stop spinner
                //spinner.stop();
                //alert("Here is the IDMI quote.");
                //alert(xhr.responseText);
                var xmldoc2 = xhr.responseXML;
                var parser = new DOMParser;
                var xmldoc = parser.parseFromString(xmltext, "text/xml");
                //            alert(xhr.responseXML);
                //Count the number of vehicles
                var quoteVIN = xmldoc.getElementsByTagName("VehIdentificationNumber");
                var vehCount = quoteVIN.length;
                var quoteModel = xmldoc.getElementsByTagName("Model");
                var quoteModelYear = xmldoc.getElementsByTagName("ModelYear");
                var quoteVehBodyTypeCd = xmldoc.getElementsByTagName("VehBodyTypeCd");
                var quotes = [];
                for (var doAllVeh = 0; doAllVeh < vehCount; doAllVeh++) {
                    //alert(quoteVIN[doAllVeh].childNodes[0].nodeValue);
                    var firstVeh = xmldoc.getElementsByTagName("PersVeh")[doAllVeh];
                    var xlen = firstVeh.childNodes.length;
                    var y = firstVeh.firstChild;
                    var txt = "";
                    var quote = {};
                    for (var i = 0; i < xlen; i++) {
                        if (y.nodeType == 1 && y.nodeName == "CoverageCd") {
                            var temp = get_nextsibling(y);
                            if (y.childNodes[0].nodeValue == "BI") {
                                quote["BI"] = temp.childNodes[0].nodeValue;
                                //alert("Success BI");
                            }
                            if (y.childNodes[0].nodeValue == "PD") {
                                quote["PD"] = temp.childNodes[0].nodeValue;
                                //alert("Success PD");
                            }
                            if (y.childNodes[0].nodeValue == "UMPD") {
                                quote["UMPD"] = temp.childNodes[0].nodeValue;
                                //alert("Success UMPD");
                            }
                            if (y.childNodes[0].nodeValue == "UMBI") {
                                quote["UMBI"] = temp.childNodes[0].nodeValue;
                                //alert("Success UMBI");
                            }
                            if (y.childNodes[0].nodeValue == "MEDPM") {
                                quote["MEDPM"] = temp.childNodes[0].nodeValue;
                                //alert("Success MEDPM");
                            }
                            if (y.childNodes[0].nodeValue == "OTC" || y.childNodes[0].nodeValue == "COMP") {
                                quote["COMP"] = temp.childNodes[0].nodeValue;
                                //alert("Success COMP");
                            }
                            if (y.childNodes[0].nodeValue == "COLL") {
                                quote["COLL"] = temp.childNodes[0].nodeValue;
                                //alert("Success COLL");
                            }
                            if (y.childNodes[0].nodeValue == "TOW") {
                                quote["TL"] = temp.childNodes[0].nodeValue;
                                //alert("Success TL");
                            }
                            if (y.childNodes[0].nodeValue == "RREIM") {
                                quote["RREIM"] = temp.childNodes[0].nodeValue;
                                //alert("Success RREIM");
                            }
                        }
                        y = y.nextSibling;
                    }
                    quote["VIN"] = quoteVIN[doAllVeh].childNodes[0].nodeValue;
                    quotes.push(quote);
                }
                session["quotes"] = quotes;
                sessionStorage.setItem("session", JSON.stringify(session));
                window.location.href = "quote.html";
            }
            else {
                //alert("The status is:" + xhr.status + " and the readyState is: " + xhr.readyState);
            }
        }
    };
    this.get_nextsibling = function (n) {
        var x = n.nextSibling;
        while (x.nodeName != "CurrentTermAmt") {
            x = x.nextSibling;
        }
        return x;
    };
    this.validatePolcyTerm = function () {
        var session = JSON.parse(sessionStorage.getItem("session"));
        var policyTerm = document.forms.PolicyTermForm.startDatePicker.value;
        session["policyTerm"] = policyTerm;
        sessionStorage.setItem("session", JSON.stringify(session));
        //update Insurescan with policy term from and to
        //        var toDate = sessionStorage.getItem("toDate");
        var toDate = document.forms.PolicyTermForm.endDatePicker.value;
        var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.ContractTerm.EffectiveDt = this.formatDate(policyTerm);
        insurescanJson.ACORD.InsuranceSvcRq.PersAutoPolicyQuoteInqRq.PersPolicy.ContractTerm.ExpirationDt = this.formatDate(toDate);
        sessionStorage.setItem('insurescanJson', JSON.stringify(insurescanJson));
        return true;
        //        document.PolicyTermForm.submit();
    };
    //
    //
    this.sendQuote = function (json) {
        var creds = JSON.parse(sessionStorage.getItem('credentials'));
        var returnData = "";
        var req = {
            type: "POST"
                //            , url: BASE_SERVER + "quote/" + creds.quoteId
                
            , url: BASE_SERVER + "/quote/" + creds.quoteId
            , headers: {
                'SESSIONID': creds.userCreds.sessionId
            }
            , context: this
            , async: false
                //            , dataType: "json"
                
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
    //
    //
    this.submitForms = function () {
        if (this.validateDiscounts() == true && this.validatePolcyTerm()) {
            return true;
        }
        else {
            return false;
        }
    };
    return this;
});