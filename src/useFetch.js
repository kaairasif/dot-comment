import { useState, useEffect } from "react"
import axios from "axios"
export const useFetch = (uri) => {
  const [data, setData] = useState()
  const [loading, setLoaing] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {

    (async () => {
        if(!uri) return

        await fetch(uri)
        .then((res) => res.json())
        .then((res) => setData(res))
        .then(() => setLoaing(false))
        .catch(setError)

    })()

  }, [uri])

  return { loading, data, error }

}

