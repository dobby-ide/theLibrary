// @ts-nocheck
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../store'
import { authorActions } from '../../../redux/slices/authorSlice'
import { bookActions } from '../../../redux/slices/bookSlice'
import { updateAuthorToServer } from '../../../redux/slices/authorSlice'

const UpdateAuthorModal = (props: { exit: () => void; authorId: string }) => {
  const [authorName, setAuthorName] = useState('')
  const dispatch = useDispatch()
  const author = useSelector((state: RootState) =>
    state.author.Authors.filter((author) => String(author.id) === props.authorId)
  )

  const exitModal = () => {
    props.exit()
  }

  const textChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthorName(e.target.value)
  }

  const onUpdateAuthorHandler = () => {
    dispatch(
      updateAuthorToServer({
        endpoint: `authors/${props.authorId}`,
        updatedAuthor: { authorName: authorName }
      })
    )
    dispatch(authorActions.updateAuthor({ name: authorName, index: props.authorId }))
    dispatch(
      bookActions.updateAllBooksWithAuthor({ oldAuthor: props.authorId, newAuthor: authorName })
    )
    props.exit()
  }
  console.log(author)
  return (
    <div>
      <div>
        <label htmlFor="">name and surname</label>
        <input
          type="text"
          onChange={(e) => textChangeHandler(e)}
          placeholder={author[0].authorName}
        />
      </div>
      <button onClick={exitModal}>cancel</button>
      <button onClick={onUpdateAuthorHandler}>update</button>
    </div>
  )
}
export default UpdateAuthorModal
