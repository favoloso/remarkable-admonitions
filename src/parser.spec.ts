import Remarkable from 'remarkable';
import plugin from '.';
import dedent from 'dedent';

let md!: Remarkable;

describe('parser', () => {
  beforeEach(() => {
    md = new Remarkable();
  });

  test('should render a callout', () => {
    md.use(plugin);
    expect(
      md.render(dedent`
        :::info
        Info
        :::
      `)
    ).toMatchInlineSnapshot(`
"<div class=\\"callout callout-info\\"><p>Info
:::</p>
</div>"
`);
  });

  test('should ignore content after callout', () => {
    md.use(plugin);
    expect(
      md.render(dedent`
        :::info
        Info
        :::

        Normal paragraph
      `)
    ).toMatchInlineSnapshot(`
"<div class=\\"callout callout-info\\"><p>Info
:::</p>
</div><p>Normal paragraph</p>
"
`);
  });

  test('should ignore content before the callout', () => {
    md.use(plugin);
    expect(
      md.render(dedent`
        Normal paragraph

        :::info
        Info
        :::        
      `)
    ).toMatchInlineSnapshot(`
"<p>Normal paragraph</p>
<div class=\\"callout callout-info\\"><p>Info
:::</p>
</div>"
`);
  });

  test('should allow nested blocks', () => {
    md.use(plugin);
    expect(
      md.render(dedent`
        :::caution
        *Alert!*
        
        ~~~
        this is my code block
        ~~~
        :::
      `)
    ).toMatchInlineSnapshot(`
"<div class=\\"callout callout-caution\\"><p><em>Alert!</em></p>
<pre><code>this is my code block
</code></pre>
</div>"
`);
  });

  test('should close tag on EOF', () => {
    md.use(plugin);
    expect(
      md.render(dedent`
        :::caution
        *Alert!*
      `)
    ).toMatchInlineSnapshot(`
"<div class=\\"callout callout-caution\\"><p><em>Alert!</em></p>
</div>"
`);
  });

  test('should ignore text starting with ":" if not closing tag', () => {
    md.use(plugin);
    expect(
      md.render(dedent`
        :::caution
        Message
        :art:
      `)
    ).toMatchInlineSnapshot(`
"<div class=\\"callout callout-caution\\"><p>Message
:art:</p>
</div>"
`);
  });
});
