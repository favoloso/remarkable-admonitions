import Remarkable from 'remarkable';
import { TOKENS } from './tokens';
import { parser } from './parser';
import { calloutOpenRenderer, calloutCloseRenderer } from './renderer';

/**
 * Remarkable plugin that recognizes callout syntax in markdown and renders
 * it in a dedicated paragraph.
 *
 * Example syntax:
 *
 *    :::info
 *    This is an information callout
 *    :::
 *
 * @todo Add opts to customize rendering.
 */
const plugin: Remarkable.Plugin = (md, opts) => {
  md.block.ruler.before('code', TOKENS.CALLOUT, parser, opts);
  md.renderer.rules[TOKENS.CALLOUT_OPEN] = calloutOpenRenderer;
  md.renderer.rules[TOKENS.CALLOUT_CLOSE] = calloutCloseRenderer;
};

export default plugin;
