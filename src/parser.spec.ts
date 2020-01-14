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
"
    <div class=\\"admonition admonition-note\\">
      <div class=\\"admonition-heading\\">
        <h5><div class=\\"admonition-icon\\">ℹ️</div> note</h5>
      </div>
      <div class=\\"admonition-content\\">
    <p>Info</p>
<p>ABC</p>
</div></div>"
`);
  });

  test('should render a callout within a list', () => {
    md.use(plugin());
    expect(md.render(`- A list\n\n    :::note\n    Info\n    ABC\n    :::\n`)).toMatchInlineSnapshot(`
"<ul>
<li><p>A list</p>

    <div class=\\"admonition admonition-note\\">
      <div class=\\"admonition-heading\\">
        <h5><div class=\\"admonition-icon\\">ℹ️</div> note</h5>
      </div>
      <div class=\\"admonition-content\\">
    <p>Info</p>
<p>ABC</p>
</div></div></li>
</ul>
"
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
"
    <div class=\\"admonition admonition-warning\\">
      <div class=\\"admonition-heading\\">
        <h5><div class=\\"admonition-icon\\">⚠️</div> warning</h5>
      </div>
      <div class=\\"admonition-content\\">
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

    <div class=\\"admonition admonition-note\\">
      <div class=\\"admonition-heading\\">
        <h5><div class=\\"admonition-icon\\">ℹ️</div> note</h5>
      </div>
      <div class=\\"admonition-content\\">
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
"
    <div class=\\"admonition admonition-caution\\">
      <div class=\\"admonition-heading\\">
        <h5><div class=\\"admonition-icon\\">🔥</div> caution</h5>
      </div>
      <div class=\\"admonition-content\\">
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
"
    <div class=\\"admonition admonition-important\\">
      <div class=\\"admonition-heading\\">
        <h5><div class=\\"admonition-icon\\">❗️</div> important</h5>
      </div>
      <div class=\\"admonition-content\\">
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
"
    <div class=\\"admonition admonition-caution\\">
      <div class=\\"admonition-heading\\">
        <h5><div class=\\"admonition-icon\\">🔥</div> caution</h5>
      </div>
      <div class=\\"admonition-content\\">
    <p>Message
:art:</p>
</div></div>"
`);
  });

  test('should render title', () => {
    md.use(plugin());
    expect(
      md.render(dedent`
        :::caution With a title!
        Message
        :art:
      `)
    ).toMatchInlineSnapshot(`
"
    <div class=\\"admonition admonition-caution\\">
      <div class=\\"admonition-heading\\">
        <h5><div class=\\"admonition-icon\\">🔥</div>  With a title!</h5>
      </div>
      <div class=\\"admonition-content\\">
    <p>Message
:art:</p>
</div></div>"
`);
  });

  describe('icon renderer', () => {
    test('should throw if invalid icon renderer is selected', () => {
      md.use(plugin({ icon: 'whaaat' as any }));
      expect(() => {
        md.render(dedent`
          :::caution
          Message
          :::
        `);
      }).toThrow();
    });

    test('should allow svg rendering', () => {
      md.use(plugin({ icon: 'svg-inline' }));
      expect(
        md.render(dedent`
        :::caution
        Message
        :::
      `)
      ).toMatchInlineSnapshot(`
"
    <div class=\\"admonition admonition-caution\\">
      <div class=\\"admonition-heading\\">
        <h5><div class=\\"admonition-icon\\"><svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"12\\" height=\\"16\\" viewBox=\\"0 0 12 16\\"><path fill-rule=\\"evenodd\\" d=\\"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z\\"/></svg></div> caution</h5>
      </div>
      <div class=\\"admonition-content\\">
    <p>Message</p>
</div></div>"
`);
    });
  });
});
