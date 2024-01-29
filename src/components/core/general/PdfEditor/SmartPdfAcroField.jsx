import React, { useState,useEffect } from "react";

const SmartPdfAcroField = ({ pageNumber,pdfFields,setFields }) => {
  // const [itemField, setItemField] = useState(itemField);
  const [fields, setItemFields] = useState(null);
  const [itemIndex, setItemIndex] = useState(null);

  useEffect(() => {
    let smartFields = pdfFields[pageNumber - 1] !== undefined ? pdfFields[pageNumber - 1] : [];
    /*
    let pageFields =
    smartFields["fields"] !== undefined ? smartFields["fields"] : []; 
    */
    setItemFields(smartFields);

  }, [pageNumber]);

  const getDummyItem=()=>{
    return {
      height:"37.4400",
      left:"200.88",
      name:'dummy', 
      rect:[],
      stype:"",
      top: "40",
      type: "/Tx",
      value:"",
      width:"338.64"
    }
  }

  const getStyle=(index)=>{
    let item = fields[index] ? fields[index] : {};
    //console.log("item " , item);
    return {
      left: item?.left + "px",
      top: item?.top + "px",
      width: item?.width + "px",
      height: item?.height + "px",
    };
  }

 

  const render_acro_fields = () => {
    /*
    let smartFields =
       pdfFields[pageNumber - 1] !== undefined ? pdfFields[pageNumber - 1] : [];
    let pageFields =
      smartFields["fields"] !== undefined ? smartFields["fields"] : []; 
      */
    return fields.map((item, index) => (
      <div
        key={index}
        className="smart-pdf-input-boxes"
        style={getStyle(index)}
        onClick={() => setItemIndex(index)}
      ></div>
    ));
  };

  const setItem=()=>{   
    // setItemData(data);

  }

  const handleChange=(name,event)=>{
    let value = event.target.value;
    //setItemData((prev) => ({ ...prev, [name]: value })); 
    setItemFields(prevData => {
      // Create a new array with the updated object
      const updatedData = [...prevData];      
      // Update the specified property of the object at the given index
      updatedData[itemIndex] = {
        ...updatedData[itemIndex],
        [name]: value
      };
      return updatedData;
    });
  }

  const addNewObject = () => {
    // Create a new array with the existing objects and the new object
    setItemFields(prevData => [...prevData, getDummyItem()]);
  };

 const saveFields=()=>{
  setFields(prevData => {
    // Create a new array with the updated object
    const updatedData = [...prevData];  
    const singlePageData = fields;  
    updatedData[pageNumber-1] =  singlePageData   
    return updatedData;
  });
  }



  const renderFields=()=>{
    return (
        <div className="smart-pdf-details">
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Filed Settings</p>
            <button
              className="card-header-icon"
              aria-label="more options"
              onClick={() => setItemIndex(null)}
            >
              <span className="icon">
                <i className="fa fa-close" aria-hidden="true"></i>
              </span>
            </button>
          </header>
          <div className="content">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Text input"
                  value={fields[itemIndex]?.name}
                  onChange={(event)=>handleChange("name",event)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Height</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Text input"
                  value={fields[itemIndex]?.height}
                  onChange={(event)=>handleChange("height",event)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Width</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Text input"
                  value={fields[itemIndex]?.width}
                  onChange={(event)=>handleChange("width",event)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">top</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Text input"
                  value={fields[itemIndex]?.top}
                  onChange={(event)=>handleChange("top",event)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">left</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Text input"
                  value={fields[itemIndex]?.left}
                  onChange={(event)=>handleChange("left",event)}
                />
              </div>
            </div>
            <div>
                <button onClick={saveFields}> Save </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

 



  return (
   <>     
     {fields && render_acro_fields()}
     {itemIndex!==null && renderFields()}
   </>
  );
};

export default SmartPdfAcroField;
