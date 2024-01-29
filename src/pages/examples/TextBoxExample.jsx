import React, { useEffect, useState } from "react";
import { ALLOW_NUMERIC } from "../../services/PatternSerivce";
import { isEmptyObject } from "../../services/core/CommonService";
import SmartCodeDisplay from "../../components/core/general/SmartCodeDisplay";
import { SmartSoftInput, SmartSoftButton } from "soft_digi";

const TextBoxExample = () => {
  const [formData, setFormData] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState(false);
  const [type, setType] = useState("password");

  const handleInputChange = (name, value) => {
    //console.log(" name " ,name , "   value " , value)
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleErrorChange = (name, value) => {
    setFormErrors((prev) => {
      // Create a copy of the previous state
      const updatedFormData = { ...prev };
      // Check if the value is null or empty
      if (value === null || value === '') {
        // If true, remove the property from the updated state
        delete updatedFormData[name];
      } else {
        // Otherwise, update or add the property in the updated state
        updatedFormData[name] = value;
      }

      return updatedFormData;
    });
  };

  const onBlur = (value) => {
    const timeoutId = setTimeout(() => {
      // Update the value using the previous state
      handleInputChange("input_three", 30)
    }, 2000);
    // Clean up the timeout when the component unmounts or when the value is updated
    return () => clearTimeout(timeoutId);
  }

  const numericValidations = [
    {
      type: "required",
      msg: "Numeric Value is Required"
    },
    {
      type: "pattern",
      msg: "Please Enter Correct Numeric Value",
      pattern: '[0-9]+'
    }
  ];

  const handleFormSubmit = () => {
    setFormSubmit(true);
    console.log("form errors ", formErrors);
  }

  const passwordRightIcon = (value) => {
    const updateText = () => {
      console.log("type updatioen clicked")
      setType("text")
    }
    return <span onClick={() => updateText()} className="icon is-small is-right"> <i className="fa fa-lock" ></i> </span>
  }

  const inputBorderLess = () => {
    const codeSyntax = `
    <SmartSoftInput key="text-2" 
    label="test" 
    value={formData?.input_two || ""} 
    onChange={(value) => handleInputChange("input_two", value)}  
    inputType="BORDER_LESS"/>`;
    return <div className="columns is-multiline card box">
        <div className="column is-12 smart-title"> Text Box Border Less </div>
        <div className="column is-6 box p-3">
          <SmartSoftInput key="text-2" label="test"
            value={formData?.input_two || ""}
            onChange={(value) => handleInputChange("input_two", value)}
            inputType="BORDER_LESS"
          />
          <p className="Smart-example-hint"> formData : is a statevariable and HandleIntputChange is a
            function to update the state variable. Please go through the section of form examples for more clarity</p>
        </div>
        <div className="column is-6">
          <SmartCodeDisplay type="js" data={codeSyntax} />
        </div>
      </div>  
  }



  const inputWithIconValidation = () => {
    return (
      <div className="card">
        <SmartSoftInput key="text-1" label="test"
          value={formData?.input_one || ""}
          onChange={(value) => handleInputChange("input_one", value)}
          type={type}
          min={1}
          max={5}
          pattern={ALLOW_NUMERIC}
          inputProps={{ isFocussed: true }}
          onBlur={onBlur}
          leftIcon="fa-user"
          rightIconFunction={() => passwordRightIcon()}
          validations={numericValidations}
          errorEnable={true}
          errorUpdate={(error) => handleErrorChange("input_one", error)}
        />

        <SmartSoftInput key="text-2" label="test"
          value={formData?.input_two || ""}
          onChange={(value) => handleInputChange("input_two", value)}
          inputType="BORDER_LESS"
        />

        <SmartSoftInput key="text-3" label="test"
          value={formData?.input_three || ""}
          onChange={(value) => handleInputChange("input_three", value)}
          inputType="BORDER_LABEL"
          inputProps={{ isFocussed: true }}
        />

        <SmartSoftInput key="text-4" label="Enter Employee Name"
          value={formData?.input_four || ""}
          onChange={(value) => handleInputChange("input_four", value)}
          inputType="BORDER_LABEL_FOCUS"
          leftIcon="fa-user"
          inputProps={{ isFocussed: true }}
        />

        <SmartSoftInput key="text-4" label="Enter Employee Name testing"
          value={formData?.input_five || ""}
          onChange={(value) => handleInputChange("input_five", value)}
          inputType="BORDER_LABEL_FOCUS"
          leftIcon="fa-user"
          inputProps={{ isFocussed: true }}
        />


        <SmartSoftButton label="submit" classList={["is-primary", "is-small", 'is-inverted']}
          onClick={() => handleFormSubmit()}
          disabled={!isEmptyObject(formErrors)}
        />
      </div>
    )
  }

  return (
    <>
      <div className="">
        {inputBorderLess()}
      </div>
    </>
  )
}

export default TextBoxExample