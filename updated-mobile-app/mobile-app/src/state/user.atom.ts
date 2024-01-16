import { atom, selector } from 'recoil'
import { User } from '../types/user.interface'

export const userAtom = atom<User | null>({
  key: 'user',
  default: null
})

export const isRegistrationFinishedSelector = selector<boolean>({
  key: 'FilteredTodoList',
  get: ({ get }) => {
    const user = get(userAtom)

    return user ? user.isRegistrationFinished : false
  },
  set: ({ set, get }, newValue) => {
    const user = get(userAtom)

    if (!user) return

    set(userAtom, {
      ...user,
      isRegistrationFinished: Boolean(newValue)
    })
  }
})
