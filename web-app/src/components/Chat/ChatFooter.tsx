
import { FC, useState, useEffect, FormEvent } from 'react'
import styles from '@/components/Chat/Chat.module.scss'
import { ButtonTypes } from '@/types/commonTypes'
import { addDoc, collection, serverTimestamp, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/config/firebase'

const ChatFooter: FC = () => {
  const [ message, setMessage ] = useState('')
  const [ newMessages, setNewMessages ] = useState<any[]>([])
  
  const messagesRef = collection(db, 'messages')
  
  useEffect(() => {
    const queryMessages = query(messagesRef, where('room','==', 1))

    onSnapshot(queryMessages, (snapshot) => {
      let messages: any[] = []
      
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id })
      })

      setNewMessages(messages)
    })
  }, [])

  useEffect(() => {
    console.log(newMessages)
  })
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    if (message.trim() === '') {
      return
    }

    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
      user: 'Test',
      room: 1,
      avatar: 'qwqwq',
      user_id: '1'
    })

    setMessage('')
  }
  
  return (
    <form 
      className={styles.footer}
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <div className={styles.field}>
        <input
          className={styles.inp}
          type='text'
          name='message'
          placeholder='Suggest'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button 
          className={`${styles.btn} icon`} 
          type={ButtonTypes.Submit}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.40221 6.67292C3.14221 4.33892 5.54521 2.62492 7.66821 3.63092L19.6122 9.28892C21.9002 10.3719 21.9002 13.6279 19.6122 14.7109L7.66821 20.3699C5.54521 21.3759 3.14321 19.6619 3.40221 17.3279L3.88221 12.9999H12.0002C12.2654 12.9999 12.5198 12.8946 12.7073 12.707C12.8949 12.5195 13.0002 12.2651 13.0002 11.9999C13.0002 11.7347 12.8949 11.4803 12.7073 11.2928C12.5198 11.1053 12.2654 10.9999 12.0002 10.9999H3.88321L3.40321 6.67292H3.40221Z" fill="url(#paint0_linear_5929_2823)"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.40221 6.67292C3.14221 4.33892 5.54521 2.62492 7.66821 3.63092L19.6122 9.28892C21.9002 10.3719 21.9002 13.6279 19.6122 14.7109L7.66821 20.3699C5.54521 21.3759 3.14321 19.6619 3.40221 17.3279L3.88221 12.9999H12.0002C12.2654 12.9999 12.5198 12.8946 12.7073 12.707C12.8949 12.5195 13.0002 12.2651 13.0002 11.9999C13.0002 11.7347 12.8949 11.4803 12.7073 11.2928C12.5198 11.1053 12.2654 10.9999 12.0002 10.9999H3.88321L3.40321 6.67292H3.40221Z" fill="url(#paint0_linear_5929_2824)"/>
            <defs>
              <linearGradient id="paint0_linear_5929_2823" x1="12.3555" y1="3.33691" x2="12.3555" y2="20.6639" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFCB52"/>
                <stop offset="1" stop-color="#FF7B02"/>
              </linearGradient>
              <linearGradient id="paint0_linear_5929_2824" x1="12.3555" y1="3.33691" x2="12.3555" y2="20.6639" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FF7B02"/>
                <stop offset="1" stop-color="#FFCB52"/>
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>
    </form>
  )
}

export default ChatFooter