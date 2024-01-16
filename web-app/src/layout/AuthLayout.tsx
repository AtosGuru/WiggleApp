import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ChildProp } from '@/types/commonTypes'
import PageWrapper from '@/layout/PageWrapper'
import PageContainer from '@/layout/PageContainer'
import Sidebar from '@/components/Sidebar/Sidebar'
import Modal from '@/components/UI/Modal/Modal'
import CreateEventGeneral from '@/components/CreateEvent/CreateEventGeneral'
import CreateEventNew from '@/components/CreateEvent/CreateEventNew'
import CreateEventTemplate from '@/components/CreateEvent/CreateEventTemplate'
import AddSchedule from '@/components/AddSchedule/AddSchedule'
import Select from '@/components/Select/Select'
import Success from '@/components/Success/Success'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useTypedDispatch } from '@/hooks/useTypedDispatch'
import { 
  setCreateEventModal, 
  setCreateEventNewModal, 
  setCreateEventTemplateModal,
  setInfoModalOpen
} from '@/store/reducers/eventsReducer'
import { 
  setAddModalOpen,
  setRemoveModalOpen, 
  setLogoutModal,
  setAuth
} from '@/store/reducers/profileReducer'
import { setNotificationNewModalOpen, setSelectModalOpen, setSuccessModalOpen } from '@/store/reducers/notificationsReducer'
import RemoveSchedule from '@/components/RemoveSchedule/RemoveSchedule'
import NotificationsSendNew from '@/components/NotificationsSend/NotificationsSendNew'
import InfoEvent from '@/components/InfoEvent/InfoEvent'
import Greet from '@/components/Greet/Greet'
import { sendNonificationsAsync } from '@/store/actions/sendNotificationsAsync'
import { openNewEventType, openTemplateEventType } from '@/store/actions/selectEventTypeAsync'
import { signOutAsync } from '@/store/actions/signOutAsync'

const AuthLayout: FC<ChildProp> = ({ children }) => {
  const dispatch = useTypedDispatch()
  const router = useRouter()

  const {
    isCreateEventModalOpen, 
    isCreateEventNewModalOpen, 
    isCreateEventTemplateModalOpen,
    isInfoModalOpen
  } = useTypedSelector(state => state.events)
  const {
    isOpenGreet,
    isAddModalOpen,
    isRemoveModalOpen,
    isLogoutModalOpen
  } = useTypedSelector(state => state.profile)
  const { 
    isNotificationNewModalOpen,
    isSelectModalOpen,
    isSuccessModalOpen
  } = useTypedSelector(state => state.notifications)

  const createNewEventHandler = () => {
    dispatch(openNewEventType())
  }

  const createTemplateEventHandler = () => {
    dispatch(openTemplateEventType())
  }

  const positiveLogoutHandle = async () => {
    const redirectUrl = await dispatch(signOutAsync())

    if (redirectUrl) {
      router.push(redirectUrl)
    }
  }

  const negativeLogoutHandle = () => {
    dispatch(setLogoutModal(false))
  }

  const positiveNotificationsHandle = () => {
    dispatch(sendNonificationsAsync())
  }

  const negativeNotificationsHandle = () => {
    dispatch(setSelectModalOpen(false))
  }

  useEffect(() => {
    dispatch(setAuth(true))
  }, [])

  return (
    <PageWrapper>
      { isOpenGreet && <Greet /> }
      <Modal 
        isOpen={isCreateEventModalOpen}
        setOpen={setCreateEventModal}
      >
        <CreateEventGeneral 
          createNewHandler={createNewEventHandler}
          createTemplateHandler={createTemplateEventHandler}
        />
      </Modal>
      <Modal 
        isOpen={isCreateEventNewModalOpen}
        setOpen={setCreateEventNewModal}
      >
        <CreateEventNew />
      </Modal>
      <Modal 
        isOpen={isCreateEventTemplateModalOpen}
        setOpen={setCreateEventTemplateModal}
      >
        <CreateEventTemplate />
      </Modal>
      <Modal
        isOpen={isInfoModalOpen}
        setOpen={setInfoModalOpen}
      >
        <InfoEvent />  
      </Modal>
      <Modal 
        isOpen={isAddModalOpen}
        setOpen={setAddModalOpen}
        centered
      >
        <AddSchedule />
      </Modal>
      <Modal 
        isOpen={isRemoveModalOpen}
        setOpen={setRemoveModalOpen}
        centered
      >
        <RemoveSchedule />
      </Modal>
      <Modal
        isOpen={isNotificationNewModalOpen}
        setOpen={setNotificationNewModalOpen}
      >
        <NotificationsSendNew />
      </Modal>
      <Modal 
        isOpen={isLogoutModalOpen}
        setOpen={setLogoutModal}
        centered
      >
        <Select
          title='Are you sure you want to logout?'
          positiveHandle={positiveLogoutHandle}
          negativeHandle={negativeLogoutHandle}
        />
      </Modal>
      <Modal 
        isOpen={isSelectModalOpen}
        setOpen={setSelectModalOpen}
        centered
      >
        <Select
          title='Do you want to send this notification ?'
          positiveHandle={positiveNotificationsHandle}
          negativeHandle={negativeNotificationsHandle}
        />
      </Modal>
      <Modal 
        isOpen={isSuccessModalOpen}
        setOpen={setSuccessModalOpen}
        centered
      >
        <Success title='Notification Sent' />
      </Modal>
      <Sidebar 
        isOpen={[
          isOpenGreet,
          isCreateEventModalOpen, 
          isCreateEventNewModalOpen, 
          isCreateEventTemplateModalOpen, 
          isAddModalOpen,
          isRemoveModalOpen,
          isLogoutModalOpen,
          isInfoModalOpen,
          isNotificationNewModalOpen
        ]}
      />
      <PageContainer>
        {children}
      </PageContainer>
    </PageWrapper>
  )
}

export default AuthLayout