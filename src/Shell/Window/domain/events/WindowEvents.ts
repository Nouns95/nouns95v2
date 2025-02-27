import { Window, MiniAppWindow, WindowCoordinates, WindowDimensions } from '../models/Window';
import { WindowState } from '../models/WindowState';
import { Process } from '../models/Process';

export type WindowEventMap = {
  'windowCreated': { window: Window | MiniAppWindow };
  'windowClosed': { windowId: string };
  'windowFocused': { windowId: string };
  'windowBlurred': { windowId: string };
  'windowMinimized': { windowId: string };
  'windowMaximized': { windowId: string };
  'windowRestored': { windowId: string };
  'windowMoved': { windowId: string; position: WindowCoordinates };
  'windowResized': { windowId: string; size: WindowDimensions };
  'windowStateChanged': { state: WindowState };
  'processCreated': { processId: string };
  'processTerminated': { processId: string };
  'processSuspended': { processId: string };
  'processResumed': { processId: string };
  'processResourcesUpdated': { processId: string; resources: Process['resources'] };
  'focusChanged': { windowId: string };
  'focusCleared': { timestamp: number };
  'miniAppPinned': { miniAppId: string };
  'miniAppUnpinned': { miniAppId: string };
};

export type WindowEventName = keyof WindowEventMap;
export type WindowEventCallback<T extends WindowEventName> = (data: WindowEventMap[T]) => void;
