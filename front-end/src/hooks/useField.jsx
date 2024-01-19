import { useState } from "react";

const useField = () => {

    const [field, setField] = useState("")
    const handleChange = (ev) => {
      setField(ev.target.value)
    }
  
    return {
      field,
      handleChange
    }
  }
  

export default useField;