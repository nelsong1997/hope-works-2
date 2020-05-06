import React from "react";
import Hw from './images/hw.png';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      numIncidents: 1,
      numOrders: 1,
      newUser: true,
      newIncident: false,
      errorMessage: "",
      referrals: false,
      otherLanguage: "",
      otherEthnicity: "",
      otherTimeSpent: "",
      otherAdvocacy: "",
      otherSupport: "",
      victimsClaim: false,
      materialAssistance: false,
      isAStudent: false,
      anotherSchool: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayIncidents = this.displayIncidents.bind(this);
    this.numIncidentsChange = this.numIncidentsChange.bind(this);
    this.numOrdersChange = this.numOrdersChange.bind(this);
    this.displayOrders = this.displayOrders.bind(this);
    this.userTypeChange = this.userTypeChange.bind(this);
    this.newIncidentChange = this.newIncidentChange.bind(this);
    this.displayDemographicContent = this.displayDemographicContent.bind(this);
    this.displayIncidentAndOrder = this.displayIncidentAndOrder.bind(this);
    this.displayReferralBox = this.displayReferralBox.bind(this);
    this.referralBoxChange = this.referralBoxChange.bind(this);
    this.displayReferrals = this.displayReferrals.bind(this);
    this.otherLanguageChange = this.otherLanguageChange.bind(this);
    this.otherEthnicityChange = this.otherEthnicityChange.bind(this);
    this.timeSpentChange = this.timeSpentChange.bind(this);
    this.otherAdvocacyChange = this.otherAdvocacyChange.bind(this);
    this.otherSupportChange = this.otherSupportChange.bind(this);
    this.victimsClaimChange = this.victimsClaimChange.bind(this);
    this.materialAssistanceChange = this.materialAssistanceChange.bind(this);
    this.isAStudentChange = this.isAStudentChange.bind(this);
    this.schoolChange = this.schoolChange.bind(this);
  }

  async handleSubmit(evnt) {
    evnt.preventDefault();

    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let identifiers = document.getElementById("identifiers");
    let advocateInitials = document.getElementById("advocate-initials");
    let contactDate = document.getElementById("contact-date");
    let cityTown = document.getElementById("city-town");
    let phone = document.getElementById("phone");
    let survivorGender = document.getElementById("survivor-gender");
    let dob = document.getElementById("dob");
    let ageLow = document.getElementById("age-range-0")
    let ageHigh = document.getElementById("age-range-1")
    let numberChildren = document.getElementById("number-children");
    let nameOfSchool = document.getElementById("name-of-school");
    let otherSchool = document.getElementById("other-school");
    let referrer = document.getElementById("hear-about");
    let contactCall = document.getElementById("contact-calls");
    let contactInPerson = document.getElementById("contact-in-person");
    let contactEmail = document.getElementById("contact-email");
    let contactInstantMessaging = document.getElementById("contact-instant-messaging");
    let contactOnBehalf = document.getElementById("contact-on-behalf");
    let groups = document.getElementById("groups");
    let safeHomeEntered = document.getElementById("safe-home-entered");
    let safeHomeExited = document.getElementById("safe-home-exited");
    let safeHomeExtension = document.getElementById("safe-home-extension");
    let notes = document.getElementById("notes");
    
    if (this.state.numIncidents > 10) {
      this.setState({ errorMessage: "Error submitting form: Too many incidents."})
      return
    } else if (this.state.numOrders > 10) {
      this.setState({ errorMessage: "Error submitting form: Too many orders."})
      return
    } else if (this.state.newUser && ((ageLow.value==="" && ageHigh.value!=="") || (ageLow.value!=="" && ageHigh.value===""))) {
      this.setState( {errorMessage: "Error submitting form: Only one of the Age Range fields is filled; please fill both or neither"} )
      return
    } else if (contactDate.value.length < 10) {
      this.setState( {errorMessage: "Error submitting form: the Contact Date field is required"} )
      return
    } else if (firstName.value==="") {
      this.setState( {errorMessage: "Error submitting form: the First Name field is required"} )
      return
    } else {
      this.setState({ errorMessage: ""})
    }
    let theData = {
      timestamp: new Date().toLocaleString(),
      newUser: this.state.newUser,
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      otherIdentifiers: identifiers.value,
      advocateInitials: advocateInitials.value,
      contactDate: contactDate.value,
      city: cityTown.value,
      phone: phone.value,
      survivorType: radioButtonValue("survivor-type"),
    };

    if (this.state.newUser) {
      theData.survivorGender = survivorGender.value;
      theData.dateOfBirth = dob.value;
      theData.ageRange = [ageLow.value, ageHigh.value];
      theData.language = radioButtonValue("language");
      theData.ethnicity = checkBoxValues("ethnicity");
      theData.numberOfChildren = numberChildren.value;
      theData.disability = radioButtonValue("disability");
      theData.miscChars = checkBoxValues("characteristics");
      if (this.state.isAStudent && !this.state.anotherSchool) {
        theData.nameOfSchool = nameOfSchool.value
      } else if (this.state.isAStudent && this.state.anotherSchool) {
        theData.nameOfSchool = "Other: " + otherSchool.value
      }
      theData.referrer = referrer.value;
    }

    if (this.state.newUser || (!this.state.newUser && this.state.newIncident)) {
      theData.incidents = getIncidents(this.state.numIncidents);
      theData.protectionOrders = getOrders(this.state.numOrders);
      theData.partiallyServedReasons = checkBoxValues("partially-served");
    }

    theData.safeToCall = radioButtonValue("safe-to-call");
    theData.safeToLeaveMessage = radioButtonValue("safe-to-leave-message");
    theData.contactTypes = {
        calls: contactCall.value,
        inPerson: contactInPerson.value,
        email: contactEmail.value,
        instantMessaging: contactInstantMessaging.value,
        onBehalf: contactOnBehalf.value
      };
    theData.timeSpent = radioButtonValue("time-call");
    theData.servicesProvided = {
        advocacy: checkBoxValues("advocacy"),
        support: checkBoxValues("support"),
        medical: checkBoxValues("medical"),
        assistanceServices: checkBoxValues("assistance-services"),
        informationReferral: checkBoxValues("information-referral"),
        safeHome: {
          entered: safeHomeEntered.value,
          exited: safeHomeExited.value,
          extension: safeHomeExtension.value
        },                                
        groups: groups.value
      };
    if (this.state.referrals) {
      theData.referrals = referralValues("referrals");
    }
    theData.outcomeMeasures = radioButtonValue("plan-for-safety");
    theData.communityResources = radioButtonValue("community-resources");
    theData.rightsAndOptions = radioButtonValue("rights-options");
    theData.notes = notes.value;

    const response = await fetch("/form", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(theData)
    });
    if (response.status === 200) {
      console.log("form added")
    }

    window.location.replace("/home")
  }

  userTypeChange(evnt) {
    if (this.state.newUser) {
      this.setState({ newUser: false});
    } else {
      this.setState({ newUser: true});
    }
  }

  displayNewIncidentBox() {
    if (this.state.newUser) {
      return null;
    } else {
      if (this.state.newIncident) {
        return (
          <label htmlFor="new-incident">
              <input id="new-incident" type="checkbox" onChange={this.newIncidentChange} defaultChecked/>New Incident(s)
          </label>
        )
      } else {
        return (
          <label htmlFor="new-incident">
              <input id="new-incident" type="checkbox" onChange={this.newIncidentChange}/>New Incident(s)
          </label>
        )
      }
    }
  }

  newIncidentChange() {
    if (this.state.newIncident) {
      this.setState({ newIncident: false });
    } else {
      this.setState({ newIncident: true });
    }
  }

  numIncidentsChange(evnt) {
    this.setState({ numIncidents: evnt.target.value });
  }

  displayLanguageOtherButton () {
    if (this.state.otherLanguage==="") {
      return (
        <label>
          <input name="language" type="radio" value="Other" />Other:
          <input type="text" name="language" className="inline-input" onChange={this.otherLanguageChange}/>
        </label>
      )
    } else {
      return (
        <label>
          <input name="language" type="radio" value="Other" defaultChecked/>Other:
          <input type="text" name="language" className="inline-input" onChange={this.otherLanguageChange}/>
        </label>
      )
    }
  }

  otherLanguageChange (evnt) {
    this.setState( {otherLanguage: evnt.target.value} )
  }

  displayEthnicityOtherButton () {
    if (this.state.otherEthnicity==="") {
      return (
        <label>
          <input type="checkbox" name="ethnicity" value="Other" />Other:
          <input type="text" name="ethnicity" className="inline-input" onChange={this.otherEthnicityChange}/>
        </label>
      )
    } else {
      return (
        <label>
          <input type="checkbox" name="ethnicity" value="Other" defaultChecked/>Other:
          <input type="text" name="ethnicity" className="inline-input" onChange={this.otherEthnicityChange}/>
        </label>
      )
    }
  }

  otherEthnicityChange (evnt) {
    this.setState( {otherEthnicity: evnt.target.value} )
  }

  displayOtherTimeSpent () {
    if (this.state.otherTimeSpent==="") {
      return (
        <label htmlFor="time-call">
          <input name="time-call" type="radio" value="Other" />Other (in hours):
          <input type="number" name="time-call" className="inline-input" onChange={this.timeSpentChange}/>
        </label>
      )
    } else {
      return (
        <label htmlFor="time-call">
          <input name="time-call" type="radio" value="Other" defaultChecked/>Other (in hours):
          <input type="number" name="time-call" className="inline-input" onChange={this.timeSpentChange}/>
        </label>
      )
    }
  }

  timeSpentChange (evnt) {
    this.setState( {otherTimeSpent: evnt.target.value} )
  }

  displayOtherAdvocacyButton () {
    if (this.state.otherAdvocacy==="") {
      return (
        <label>
          <input type="checkbox" name="advocacy" value="Other Civil Legal"/>Other:
          <input type="text" name="advocacy" className="inline-input" onChange={this.otherAdvocacyChange}/>
          <br/>
        ​​​​​​​​​​​​​​</label>
      )
    } else {
      return (
        <label>
          <input type="checkbox" name="advocacy" value="Other Civil Legal" defaultChecked/>Other:
          <input type="text" name="advocacy" className="inline-input" onChange={this.otherAdvocacyChange}/>
          <br/>
        ​​​​​​​​​​​​​​</label>
      )
    }
  }

  otherAdvocacyChange (evnt) {
    this.setState( {otherAdvocacy: evnt.target.value} )
  }

  displayOtherSupportButton () {
    if (this.state.otherSupport==="") {
      return (
        <label>
          <input type="checkbox" name="support" value="Other" />Other:
          <input type="text" name="support" className="inline-input" onChange={this.otherSupportChange}/>  ​​​​​​​​​​​​​​​​​​​​​​​​​​​
          <br />
        </label>
      )
    } else {
      return (
        <label>
          <input type="checkbox" name="support" value="Other" defaultChecked/>Other:
          <input type="text" name="support" className="inline-input" onChange={this.otherSupportChange}/>  ​​​​​​​​​​​​​​​​​​​​​​​​​​​
          <br />
        </label>
      )
    }
  }

  otherSupportChange (evnt) {
    this.setState( {otherSupport: evnt.target.value} )
  }

  displayVictimsClaim () {
    if (this.state.victimsClaim) {
      return (
        <label>
          <input type="checkbox" name="assistance-services" value="Victims' Compensation Claim (in $)" onChange={this.victimsClaimChange} defaultChecked/>Victims' Compensation Claim
          <br/>
          <label className="indented">Amount: $</label>
          <input type="number" name="assistance-services" className="inline-input"/>
          ​​​​​​​​​​​​​​​<br />
        </label>
      )
    } else {
      return (
        <label>
          <input type="checkbox" name="assistance-services" value="Victims' Compensation Claim (in $)" onChange={this.victimsClaimChange}/>Victims' Compensation Claim
          <br/>
        </label>
      )
    }
  }

  victimsClaimChange (evnt) {
    if (this.state.victimsClaim) {
      this.setState( {victimsClaim: false} )
    } else {
      this.setState( {victimsClaim: true} )
    }
  }

  displayMaterialAssistance () {
    if (this.state.materialAssistance) {
      return (
        <div>
          <input type="checkbox" name="assistance-services" value="Material Assistance" onChange={this.materialAssistanceChange} defaultChecked/>Material Assistance
          <br />
          <div id="material-assistance-div" className="indented">
            <input type="checkbox" name="assistance-services" value="Bus Pass"/>Bus Pass
            <br />
            <input type="checkbox" name="assistance-services" value="Food Cart"/>Food Cart
            <br />
            <input type="checkbox" name="assistance-services" value="Clothes"/>Clothes
            <br />
            <input type="checkbox" name="assistance-services" value="Hygiene"/>Hygiene
            <br />
            <input type="checkbox" name="assistance-services" value="Hotel" />Hotel
            <br />
            <input type="checkbox" name="assistance-services" value="Other"/>Other
            <br />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <input type="checkbox" name="assistance-services" value="Material Assistance" onChange={this.materialAssistanceChange}/>Material Assistance
          <br/>
        </div>
      )
    }
  }

  materialAssistanceChange () {
    if (this.state.materialAssistance) {
      this.setState( {materialAssistance: false} )
    } else {
      this.setState( {materialAssistance: true} )
    }
  }

  displayDemographicContent () {
    if (this.state.newUser) {
      return (
        <div>
          <hr id="demographic-content"/>
          <h3>Demographic Info</h3>
          <label htmlFor="survivor-gender">Gender</label>
          <br />
          <select id="survivor-gender">
            <option value="" disabled selected>Gender</option>
            <option value="Unknown">Unknown</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Intersex">Intersex</option>
            <option value="M→F">M→F</option>
            <option value="F→M">F→M</option>
            <option value="Questioning">Questioning</option>
            <option value="Self Defined">Self Defined</option>
          </select>
          <br />
          <label htmlFor="dob">Date of Birth</label>
          <br />
          <input type="date" id="dob" />
          <br />
          <label htmlFor="age-range-0">Approximate Age (range)</label>
          <br />
          <input id="age-range-0" type="number" />-{" "}
          <input id="age-range-1" type="number" />
          <br />
          <label htmlFor="language">Language</label>
          <div id="language">
            <input name="language" value="English" type="radio" />
            English
            <br />
            <input
              name="language"
              value="Limited English Proficiency"
              type="radio"
            />
            Limited English Proficiency
            <br />
            <input name="language" value="ASL" type="radio" />
            ASL
            <br />
            {this.displayLanguageOtherButton()}
          </div>
          <label htmlFor="ethnicity">Ethnicity</label>
          <div id="ethnicity">
            <input type="checkbox" name="ethnicity" value="Asian" />
            Asian
            <br />
            <input
              type="checkbox"
              name="ethnicity"
              value="Black/African American"
            />
            Black/African American
            <br />
            <input type="checkbox" name="ethnicity" value="Hispanic/Latino" />
            Hispanic/Latino
            <br />
            <input
              type="checkbox"
              name="ethnicity"
              value="Native American/Alaskan"
            />
            Native American/Alaskan
            <br />
            <input
              type="checkbox"
              name="ethnicity"
              value="Native Hawaiian/Pacific Islander"
            />
            Native Hawaiian/Pacific Islander
            <br />
            <input type="checkbox" name="ethnicity" value="White/Caucasian" />
            White/Caucasian
            <br />
            <input type="checkbox" name="ethnicity" value="Unknown" />
            Unknown
            <br />
            {this.displayEthnicityOtherButton()}
          </div>
          <label htmlFor="number-children">
            Number of Children in Household
          </label>
          <br />
          <input id="number-children" type="number" min="0" max="30" />
          <br />
          <label htmlFor="disability">Disability (self-disclosed)</label>
          <div id="disability">
            <label>
              <input name="disability" value="yes" type="radio" />
              Yes
            </label>
            <br />
            <label>
              <input name="disability" value="no" type="radio" />
              No
            </label>
          </div>
          <label htmlFor="characteristics">Misc. Characteristics</label>
          <div id="characteristics">
            <input
              type="checkbox"
              name="characteristics"
              value="Deaf/Hard of Hearing"
            />
            Deaf/Hard of Hearing
            <br />
            <input type="checkbox" name="characteristics" value="LGBTQ+" />
            LGBTQ+
            <br />
            <input
              type="checkbox"
              name="characteristics"
              value="Refugee/Recent Immigrant"
            />
            Refugee/Recent Immigrant
            <br />
            <input type="checkbox" name="characteristics" value="Homeless" />
            Homeless
            <br />
            <input
              type="checkbox"
              name="characteristics"
              value="Low Income"
            />
            Low Income
            <br />
            <input type="checkbox" name="characteristics" value="Student/affiliated with a school" onChange={this.isAStudentChange}/>Student/affiliated with a school
            <br/>
            {this.displaySchoolSelection(this.state.isAStudent)}
            <br/>
          </div>
          <label htmlFor="hear-about">
            How did the service user hear about HOPE Works?
          </label>
          <br />
          <input id="hear-about" placeholder="Name of referrer" />
        </div>
      )
    } else {
      return null;
    }
  }

  isAStudentChange() {
    this.setState( {isAStudent: !this.state.isAStudent} )
  }

  displaySchoolSelection(status) {
    if (!status) {
      return null
    } else {
      return (
        <div>
          <select id="name-of-school" onChange={this.schoolChange}>
            <option disabled selected value="">Schools</option>
            <option value="UVM">UVM</option>
            <option value="Champlain College">Champlain College</option>
            <option value="CCV">CCV</option>
            <option value="St. Michael's College">Saint Michael's College</option>
            <option value="Colchester High School">Colchester High School</option>
            <option value="South Burlington High School">South Burlington High School</option>
            <option value="Winooski High School">Winooski High School</option>
            <option value="Burlington High School">Burlington High School</option>
            <option value="Essex High School">Essex High School</option>
            <option value="Rock Point School">Rock Point School</option>
            <option value="Rice Memorial High School">Rice Memorial High School</option>
            <option value="Champlain Valley Union HS">Champlain Valley Union HS</option>
            <option value="Milton High School">Milton High School</option>
            <option value="Mount Mansfield Union High School">Mount Mansfield Union HS</option>
            <option value="Lake Champlain Waldorf School">Lake Champlain Waldorf School</option>
            <option value="Other">Other</option>
          </select>
          <br/>
          {this.displayOtherSchool(this.state.anotherSchool)}
        </div>
      )
    }
  }

  schoolChange(evnt) {
    if (evnt.target.value==="Other") {
      this.setState( {anotherSchool: true} )
    } else {
      this.setState( {anotherSchool: false} )
    }
  }

  displayOtherSchool(status) {
    if (!status) {
      return null
    } else {
      return (
        <div>
          Name of other school: <input id="other-school"/>
          <br/>
        </div>
      )
    }
  }

  displayIncidentAndOrder () {
    if (this.state.newUser || (!this.state.newUser && this.state.newIncident)) {
      return (
        <div>
          <hr id="incident-information"/>
          <h3>Incident Info</h3>
          <div id="survivor-type">
            <input name="survivor-type" value="Primary Survivor" type="radio"/>
            Primary Survivor
            <br />
            <input name="survivor-type" value="Secondary Survivor" type="radio"/>
            Secondary Survivor
          </div>
          <br/>
          <label htmlFor="victimization-count">Number of Incidents</label>
          <br />
          <input
            id="victimization-count"
            type="number"
            onChange={this.numIncidentsChange}
          />
          {this.displayIncidents(this.state.numIncidents)}
          <hr />
          <label htmlFor="order-count">Number of Protection Orders</label>
          <br />
          <input
            id="order-count"
            type="number"
            onChange={this.numOrdersChange}
          />
          <br />
          {this.displayOrders(this.state.numOrders)}
          <hr />
          <label htmlFor="partially-served">Partially Served</label>
          <br />
          <label htmlFor="partially-served">
            A service user did not receive all the services requested because
            of:
          </label>
          <div id="partially-served">
            <input
              type="checkbox"
              name="partially-served"
              value="Hours of Operation"
            />
            Hours of Operation
            <br />
            <input
              type="checkbox"
              name="partially-served"
              value="Lack of Child Care"
            />
            Lack of Child Care
            <br />
            <input
              type="checkbox"
              name="partially-served"
              value="Program Reach Capacity"
            />
            Program Reach Capacity
            <br />
            <input
              type="checkbox"
              name="partially-served"
              value="Limited Resources/Priority Setting"
            />
            Limited Resources/Priority Setting
            <br />
            <input
              type="checkbox"
              name="partially-served"
              value="Safety/Security Risks (Perpetrator Generated)"
            />
            Safety/Security Risks (Perpetrator Generated)
            <br />
            <input
              type="checkbox"
              name="partially-served"
              value="Services Not Appropriate for Person"
            />
            Services Not Appropriate for Person
            <br />
            <input
              type="checkbox"
              name="partially-served"
              value="Transportation"
            />
            Transportation
          </div>
        </div>
        
      )
    } else {
      return null;
    }
  }

  displayIncidents(num) {
    let newNum = num;
    if (num > 10) {
      newNum = 0;
    }
    let i = 0;
    let listItems = [];
    while (i < newNum) {
      listItems.push(
        <div key={i} id={"incident-" + (i + 1)}>
          <hr/>
          <label htmlFor={"victimization-" + (i + 1)}>Victimization #{i + 1}</label>
          <div id={"victimization-" + (i + 1)}>
            <input type="checkbox" name={"victimization-" + (i + 1)} value="Rape" />
            Rape
            <br />
            <input
              type="checkbox"
              name={"victimization-" + (i + 1)}
              value="Attempted Rape"
            />
            Attempted Rape
            <br />
            <input
              type="checkbox"
              name={"victimization-" + (i + 1)}
              value="Sex Trafficking"
            />
            Sex Trafficking
            <br />
            <input
              type="checkbox"
              name={"victimization-" + (i + 1)}
              value="Child Sexual Abuse"
            />
            Child Sexual Abuse
            <br />
            <input
              type="checkbox"
              name={"victimization-" + (i + 1)}
              value="Drug Facilitated SV"
            />
            Drug Facilitated SV
            <br />
            <input type="checkbox" name={"victimization-" + (i + 1)} value="Stalking" />
            Stalking
            <br />
            <input
              type="checkbox"
              name={"victimization-" + (i + 1)}
              value="Sexual Harassment"
            />
            Sexual Harassment
            <br />
            <input
              type="checkbox"
              name={"victimization-" + (i + 1)}
              value="Domestic Violence"
            />
            Domestic Violence
            <br />
            <input type="checkbox" name={"victimization-" + (i + 1)} value="Other" />
            Other:
            <input type="text" name={"victimization-" + (i + 1)} className="inline-input" />
          </div>
          <label htmlFor={"perp-relationship-" + (i + 1)}>
            Perpetrator #{i + 1} Relationship
          </label>
          <div id={"perp-relationship-" + (i + 1)}>
            <input
              type="checkbox"
              name={"perp-relationship-" + (i + 1)}
              value="Acquaintance"
            />
            Acquaintance
            <br />
            <input
              type="checkbox"
              name={"perp-relationship-" + (i + 1)}
              value="Intimate Partner"
            />
            Intimate Partner
            <br />
            <input
              type="checkbox"
              name={"perp-relationship-" + (i + 1)}
              value="Family/Household Member"
            />
            Family/Household Member
            <br />
            <input
              type="checkbox"
              name={"perp-relationship-" + (i + 1)}
              value="Dating Relationship"
            />
            Dating Relationship
            <br />
            <input type="checkbox" name={"perp-relationship-" + (i + 1)} value="Stranger" />
            Stranger
            <br />
            <input type="checkbox" name={"perp-relationship-" + (i + 1)} value="Other" />
            Other:
            <input
              type="text"
              name={"perp-relationship-" + (i + 1)}
              className="inline-input"
            />
          </div>
          <label htmlFor={"perp-gender-" + (i + 1)}>Perpetrator #{i + 1} Gender</label>
          <br />
          <select id={"perp-gender-" + (i + 1)}>
            <option value="" disabled selected>Gender</option>
            <option value="Unknown">Unknown</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Intersex">Intersex</option>
            <option value="M→F">M→F</option>
            <option value="F→M">F→M</option>
            <option value="Questioning">Questioning</option>
            <option value="Self Defined">Self Defined</option>
          </select>
          <br />
        </div>
      );
      i++;
    }
    if (num > 10) {
      return <h4>Sorry, {num} is too many victimizations!</h4>;
    } else {
      return <div id="victimizations">{listItems}</div>;
    }
  }

  numOrdersChange(evnt) {
    this.setState({ numOrders: evnt.target.value });
  }

  displayOrders(num) {
    let newNum = num;
    if (num > 10) {
      newNum = 0;
    }
    let i = 0;
    let listItems = [];
    while (i < newNum) {
      listItems.push(
        <div key={i} id={"order-" + (i + 1)}>
          <hr/>
          <label htmlFor={"protection-asst-" + (i + 1)}>
            Protection Order Assistance #{i + 1}
          </label>
          <div id={"protection-asst-" + (i + 1)}>
            <div>
              <input name={"order-length-" + (i + 1)} value="Temporary Order" type="radio" />
              Temporary Order
              <br />
              <input name={"order-length-" + (i + 1)} value="Final Order" type="radio" />
              Final Order
            </div>
            <br />
            <div>
              <input name={"order-type-" + (i + 1)} value="Adult: DV" type="radio" />
              Adult: DV
              <br />
              <input name={"order-type-" + (i + 1)} value="Adult: Stalking" type="radio" />
              Adult: Stalking
              <br />
              <input name={"order-type-" + (i + 1)} value="Adult: SV" type="radio" />
              Adult: SV
              <br />
              <input name={"order-type-" + (i + 1)} value="OBO Child: CSA" type="radio" />
              OBO Child: CSA
              <br />
              <input name={"order-type-" + (i + 1)} value="OBO Child: Other" type="radio" />
              OBO Child: Other
            </div>
            <br />
            <div>
              <label>
                <input name={"order-granted-" + (i + 1)} value="Granted" type="radio" />
                Granted
              </label>
              <br />
              <label>
                <input name={"order-granted-" + (i + 1)} value="Denied" type="radio" />
                Denied
              </label>
              <br />
              <label>
                <input name={"order-granted-" + (i + 1)} value="Unknown" type="radio" />
                Unknown
              </label>
            </div>
          </div>
        </div>
      );
      i++;
    }
    if (num > 10) {
      return <h4>Sorry, {num} is too many orders!</h4>;
    } else { 
      return <div id="orders">{listItems}</div>;
    }
  }

  displayReferralBox () {
    if (this.state.referrals) {
      return (
        <label>
          <input type="checkbox" name="information-referral" value="Referral" onChange={this.referralBoxChange} defaultChecked/>Referral (see below when checked)
        </label>
      )
    } else {
      return (
        <label>
          <input type="checkbox" name="information-referral" value="Referral" onChange={this.referralBoxChange}/>Referral (see below when checked)
        </label>
      )
    }
  }

  referralBoxChange () {
    if (this.state.referrals) {
      this.setState({ referrals: false} );
    } else {
      this.setState({ referrals: true} );
    }
  }

  displayReferrals () {
    if (this.state.referrals) {
      return (
        <div>
          <h3>Referrals</h3>
          <label htmlFor="referrals">to/from</label>
          <div id="referrals">
            <input type="checkbox" name="referrals" value="to 211" />
            <input type="checkbox" name="referrals" value="from 211" />
            211
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to Campus Services"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from Campus Services"
            />
            Campus Services
            <input
              id="text-campus-services"
              type="text"
              name="referrals"
              className="inline-input"
            />
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to CUSI/State's Attorney/CAC"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from CUSI/State's Attorney/CAC"
            />
            CUSI/State's Attorney/CAC
            <br />
            <input type="checkbox" name="referrals" value="to DCF" />
            <input type="checkbox" name="referrals" value="from DCF" />
            DCF
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to Disability Org"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from Disability Org"
            />
            Disability Org
            <input
              id="text-disability-org"
              type="text"
              name="referrals"
              className="inline-input"
            />
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to DIVAS/Corrections/P+P"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from DIVAS/Corrections/P+P"
            />
            DIVAS/Corrections/P+P
            <br />
            <input type="checkbox" name="referrals" value="to DVAS" />
            <input type="checkbox" name="referrals" value="from DVAS" />
            DVAS
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to Financial Assistance Org"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from Financial Assistance Org"
            />
            Financial Assistance Org
            <input
              id="text-financial-assistance-org"
              type="text"
              name="referrals"
              className="inline-input"
            />
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to Financial Empowerment Programming"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from Financial Empowerment Programming"
            />
            Financial Empowerment Programming
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to Health Centers"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from Health Centers"
            />
            Health Centers
            <input
              id="text-health-centers"
              type="text"
              name="referrals"
              className="inline-input"
            />
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to HOPE Works Clinical Therapist"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from HOPE Works Clinical Therapist"
            />
            HOPE Works Clinical Therapist
            <br />
            <input type="checkbox" name="referrals" value="to Housing Org" />
            <input
              type="checkbox"
              name="referrals"
              value="from Housing Org"
            />
            Housing Org
            <input
              id="text-housing-org"
              type="text"
              name="referrals"
              className="inline-input"
            />
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to Immigrant Org"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from Immigrant Org"
            />
            Immigrant Org
            <input
              id="text-immigrant-org"
              type="text"
              name="referrals"
              className="inline-input"
            />
            <br />
            <input type="checkbox" name="referrals" value="to LGBTQ Org" />
            <input type="checkbox" name="referrals" value="from LGBTQ Org" />
            LGBTQ Org
            <input
              id="text-lgbtq-org"
              type="text"
              name="referrals"
              className="inline-input"
            />
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to National Guard/Military Services"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from National Guard/Military Services"
            />
            National Guard/Military Services
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to Network Program"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from Network Program"
            />
            Network Program
            <input
              id="text-network-program"
              type="text"
              name="referrals"
              className="inline-input"
            />
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to Police Department"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from Police Department"
            />
            Police Department
            <input
              id="text-police-department"
              type="text"
              name="referrals"
              className="inline-input"
            />
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to Out of State Rape Crisis Services"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from Out of State Rape Crisis Services"
            />
            Out of State Rape Crisis Services
            <br />
            <input type="checkbox" name="referrals" value="to RAINN" />
            <input type="checkbox" name="referrals" value="from RAINN" />
            RAINN
            <br />
            <input type="checkbox" name="referrals" value="to SANE" />
            <input type="checkbox" name="referrals" value="from SANE" />
            SANE
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to Support Group"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from Support Group"
            />
            Support Group
            <br />
            <input
              type="checkbox"
              name="referrals"
              value="to Therapist List"
            />
            <input
              type="checkbox"
              name="referrals"
              value="from Therapist List"
            />
            Therapist List
            <br />
            <input type="checkbox" name="referrals" value="to Youth Org" />
            <input type="checkbox" name="referrals" value="from Youth Org" />
            Youth Org
            <input
              id="text-youth-org"
              type="text"
              name="referrals"
              className="inline-input"
            />
            <br />
            <input type="checkbox" name="referrals" value="to Other" />
            <input type="checkbox" name="referrals" value="from Other" />
            Other
            <input
              id="text-other"
              type="text"
              name="referrals"
              className="inline-input"
            />
            <br />
          </div>
          <hr/>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div id="form-page">
          <div className="sticky_note">
              <label htmlFor="notes">Notes: </label>
              <br />
              <textarea id="notes" />
          </div>
        <form id="the-form">
          <div id="title">  
           <img className="form-logo" src={Hw} alt="Hope Works"/>
            <h2>SURVIVOR INFORMATION FORM</h2>
          </div>
          <div id="all-fields">
            <br />
            <input type="checkbox" id="new-user" onChange={this.userTypeChange} defaultChecked/>Service User is new to HOPE Works
            <br />
            {this.displayNewIncidentBox()}
            <hr />
            <div>
              <h3>Personal Info</h3>
              <label htmlFor="first-name">Name of Service User </label>
              <br />
              <input id="first-name" placeholder="First Name" />
              <br/>
              <input id="last-name" placeholder="Last Name/Initial" />
              <br />
              <label htmlFor="identifiers">
                Other identifiers for Service User
              </label>
              <br />
              <input id="identifiers" placeholder="Favorite color, etc." />
              <br />
              <label htmlFor="advocate-initials">Advocate Initials </label>
              <br />
              <input id="advocate-initials" placeholder="Initials"maxLength="2" />
              <br />
            </div>
            <div className="column-b">
              <label htmlFor="contact-date">Date of contact </label>
              <br />
              <input type="date" id="contact-date" />
              <br />
              <label htmlFor="city-town">City/Town </label>
              <br />
              <input id="city-town" placeholder="City/Town" />
              <br />
              <label htmlFor="phone">Phone Number </label>
              <br id="demographic-link"/>
              <input id="phone" type="tel" placeholder="802-123-4567" />
              <br />
            </div>
            {this.displayDemographicContent()}
            {this.displayIncidentAndOrder()}
            <hr id="communication-link"/>
            <h3 id="ongoing-services">Ongoing Services</h3>
            <label htmlFor="safe-to-call">Safe to call back?</label>
            <div id="safe-to-call">
              <input name="safe-to-call" value="Yes" type="radio" />
              Yes
              <br />
              <input name="safe-to-call" value="No" type="radio" />
              No
              <br />
              <input name="safe-to-call" value="Unknown" type="radio" />
              Unknown
            </div>
            <br />
            <label htmlFor="safe-to-leave-message">
              Safe to leave a message?
            </label>
            <div id="safe-to-leave-message">
              <input name="safe-to-leave-message" value="Yes" type="radio" />Yes
              <br />
              <input name="safe-to-leave-message" value="No" type="radio" />No
              <br />
              <input name="safe-to-leave-message" value="Unknown" type="radio"/>Unknown
            </div>
            <br />
            <label htmlFor="contact">Contact</label>
            <br />
            <label htmlFor="contact">
              (indicate the number of contacts through each method per day)
            </label>
            <div id="contact">
              <label>
                <input id="contact-calls" type="number" />
                Calls with Service User
              </label>
              <br />
              <label>
                <input id="contact-in-person" type="number" />
                In-person with Service User
              </label>
              <br />
              <label>
                <input id="contact-email" type="number" />
                Email
              </label>
              <br />
              <label>
                <input id="contact-instant-messaging" type="number" />
                Instant Messaging
              </label>
              <br />
              <label>
                <input id="contact-on-behalf" type="number" />
                On Behalf of Service User
              </label>
            </div>
            <br />
            <div id="time-call">
              Total time spent
              <br />
            </div>
            <div id="time-call">
              <label>
                <input name="time-call" value="15 min" type="radio" />
                15 min
              </label>
              <br />
              <label>
                <input name="time-call" value="30 min" type="radio" />
                30 min
              </label>
              <br />
              <label>
                <input name="time-call" value="45 min" type="radio" />
                45 min
              </label>
              <br />
              <label id="services-link">
                <input name="time-call" value="60 min" type="radio" />
                60 min
              </label>
              <br />
              {this.displayOtherTimeSpent()}
            </div>
            <hr id="services-provided"/>
            <h3>Services Provided</h3>
            <label htmlFor="advocacy">Advocacy</label>
            <div id="advocacy">
              <input type="checkbox" name="advocacy" value="Economic" />
              Economic
              <br />
              <input type="checkbox" name="advocacy" value="Financial" />
              Financial
              <br />
              <input type="checkbox" name="advocacy" value="Housing" />
              Housing
              <br />
              <input type="checkbox" name="advocacy" value="Education" />
              Education
              <br />
              <input type="checkbox" name="advocacy" value="Employment" />
              Employment
              <br />
              <input type="checkbox" name="advocacy" value="Immigration" />
              Immigrantion
              <br />
              <input type="checkbox" name="advocacy" value="Healthcare" />
              Healthcare
              <br />
              {this.displayOtherAdvocacyButton()}
              <br />
            </div>
            <label htmlFor="support">Support</label>
            <div id="support">
              <input type="checkbox" name="support" value="Emotional" />
              Emotional
              <br />
              <input type="checkbox" name="support" value="Crisis" />
              Crisis
              <br />
              <input type="checkbox" name="support" value="Criminal Legal" />
              Criminal Legal
              <br />
              {this.displayOtherSupportButton()}
              <br />
            </div>
            <div>
              <label htmlFor="Medical">Medical</label>
              <div id="medical" />
              <input
                type="checkbox"
                name="medical"
                value="SANE Exam Accompaniment"
              />
              SANE Exam Accompaniment
              <br />
              <br />
            </div>
            <label htmlFor="assistance-services">Assistance/Services</label>
            <div id="assistance-services">
              {this.displayVictimsClaim()}
              <input
                type="checkbox"
                name="assistance-services"
                value="Language"
              />
              Language
              <br />
              <input
                type="checkbox"
                name="assistance-services"
                value="Transporation"
              />
              Transporation
              <br />
              {this.displayMaterialAssistance()}
              <br/>
            </div>
            <label htmlFor="information-referral">Information and Referral</label>
            <div id="information-referral">
              <input
                type="checkbox"
                name="information-referral"
                value="Information"
              />
              Information
              <br />
              {this.displayReferralBox()}
              <br />
              <br />
            </div>
            <label htmlFor="safe-home">Safe Home</label>
            <div id="safe-home">
              Date Entered
              <br />
              <input id="safe-home-entered" type="date" name="safe-home" className="input" />  ​​​​​​​​​​​​​​​​​​​​​​​​
              <br />
              Date Exited
              <br />
              <input id="safe-home-exited" type="date" name="safe-home" className="input" />
              ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
              <br />
              Extention Date
              <br />
              <input id="safe-home-extension" type="date" name="safe-home" className="input" />​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
              <br />
              <br />
            </div>
            <label htmlFor="groups">Groups</label>
            <div id="groups-div">
              Groups:
              <input id="groups" type="text" name="groups" className="inline-input" />
              <br />
              <br />
            </div>
            <hr id="referrals-hr"/>
            {this.displayReferrals()}
            <h3>Outcome Measures</h3>
            <div id="measures">
              <label htmlFor="plan-for-safety">
                Service User knows more ways to plan for their safety
              </label>
              <div id="plan-for-safety">
                <label>
                  <input name="plan-for-safety" value="Yes" type="radio" />
                  Yes
                </label>
                <br />
                <label>
                  <input name="plan-for-safety" value="No" type="radio" />
                  No
                </label>
                <br />
                <label>
                  <input name="plan-for-safety" value="N/A" type="radio" />
                  N/A
                </label>
              </div>
              <br />
              <label htmlFor="community-resources">
                Service User knows more about community resources
              </label>
              <div id="community-resources">
                <label>
                  <input name="community-resources" value="Yes" type="radio" />
                  Yes
                </label>
                <br />
                <label>
                  <input name="community-resources" value="No" type="radio" />
                  No
                </label>
                <br />
                <label>
                  <input name="community-resources" value="N/A" type="radio" />
                  N/A
                </label>
              </div>
              <br />
              <label htmlFor="rights-options">
                Service User knows more about their rights and options
              </label>
              <div id="rights-options">
                <label>
                  <input name="rights-options" value="Yes" type="radio" />
                  Yes
                </label>
                <br />
                <label>
                  <input name="rights-options" value="No" type="radio" />
                  No
                </label>
                <br />
                <label>
                  <input name="rights-options" value="N/A" type="radio" />
                  N/A
                </label>
              </div>
              <hr />
            </div>
          </div>
          <h4>{this.state.errorMessage}</h4>
          <button onClick={this.handleSubmit}>submit</button>
        </form>
      </div>
    );
  }
}

