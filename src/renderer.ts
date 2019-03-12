import Remarkable from 'remarkable';
import { AdmonitionOptions } from './';
import { iconRenderer } from './icon-renderers/icon-renderer';

/**
 * Remarkable admonition renderer.
 */
export function openRenderer(
  admonitionOpts: AdmonitionOptions
): Remarkable.Rule {
  return (tokens, idx, options, env) => {
    const renderIcon = iconRenderer(admonitionOpts.icon);

    const token = tokens[idx] as any;
    const icon = renderIcon.content(token.calloutType as 'tip');
    const iconTemplate = `<div class="callout-icon">${icon || ''}</div>`;
    return `<div class="callout callout-${token.calloutType}">
    <div class="callout-heading">
      ${token.title ? `<h5>${iconTemplate} ${token.title}</h5>` : iconTemplate}
    </div>
    <div class="callout-content">      
    `;
  };
}

/**
 * Callout closing tag renderer
 */
export function closeRenderer(
  admonitionOpts: AdmonitionOptions
): Remarkable.Rule {
  return (tokens, idx, options, env) => {
    return `</div></div>`;
  };
}
