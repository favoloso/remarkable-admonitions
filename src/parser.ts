import Remarkable from 'remarkable';
import { TOKENS } from './tokens';

/**
 * Remarkable block parser that recognizes callouts.
 * @todo Add options.
 */
export const parser: Remarkable.BlockParsingRule = (
  state,
  startLine,
  endLine,
  silent
) => {
  const pos = state.bMarks[startLine] + state.blkIndent;
  const max = state.eMarks[startLine];

  // Not enough chars or ending line with `:::`.
  if (pos + 3 >= max) return false;

  const marker = state.src.charCodeAt(pos);

  // Wrong marker
  if (marker !== 0x3a /* ':' */) return false;

  const calloutType = state.src.slice(pos + 3, max).trim();

  // Scan for marker ending
  let nextLine = startLine;
  let hasEnding = false;

  while (nextLine < endLine) {
    nextLine++;

    const nextPos = state.bMarks[nextLine] + state.tShift[nextLine];
    const nextMax = state.eMarks[nextLine];

    if (state.src.charCodeAt(nextPos) !== marker) continue;

    const nextLineText = state.src.slice(nextPos, nextMax).trim();
    if (nextLineText === ':::') {
      hasEnding = true;
      break;
    }
  }

  // Let register token and progress
  state.tokens.push({
    type: TOKENS.CALLOUT_OPEN,
    level: state.level++,
    lines: [startLine, nextLine + (hasEnding ? 1 : 0)],
    calloutType
  } as any);
  state.parser.tokenize(state, startLine + 1, nextLine);
  state.tokens.push({
    type: TOKENS.CALLOUT_CLOSE,
    level: state.level--
  } as any);
  state.line = nextLine + (hasEnding ? 1 : 0);
  return true;
};