function radioButtonValue(name) {
  let theButtons = document.getElementsByName(name);
  for (let i = 0; i < theButtons.length; i++) {
    if (theButtons[i].checked) {
      if (theButtons[i].value === "Other") {
        return "Other: " + theButtons[i + 1].value;
      } else if (theButtons[i].type === "radio") {
        return theButtons[i].value;
      }
    }
  }
}

function checkBoxValues(name) {
  let theBoxes = document.getElementsByName(name);
  let checkedBoxes = [];
  for (let i = 0; i < theBoxes.length; i++) {
    if (theBoxes[i].checked) {
      if (theBoxes[i + 1] && (theBoxes[i + 1].type === "text" || theBoxes[i + 1].type === "date" || theBoxes[i + 1].type === "number")) {
        checkedBoxes.push(theBoxes[i].value + ": " + theBoxes[i + 1].value);
      } else if (theBoxes[i].type === "checkbox") {
        checkedBoxes.push(theBoxes[i].value);
      }
    }
  }
  return checkedBoxes;
}

function referralValues(name) {
  let theInputs = document.getElementsByName(name);
  let finalValues = [];
  for (let i = 0; i < theInputs.length; i++) {
    if (theInputs[i].checked) {
      if (theInputs[i + 1].type === "text") {
        finalValues.push(theInputs[i].value + ": " + theInputs[i + 1].value);
      } else if (theInputs[i + 2].type === "text") {
        finalValues.push(theInputs[i].value + ": " + theInputs[i + 2].value);
      } else if (theInputs[i].type === "checkbox") {
        finalValues.push(theInputs[i].value);
      }
    }
  }
  return finalValues;
}

function getIncidents (num) {
  let theIncidents = [];
  let i = 1;
  let incidentObject = {};
  while (i <= num) {
    incidentObject = {
      victimization: checkBoxValues("victimization-" + i),
      perpRelationship: checkBoxValues("perp-relationship-" + i),
      perpGender: document.getElementById("perp-gender-" + i).value
    };
    theIncidents.push(incidentObject);
    i++;
  }
  return theIncidents;
}

function getOrders (num) {
  let theOrders = [];
  let i = 1;
  let orderObject = {};
  while (i <= num) {
    orderObject = {
      length: radioButtonValue("order-length-" + i),
      type: radioButtonValue("order-type-" + i),
      granted: radioButtonValue("order-granted-" + i)
    };
    theOrders.push(orderObject);
    i++;
  }
  return theOrders;
}

export default Form;
