import Remarkable from 'remarkable';
import { TOKENS } from './tokens';
import { parser } from './parser';
import { openRenderer, closeRenderer } from './renderer';

export type AdmonitionOptions = {
  icon: 'svg-inline' | 'emoji';
};

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
const plugin = (admonitionOpts?: AdmonitionOptions): Remarkable.Plugin => (
  md,
  opts
) => {
  const mergedOpts: AdmonitionOptions = {
    icon: 'emoji',
    ...admonitionOpts
  };

  md.block.ruler.before('code', TOKENS.CALLOUT, parser, opts);

  md.renderer.rules[TOKENS.CALLOUT_OPEN] = openRenderer(mergedOpts);
  md.renderer.rules[TOKENS.CALLOUT_CLOSE] = closeRenderer(mergedOpts);
};

export default plugin;
