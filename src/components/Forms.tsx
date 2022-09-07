import React from "react";
import ContactDetails from "./ContactDetails/Index";
import PersonalDetails from "./PersonalDetails/Index";
const Forms = ({ type}: any) => {
	if (type === "ContactDetails") 
		return <ContactDetails />
	if (type === "PersonalDetails")
	    return <PersonalDetails />;
    return <></>
};

export default Forms;
