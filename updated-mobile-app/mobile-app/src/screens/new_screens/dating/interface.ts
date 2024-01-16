export interface DatingProps {
    setHideBottomTabs: (value: boolean) => void
}

export interface HeaderProps {
    step: number,
    changeStep: (e: number) => void,
    onSwipeClose: () => void,
    isOpenSwipe: boolean
}