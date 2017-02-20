services.factory('newPrimaryService', function (APP_DEBUG) {
    this.savePrimaryDriver = function (driver) {
        //get model insuresacn json
        var insurescanJson = JSON.parse(sessionStorage.getItem('insurescanJson'));
        //        split full name into first and last names. 
        //TODO: split first and last name user entry fields and population
        var fullname = driver['fullname'];
        var split = fullname.split(" ");
        var Firstname = split[0];
        var Lastname = split[1];
        //
        //modify insuresacn json model
        //
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
    };
});