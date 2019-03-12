import Remarkable from 'remarkable';

/**
 * Remarkable callout renderer.
 */
export const calloutOpenRenderer: Remarkable.Rule = (
  tokens,
  idx,
  options,
  env
) => {
  const token = tokens[idx] as any;
  return `<div class="callout callout-${token.calloutType}">`;
};

/**
 * Callout closing tag renderer
 */
export const calloutCloseRenderer: Remarkable.Rule = (
  tokens,
  idx,
  options,
  env
) => {
  return `</div>`;
};
