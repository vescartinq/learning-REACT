// TESTING MOCKEANDO FIRESTORE
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploading,
} from '../actions/notes';
import { types } from '../types/types';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';

jest.mock('../helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => {
    return 'https://hola-mundo.com/cosa.jpg';
    // return Promise.resolve('https://hola-mundo.com/cosa.jpg');
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    uid: 'TESTING',
  },
  notes: {
    active: {
      id: 'VsgdydEGjg7VTig16Pn5',
      title: 'Hola',
      body: 'Mundo',
    },
  },
};

let store;

// Evitar error de ScrollTo al pasar los test
global.scrollTo = jest.fn();

describe('Testing notes-actions', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('should create a new note with StartNewNote', async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();
    // console.log(actions);

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    // Limpiar las pruebas en Firestore
    const docId = actions[0].payload.id;
    await db.doc(`/TESTING/journal/notes/${docId}`).delete();
  });

  test('startLoadingNotes should upload notes', async () => {
    await store.dispatch(startLoadingNotes('TESTING'));
    const actions = store.getActions();

    // Las notas son un Array
    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });

    // La nota contiene id, title, body y date
    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('startSaveNote should update note', async () => {
    const note = {
      id: 'VsgdydEGjg7VTig16Pn5',
      title: 'titulo',
      body: 'body',
    };

    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();
    // console.log(actions);
    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();

    expect(docRef.data().title).toBe(note.title);
  });

  test('startUploading should update url entry', async () => {
    const file = new File([], 'foto.jpg');
    await store.dispatch(startUploading(file));

    const docRef = await db
      .doc('/TESTING/journal/notes/VsgdydEGjg7VTig16Pn5')
      .get();

    expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg');
  });
});
