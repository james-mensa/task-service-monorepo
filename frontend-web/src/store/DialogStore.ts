import { makeAutoObservable } from 'mobx';
import { PromptDialogProps } from '../utils/types';

/**
 * Default initial state for the prompt dialog.
 */
const INITIAL_STATE: PromptDialogProps = {
  title: '',
  subtitle: '',
  leftButton: {
    onClick: () => {},
    label: 'Cancel',
  },
  rightButton: {
    onClick: () => {},
    label: 'Continue',
  },
  open: false,
  isProcessing:false
};

/**
 * MobX store to manage the state and behavior of a prompt dialog.
 */
class DialogStore {
  isOpen = false;
  props: PromptDialogProps = { ...INITIAL_STATE };
  isProcessing = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

 /**
 * Opens the prompt dialog with the specified properties.
 * 
 * @param props - prompt dialog properties.
 * The `props` object structure:
 * - `title`: string (required) — Dialog title.
 * - `subtitle`: string (required) — Dialog subtitle or description.
 * - `leftButton` (optional):
 *    - `onClick`: function to call when left button is clicked.
 *    - `label`: optional label text for the left button (default: 'Cancel').
 * - `rightButton` (optional):
 *    - `onClick`: function to call when right button is clicked.
 *    - `label`: optional label text for the right button (default: 'Continue').
 * - `open`: boolean (required) — Whether the dialog should be initially open.
 * - `isProcessing` (optional): boolean — If true, shows loading/processing state.
 *
 * Notes:
 * - Any missing fields will fall back to their default values defined in `INITIAL_STATE`.
 */
  open(props: PromptDialogProps) {
    this.isOpen = true;
    this.props = { ...INITIAL_STATE, ...props };
  }

  /**
   * Closes the dialog and resets its properties to the default state.
   */
  close() {
    this.props = { ...INITIAL_STATE };
    this.isOpen = false;
    this.stopProcessing();
  }

  /**
   * Sets the processing state to true.
   */
  startProcessing() {
    this.isProcessing = true;
  }

  /**
   * Sets the processing state to false.
   */
  stopProcessing() {
    this.isProcessing = false;
  }
}

export const dialogStore = new DialogStore();
