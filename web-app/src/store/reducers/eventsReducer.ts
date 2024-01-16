import { createSlice } from '@reduxjs/toolkit'
import { formatDate } from '@/utils/formatDate'
import { getPhotoById } from '@/utils/getPhotoById'
import { EventTypes } from '@/types/eventsTypes'

const eventsReducer = createSlice({
  name: 'events',
  initialState: {
    isEditable: false,
    isCreateEventModalOpen: false,
    isCreateEventNewModalOpen: false,
    isCreateEventTemplateModalOpen: false,
    isInfoModalOpen: false,
    startDate: new Date().toISOString(),
    oldEventId: '',
    newEventStart: '',
    newEventEnd: '',
    createNewStartDate: new Date().toISOString(),
    createTemplateStartDate: new Date().toISOString(),
    isOpenCreateNewDatepicker: false,
    isOpenCreateTemplateDatepicker: false,
    events: [
      {
        id: '',
        locationId: '',
        type: '',
        image: '',
        title: '',
        description: '',
        start: '',
        end: '',
      },
    ]
  },
  reducers: {
    setEvents(state, action) {
      const newEvents = action.payload.map((event: any) => ({
        id: event.id.toString(),
        locationId: event.location_id,
        type: event.meta ? event.meta.type : EventTypes.Event,
        image: getPhotoById(event.image_id),
        title: event.title,
        description: event.description,
        start: event.created_at.split('T')[0],
        end: event.created_at.split('T')[0]
      }))
    
      const uniqueNewEvents = newEvents.filter((newEvent: any) => 
        !state.events.some(existingEvent => existingEvent.id === newEvent.id)
      )
    
      state.events = [...state.events, ...uniqueNewEvents]
    },
    deleteEvent(state, action) {
      state.events = state.events.filter(event => event.id !== action.payload)
    },
    setCreateEventModal(state, action) {
      state.isCreateEventModalOpen = action.payload
    },
    setCreateEventNewModal(state, action) {
      state.isCreateEventNewModalOpen = action.payload
    },
    setCreateEventTemplateModal(state, action) {
      state.isCreateEventTemplateModalOpen = action.payload
    },
    setInfoModalOpen(state, action) {
      state.isInfoModalOpen = action.payload
    },
    setEditable(state, action) {
      state.isEditable = action.payload
    },
    changeDate(state, action) {
      state.startDate = action.payload
    },
    changeCreateNewDate(state, action) {
      state.createNewStartDate = action.payload
    },
    changeCreateTemplateDate(state, action) {
      state.createTemplateStartDate = action.payload
    },
    setOpenCreateNewDatepicker(state, action) {
      state.isOpenCreateNewDatepicker = action.payload 
    },
    setOpenCreateTemplateDatepicker(state, action) {
      state.isOpenCreateTemplateDatepicker = action.payload
    },
    eventDrag(state, action) {
      const { publicId } = action.payload.event._def
      // const { holiday } = action.payload.event._def.extendedProps
      const { start: newStart, end: newEnd } = action.payload.event._instance.range
      const newStartFormated = formatDate(newStart)
      const newEndFormated = formatDate(newEnd)

      state.events = state.events.map(event => ({
        ...event, 
        start: event.id === publicId ? newStartFormated : event.start,
        end: event.id === publicId ? newEndFormated : event.end,
      }))
    },
    eventClick(state, action) {
      const { publicId } = action.payload.event._def
      // const { holiday } = action.payload.event._def.extendedProps

      state.oldEventId = publicId
      state.isInfoModalOpen = true
    },
    dateSelect(state, action) {
      const { startStr, endStr } = action.payload

      state.newEventStart = startStr
      state.newEventEnd = endStr
      state.isCreateEventModalOpen = true
    },
    eventResize(state, action) {
      const { publicId } = action.payload.event._def
      const { end: newEnd } = action.payload.event._instance.range

      const newEndFormated = formatDate(newEnd)

      state.events = state.events.map(event => ({
        ...event, 
        end: event.id === publicId ? newEndFormated : event.end,
      }))
    },
  }
})

export default eventsReducer.reducer
export const {
  setEvents,
  deleteEvent,
  setCreateEventModal, 
  setCreateEventNewModal, 
  setCreateEventTemplateModal,
  setInfoModalOpen,
  setEditable,
  changeDate, 
  changeCreateNewDate,
  changeCreateTemplateDate,
  setOpenCreateNewDatepicker,
  setOpenCreateTemplateDatepicker,
  eventDrag,
  eventClick,
  dateSelect,
  eventResize
} = eventsReducer.actions