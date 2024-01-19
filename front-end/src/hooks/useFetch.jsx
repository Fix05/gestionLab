import { useState } from "react";

const useFetch = (data, method, url) =>{

    const [result, setResult] = useState({})
    const errorCodes = {
      402 : "Debe de completar todos los campos",
      401: "Correo o contraseña incorrectos, por favor inténtelo de nuevo"
    }
  
    const getResult = (event) => {
      event.preventDefault();
      const options = {
        method: `${method}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
      };
  
      const doFetch = async (options, url) => {
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data);
        data.status_code ? data.message = errorCodes[data.status_code] : null;
        console.log(data);
        setResult(data)
      }
      doFetch(options, url)
    }
    return {
      result,
      getResult
    }
  }

  export default useFetch;