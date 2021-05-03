import { FETCH_DATA, REMOVE_NOTE, SHOW_LOADER, ADD_NOTE } from '../types'

const handlers = {
  [SHOW_LOADER]: state => ({ ...state, loading: true }),
  [ADD_NOTE]: (state, { payload }) => ({
    ...state,
    notes: [...state.notes, payload],
  }),
  [FETCH_DATA]: (state, { payload }) => ({
    ...state,
    history: Object.entries(
      payload.find(node => node.key == 'history').value
    ).map(note => ({ ...note[1], id: note[0] })),
    notes: Object.entries(
      payload.find(node => node.key == 'notes').value
    ).map(note => ({ ...note[1], id: note[0] })),
    loading: false,
  }),
  [REMOVE_NOTE]: (state, { payload }) => ({
    ...state,
    notes: state.notes.filter(note => note.id !== payload.id),
    history: [
      ...state.history,
      { date: payload.date, title: payload.title, id: payload.historyId },
    ],
  }),
  DEFAULT: state => state,
}

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
