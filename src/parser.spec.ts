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
"<p class=\\"callout callout-info\\"><p>Info
:::</p>
</p>"
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
"<p class=\\"callout callout-info\\"><p>Info
:::</p>
</p><p>Normal paragraph</p>
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
<p class=\\"callout callout-info\\"><p>Info
:::</p>
</p>"
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
"<p class=\\"callout callout-caution\\"><p><em>Alert!</em></p>
<pre><code>this is my code block
</code></pre>
</p>"
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
"<p class=\\"callout callout-caution\\"><p><em>Alert!</em></p>
</p>"
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
"<p class=\\"callout callout-caution\\"><p>Message
:art:</p>
</p>"
`);
  });
});
