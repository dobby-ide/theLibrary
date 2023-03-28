import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { authorActions, RootState } from '../../../store'

const UpdateAuthorModal: React.FC = ({ exit, name }) => {

  const [authorName, setAuthorName] = useState('')
  const dispatch = useDispatch()
  const author = useSelector((state: RootState) =>
    state.author.Authors.filter((author) => String(author.name) === name)
  )
  const authors = useSelector((state: RootState) => state.author.Authors)

  const exitModal = () => {
    exit()
  }

  const textChangeHandler = (e) => {
    setAuthorName(e.target.value)
  }

  const onUpdateAuthorHandler = () => {
    dispatch(authorActions.updateAuthor({ name: authorName, index: name }))
    exit()
  }

  return (
    <div>
      <div>
        <label htmlFor="">name and surname</label>
        <input type="text" onChange={(e) => textChangeHandler(e)} placeholder={author[0].name} />
      </div>
      <button onClick={exitModal}>cancel</button>
      <button onClick={onUpdateAuthorHandler}>update</button>
    </div>
  )
}
export default UpdateAuthorModal
