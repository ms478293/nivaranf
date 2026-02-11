import { useReducer } from "react";

interface UseDisclosure {
  onOpen?: () => void;
  onClose?: () => void;
}

export const useDisclosure = (initialState = false, action?: UseDisclosure) => {
  const [state, setState] = useReducer((_: boolean, newState: boolean) => {
    if (action) {
      if (newState && action.onOpen) {
        action.onOpen();
      } else if (action.onClose) {
        action.onClose();
      }
    }
    return newState;
  }, initialState);

  return {
    state,
    setState,
    open: () => setState(true),
    close: () => setState(false),
  };
};
