// @ts-nocheck
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAuthorToServer } from '../../../redux/slices/authorSlice'
import { RootState } from '../../../store'
import { authorActions } from '../../../redux/slices/authorSlice'
import Author from '../../../model/author'
import { Button } from '@mantine/core'

const NewAuthorModal = ({ closeModal }) => {
  const author = useSelector((state: RootState) => state.author.Authors)
  const dispatch = useDispatch()
  const [inputName, setInputName] = useState('')
  useEffect(() => {}, [author, dispatch])
  const onSubmitNewAuthor = (e) => {
    e.preventDefault()
    dispatch(
      addAuthorToServer({
        endpoint: 'authors',
        newAuthor: {
          authorName: inputName
        }
      })
    )
    dispatch(authorActions.addAuthor(new Author(inputName)))
    closeModal()
  }

  const closingModalHandler = (e) => {
    e.preventDefault()
    closeModal()
  }

  const textChangeHandler = (e) => {
    setInputName(e.target.value)
  }

  return (
    <div>
      <button onClick={closingModalHandler}>X</button>
      <div>
        <label>name and surname</label>
        <input type="text" onChange={(e) => textChangeHandler(e)}></input>
      </div>
      <Button color="black" variant="filled" onClick={onSubmitNewAuthor}>
        OK
      </Button>
    </div>
  )
}
export default NewAuthorModal
