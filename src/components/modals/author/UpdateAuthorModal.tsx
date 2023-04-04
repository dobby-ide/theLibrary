import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../store'
import { authorActions } from '../../../redux/slices/authorSlice'

const UpdateAuthorModal = (props: { exit: () => void; name: string }) => {
  const [authorName, setAuthorName] = useState('')
  const dispatch = useDispatch()
  const author = useSelector((state: RootState) =>
    state.author.Authors.filter((author) => String(author.name) === props.name)
  )

  const exitModal = () => {
    props.exit()
  }

  const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthorName(e.target.value)
  }

  const onUpdateAuthorHandler = () => {
    dispatch(authorActions.updateAuthor({ name: authorName, index: props.name }))
    props.exit()
  }
  console.log(author[0])
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
