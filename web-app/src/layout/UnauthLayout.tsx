import { FC, useEffect } from 'react'
import PageWrapper from '@/layout/PageWrapper'
import PageContainer from '@/layout/PageContainer'
import Modal from '@/components/UI/Modal/Modal'
import Success from '@/components/Success/Success'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { setAuth, setAuthError } from '@/store/reducers/profileReducer'
import { ChildProp } from '@/types/commonTypes'

const UnauthLayout: FC<ChildProp> = ({ children }) => {
  const dispatch = useTypedDispatch()
  const { isAuthError, authErrorText } = useTypedSelector(state => state.profile)

  useEffect(() => {
    dispatch(setAuth(false))
  }, [])
  
  return (
    <PageWrapper className='no-pad'>
      <Modal
        isOpen={isAuthError}
        setOpen={setAuthError}
        centered
        fullscreen
      >
        <Success title={authErrorText} />
      </Modal>
      <PageContainer>
        {children}
      </PageContainer>
    </PageWrapper>
  )
}

export default UnauthLayout