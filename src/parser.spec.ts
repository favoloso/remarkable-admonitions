import Remarkable from 'remarkable';
import { parser } from './parser';
import dedent from 'dedent';

let md!: Remarkable;

describe('remarkable-callout', () => {
  beforeEach(() => {
    md = new Remarkable();
  });

  test('should render a callout', () => {
    md.use(parser);
    expect(
      md.render(dedent`
        :::info
        Info
        :::
      `)
    ).toEqual(`<p class="callout-info">Info</p>`);
  });
});
