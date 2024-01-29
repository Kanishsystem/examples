
export 
interface SmartSelectProps {
    label?: string;
    value: string;
    isMulti?:boolean,
    isAsync?:boolean,
    isClearable?:boolean
    options:any,
    loadOptionsFunction:(inputValue:any,callBack:any)=>void,
    placeHolder?:string,
    valueFunction?:()=>any,
    onChange: (value: string) => void;
    errorUpdate?:(value:string)=>void; 
    loadMoreOptionsFunction?:(setSelectOptions:any)=>void;  
    type?: string;  
    classList?: string[],
    isHorizontal?: boolean,
    inputProps?: {
        isStatic?: boolean,
        isFocussed?: boolean,
        isLoading?: boolean,
        size?: string,
        disabled?: boolean,
        disabledFunction?: (value: string) => boolean
    }
    disabled?: boolean,
    leftIcon?: string,
    leftIconFunction?: (value: string) => any,
    rightIcon?: string,
    rightIconFunction?: (value: string) => any,
    successMessage?: string,
    validations?:any[],
    errorEnable?:boolean
}

export interface SmartInputProps {
  label?: string;
  value: string;
  placeHolder?:string,
  valueFunction?:()=>any,
  onChange: (value: string) => void;
  errorUpdate?:(value:string)=>void;
  onBlur?:(value:string)=>void;
  type?: string;
  inputType?:"BORDER_LESS" | "BORDER_LABEL" | "NORMAL" | "BORDER_LABEL_FOCUS"
  min?: number;
  max?: number;
  pattern?: string;
  patternFunction?: (value: string) => boolean
  classList?: string[],
  isHorizontal?: boolean,
  inputProps?: {
      isStatic?: boolean,
      isFocussed?: boolean,
      isLoading?: boolean,
      size?: string,
      disabled?: boolean,
      disabledFunction?: (value: string) => boolean
  }
  disabled?: boolean,
  leftIcon?: string,
  leftIconFunction?: (value: string) => any,
  rightIcon?: string,
  rightIconFunction?: (value: string) => any,
  successMessage?: string,
  validations?:any[],
  errorEnable?:boolean
}