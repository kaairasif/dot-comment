import { useReducer } from "react"

export const UseReducerSimple = () => {

    const [checked, toggle] = useReducer((checked) => !checked, false)

    return (
        <>
            <input type="checkbox"
              value={checked}
              onChange={toggle}
            />

            {checked ? "Checked" : "Not Checked"}
        </>
    )
}