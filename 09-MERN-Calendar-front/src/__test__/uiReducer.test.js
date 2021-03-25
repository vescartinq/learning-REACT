import { uiReducer } from '../reducers/uiReducer';
import { uiOpenModal, uiCloseModal } from '../actions/ui';

const initState = {
  modalOpen: false,
};

describe('Testing uiReducer', () => {
  test('should return default state', () => {
    // Generamos el estado por defecto
    const state = uiReducer(initState, {});

    // Espero que el primer estado sea el estado por defecto (modal cerrado)
    expect(state).toEqual(initState);
  });

  test('should open and close modal', () => {
    //   Generamos la acción abrir
    const modalOpen = uiOpenModal();

    // Guardamos el nuevo estado
    const state = uiReducer(initState, modalOpen);

    // Espero que el nuevo estado sea el modal abierto
    expect(state).toEqual({ modalOpen: true });

    //   Generamos la acción cerrar
    const modalClose = uiCloseModal();
    // Guardamos el nuevo estado
    const stateClose = uiReducer(state, modalClose);
    // Espero que el nuevo estado sea el modal cerrado
    expect(stateClose).toEqual({ modalOpen: false });
  });
});
