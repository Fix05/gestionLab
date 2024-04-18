/* When using events which needs a fetch to be done for extracting updated
data it's necessary to pass the paramters (like data or url with some params)
directly with the doFetch function instead of defining the data and the url 
in the calling of useFetch hook, because setting a data or the url state is
an asynchronous event.


*/


import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'

const useFetch = (url, data, method, shouldFetch = true) => {

  var POST_PUT

  const navigate = useNavigate()
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const errorCodes = {
    402: "Debe de completar todos los campos",
    401: "Correo o contraseña incorrectos, por favor inténtelo de nuevo",
    403: "Empleado no encontrado",
    407: "No hay registros aún"
  }

  const doFetch = async (inFunctionData, inFnctionUrlParams) => {

    inFunctionData ? data = inFunctionData : null
    inFnctionUrlParams ? url = url + inFnctionUrlParams : null
  
    var options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      }
    };
    if (method === "POST" || method === "PUT") {
      options.body = JSON.stringify(data);
    }

    setLoading(true)
    if (url && !url.includes("undefined")) {
      if (!("body" in options) || Object.keys(data).length) {
        console.log(url);
        const response = await fetch(url, options)
        const jsonResponse = await response.json()
        if (jsonResponse && jsonResponse.status_code) {
          jsonResponse.message = errorCodes[jsonResponse.status_code];
          if (jsonResponse.status_code == 403) {
            console.log("error", url);
            navigate("/Error")
          }
        }
        setResult(jsonResponse)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    shouldFetch ? doFetch() : null;
  }, [url, data, method])

  return [result, doFetch, error, loading]
}

export default useFetch;