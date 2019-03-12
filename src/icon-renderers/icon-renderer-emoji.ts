import { IconRenderer } from './icon-renderer';

const emojisMap = {
  warning: '⚠️',
  important: '❗️',
  caution: '🔥',
  tip: '💡',
  note: 'ℹ️'
};

export const emojiIconRenderer: IconRenderer = {
  content(type) {
    return emojisMap[type];
  }
};
