import { ChangeEventHandler, FC, useState } from "react"
import { useDispatch } from "react-redux"
import { BsEye } from "react-icons/bs"

import { Author } from "../../types/author"
import ConfirmModal from "../confirm-modal/ConfirmModal"
import { updateAuthorActivity } from "../../actions/authors"
import BooksListModal from "../books-list-modal/BooksListModal"
import { toastError } from "../../utils/error"

const AuthorTableRow: FC<Author> = ({ id, picture, name, country, age, isActive }) => {
  const dispatch = useDispatch<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isBooksModalOpen, setIsBooksModalOpen] = useState<boolean>(false)
  const [activityChanges, setActivityChanges] = useState<{isChanging: boolean, requestedValue: boolean | null}>({
    isChanging: false,
    requestedValue: null,
  })

  const openConfirmModal: ChangeEventHandler<HTMLInputElement> = (e) => {
    setActivityChanges({
      isChanging: true,
      requestedValue: e.target.checked,
    })
  }

  const closeConfirmModal = () => {
    setActivityChanges({
      isChanging: false,
      requestedValue: null,
    })
  }

  const changeActivity = async () => {
    try {
      setIsLoading(true)
      await dispatch(updateAuthorActivity(id, activityChanges.requestedValue))
    } catch (error) {
      toastError(error)
    }
    setIsLoading(false)
  }

  return (
    <>
      <tr key={id}>
        <td>
          <img src={picture} alt={`${name}'s picture`} />
        </td>
        <td>{name}</td>
        <td>
          <BsEye onClick={() => setIsBooksModalOpen(true)} className='eye-icon' />
        </td>
        <td>{country}</td>
        <td>{age}</td>
        <td>
          {isLoading ? 
            <img className='loading-spinner' src='/loading.svg' alt='Loading spinner' />
           : 
            <input  onChange={openConfirmModal}  type='checkbox' checked={isActive}  />
          }
        </td>
      </tr>
      <ConfirmModal
        isOpen={activityChanges.isChanging}
        onCofirm={changeActivity}
        onClose={closeConfirmModal}
      />
      <BooksListModal
        authorId={id}
        isOpen={isBooksModalOpen}
        onClose={() => setIsBooksModalOpen(false)}
      />
    </>
  )
}

export default AuthorTableRow
