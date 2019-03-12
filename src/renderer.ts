import Remarkable from 'remarkable';
import { AdmonitionOptions } from './';
import { iconRenderer } from './icon-renderers/icon-renderer';
import { AdmonitionType } from './type';

/**
 * Remarkable admonition renderer.
 */
export function openRenderer(
  admonitionOpts: AdmonitionOptions
): Remarkable.Rule {
  return (tokens, idx, options, env) => {
    const renderIcon = iconRenderer(admonitionOpts.icon);

    const token = tokens[idx] as any;
    const icon = renderIcon.content(token.admonition as AdmonitionType);
    const iconTemplate = `<div class="admonition-icon">${icon || ''}</div>`;

    return `
    <div class="admonition admonition-${token.admonition}">
      <div class="admonition-heading">
        <h5>${iconTemplate} ${token.title || token.admonition}</h5>
      </div>
      <div class="admonition-content">
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
