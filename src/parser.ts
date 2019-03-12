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
  let pos = state.bMarks[startLine] + state.blkIndent;
  const max = state.eMarks[startLine];

  // Not enough chars or ending line with `:::`.
  if (pos + 3 >= max) return false;

  const marker = state.src.charCodeAt(pos);

  // Wrong marker
  if (marker !== 0x3a /* ':' */) return false;

  let mem = pos;
  pos = state.skipChars(pos, marker);

  // We need exactly 3 `:`
  if (pos - mem !== 3) return false;

  const [calloutType, title] = state.src
    .slice(pos, max)
    .trim()
    .split(' ', 2);

  if (calloutType === '') return false;

  if (silent) return true;

  // Scan for marker ending
  let nextLine = startLine;
  let hasEnding = false;

  while (nextLine < endLine) {
    nextLine++;

    if (nextLine >= endLine) break;

    const nextPos = state.bMarks[nextLine] + state.tShift[nextLine];
    const nextMax = state.eMarks[nextLine];

    if (state.src.charCodeAt(nextPos) !== marker) continue;

    const nextLineText = state.src.slice(nextPos, nextMax).trim();
    if (nextLineText === ':::') {
      hasEnding = true;
      break;
    }
  }

  // Ensure nested parsing stops at delimiting block
  const oldMax = state.lineMax;
  state.lineMax = nextLine + (hasEnding ? -1 : 0);
  const oldParentType = state.parentType;
  state.parentType = 'admonition' as any;

  let lines;

  // Let register token and progress
  state.tokens.push({
    type: TOKENS.CALLOUT_OPEN,
    level: state.level,
    lines: lines = [startLine, 0],
    calloutType,
    title
  } as any);
  state.parser.tokenize(state, startLine + 1, nextLine);
  state.tokens.push({
    type: TOKENS.CALLOUT_CLOSE,
    level: state.level
  } as any);

  // Revert
  lines[1] = nextLine;
  state.line = nextLine + (hasEnding ? 1 : 0);
  state.lineMax = oldMax;
  state.parentType = oldParentType;

  return true;
};
