import { AdmonitionType } from '../type';
import { emojiIconRenderer } from './icon-renderer-emoji';
import { svgInlineIconRenderer } from './icon-renderer-svg-inline';

/**
 * Type definition for icon renderers.
 */
export type IconRenderer = {
  content: (type: AdmonitionType) => string;
};

export function iconRenderer(renderer: string) {
  switch (renderer) {
    case 'emoji':
      return emojiIconRenderer;

    case 'svg-inline':
      return svgInlineIconRenderer;

    default:
      throw new Error(`Icon Renderer "${renderer}" is not defined.`);
  }
}
