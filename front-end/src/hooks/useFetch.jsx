/* When using events which needs a fetch to be done for extracting updated
data it's necessary to pass the paramters (like data or url with some params)
directly with the doFetch function instead of defining the data and the url 
in the calling of useFetch hook, because setting a data or the url state is
an asynchronous event.


*/


import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from 'react-router-dom'

const useFetch = (url, data, method, shouldFetch = true) => {

  var POST_PUT

  const navigate = useNavigate()
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const errorCodes = {
    402: "Debe de completar todos los campos",
    401: "Correo o contraseña incorrectos, por favor inténtelo de nuevo",
    403: "Empleado no encontrado",
    406: "Item no encontrado",
    407: "No hay registros aún",
    410: "Este empleado ya tiene ausencias registradas para el rango de días escogido"
  }

  

  method == "PUT" ? console.log("Se renderizó el componente, el valor de loading es:", loading): null

  const doFetch = async (inFunctionData, inFnctionUrl) => {

    try {

      inFunctionData ? data = inFunctionData : null
      inFnctionUrl ? url = inFnctionUrl : null

      const isFormData = data instanceof FormData

      var options = {
        method: method,
        headers: !isFormData ? { "Content-Type": "application/json" } : {}
      };
      if ((method === "POST" || method === "PUT") && data) {
        options.body = data instanceof FormData ? data : JSON.stringify(data);
      }

      console.log("Se va a setear loading en true, actualmente está en:", loading);
      setLoading(true)
      
      /* setError(null) */


      if (url && !url.includes("undefined")) {
        if (!("body" in options) || Object.keys(data).length || data instanceof FormData) {
          const response = await fetch(url, options)
          const jsonResponse = await response.json()

          if (!response.ok) {
            throw new Error(jsonResponse.message || "An unknown error occurred");
          }

          if (jsonResponse && jsonResponse.status_code && errorCodes[jsonResponse.status_code]) {
            jsonResponse.message = errorCodes[jsonResponse.status_code];
            setError(jsonResponse.message)
            if (jsonResponse.status_code == 403) {
              navigate("/Error")
            }
          }
          console.log("Se va a setear el result el valor de loading es", loading);
          setResult(jsonResponse)

          return jsonResponse
        }
      }
    } catch (error) {
      setError(error.message);
      console.error('Fetch error:', error);

    } finally {
      console.log("Se ejecuto el finally");
      setLoading(false)
      /* setTimeout(() => {
        setLoading((prev) => {
          console.log("Pasaron 2 segundos el valor anterior es:", prev, "Se va a cambiar a false")
          return false
        })
      }, 2000) */
    }
  }

  useEffect(() => { console.log("loading ha cambiado a:", loading); }, [loading])

  useEffect(() => {
    shouldFetch ? doFetch() : null;
  }, [url, data, method])

  return [result, doFetch, error, loading]
}

export default useFetch;