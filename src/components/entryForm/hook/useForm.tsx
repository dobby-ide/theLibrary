import { useReducer } from 'react'

function formReducer(state, action) {
  switch (action.type) {
    case 'set_value':
      return { ...state, [action.payload.name]: action.payload.value }
    default:
      return state
  }
}

function useForm(initialState) {
  const [state, dispatch] = useReducer(formReducer, initialState)

  const handleChange = (event) => {
    const { name, value } = event.target
    dispatch({ type: 'set_value', payload: { name, value } })
  }

  const reset = () => {
    dispatch({ type: 'reset', payload: initialState })
  }

  return [state, handleChange, reset]
}
export default useForm
