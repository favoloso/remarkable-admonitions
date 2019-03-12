import Remarkable from 'remarkable';
import plugin from '.';
import dedent from 'dedent';

let md!: Remarkable;

describe('parser', () => {
  beforeEach(() => {
    md = new Remarkable();
  });

  test('should render a callout', () => {
    md.use(plugin());
    expect(md.render(`:::note\nInfo\nABC\n:::`)).toMatchInlineSnapshot(`
"<div class=\\"callout callout-note\\">
    <div class=\\"callout-heading\\">
      <div class=\\"callout-icon\\">ℹ️</div>
    </div>
    <div class=\\"callout-content\\">      
    <p>Info</p>
<p>ABC</p>
</div></div>"
`);
  });

  test('should ignore content after callout', () => {
    md.use(plugin());
    expect(
      md.render(dedent`
        :::warning
        This is a warning
        :::

        Normal paragraph
      `)
    ).toMatchInlineSnapshot(`
"<div class=\\"callout callout-warning\\">
    <div class=\\"callout-heading\\">
      <div class=\\"callout-icon\\">⚠️</div>
    </div>
    <div class=\\"callout-content\\">      
    <p>This is a warning</p>
</div></div><p>Normal paragraph</p>
"
`);
  });

  test('should ignore content before the callout', () => {
    md.use(plugin());
    expect(
      md.render(dedent`
        Normal paragraph

        :::note
        Info
        :::        
      `)
    ).toMatchInlineSnapshot(`
"<p>Normal paragraph</p>
<div class=\\"callout callout-note\\">
    <div class=\\"callout-heading\\">
      <div class=\\"callout-icon\\">ℹ️</div>
    </div>
    <div class=\\"callout-content\\">      
    <p>Info</p>
</div></div>"
`);
  });

  /**
   * Current syntax does not allow nesting with Remarkable
   */
  test('should allow nested blocks', () => {
    md.use(plugin());
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
"<div class=\\"callout callout-caution\\">
    <div class=\\"callout-heading\\">
      <div class=\\"callout-icon\\">🔥</div>
    </div>
    <div class=\\"callout-content\\">      
    <p><em>Alert!</em></p>
<pre><code>this is my code block
</code></pre>
</div></div>"
`);
  });

  test('should close tag on EOF', () => {
    md.use(plugin());
    expect(
      md.render(dedent`
        :::important
        *Alert!*
      `)
    ).toMatchInlineSnapshot(`
"<div class=\\"callout callout-important\\">
    <div class=\\"callout-heading\\">
      <div class=\\"callout-icon\\">❗️</div>
    </div>
    <div class=\\"callout-content\\">      
    <p><em>Alert!</em></p>
</div></div>"
`);
  });

  test('should ignore text starting with ":" if not closing tag', () => {
    md.use(plugin());
    expect(
      md.render(dedent`
        :::caution
        Message
        :art:
      `)
    ).toMatchInlineSnapshot(`
"<div class=\\"callout callout-caution\\">
    <div class=\\"callout-heading\\">
      <div class=\\"callout-icon\\">🔥</div>
    </div>
    <div class=\\"callout-content\\">      
    <p>Message
:art:</p>
</div></div>"
`);
  });
});
