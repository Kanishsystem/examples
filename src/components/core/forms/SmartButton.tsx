import React, { useEffect, useState } from 'react';
import { validateInput } from '../../../services/smartValidationService';

interface SmartButtonProps {
    label?: string;   
    classList?: string[],   
    disabled?: boolean,
    leftIcon?: string,
    leftIconFunction?: () => any,
    rightIcon?: string,
    rightIconFunction?: () => any,
    disabledFunction?: (value: string) => boolean,
    onClick:()=>void 
}

const SmartButton: React.FC<SmartButtonProps> = (props) => {

    const { 
        label,        
        leftIcon, 
        leftIconFunction,
        rightIcon, 
        rightIconFunction,
        classList,
        disabled,
        disabledFunction,
        onClick
    } = props;



    // useEffect will be triggered whenever prop changes
    useEffect(() => {
        //
    }, [props]);


    const handleChange = () => {
        if(onClick) {
            onClick();
        }
    }

    /**
     *  label display function
     * 
     * @returns 
     */
    const labelDisplay = () => {
        if (label) {
            return <span>{label}</span>
        }
    }



    const leftIconDisplay = () => {
        if (leftIcon) {
            return <span className="icon"> <i className={"fa " + leftIcon} /> </span>
        } else if (leftIconFunction) {
            return leftIconFunction();
        }
    }

    const rightIconDisplay = () => {
        if (rightIcon) {
            return <span className="icon"> <i className={"fa " + rightIcon} /> </span>
        } else if (rightIconFunction) {
            return rightIconFunction();
        }
    }




    const buttonClasses = () => {
        let classes = ["button"];
        if (classList) {
            classes = [...classes, ...classList];
        }
       
     
        return classes;
    }

    const disabled_input = () => {
        //  console.log("disabled input " );
        if (disabled) {
            return disabled;
        }
        if (disabledFunction) {
            // console.log("disabled or not ", inputProps.disabledFunction("test"))
            return disabledFunction("test");
        }

        return false;
    }



    return (
        <button 
        className={buttonClasses().join(" ")}
        disabled={disabled_input()}
        onClick={()=>handleChange()}
        >
            {leftIconDisplay()}
            {labelDisplay()}
            {rightIconDisplay()}
        </button>
    );
};

export default SmartButton;