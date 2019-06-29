import textbox from '@lit-any/forms/lib/components/textbox'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'

export default textbox(({ type }) => (f, id, v, set) => {
  let elementRendered

  if (type === 'multi line') {
    elementRendered = import('@polymer/paper-input/paper-textarea').then(
      () => html`
        <paper-textarea
          label="${f.title}"
          .value="${v || ''}"
          ?required="${f.required}"
          auto-validate
          @value-changed="${(e: Event & any) => set(e.target.value)}"
        ></paper-textarea>
      `,
    )
  } else {
    elementRendered = import('@polymer/paper-input/paper-input').then(
      () => html`
        <paper-input
          label="${f.title}"
          type="text"
          .value="${v || ''}"
          ?required="${f.required}"
          auto-validate
          @value-changed="${(e: Event & any) => set(e.target.value)}"
        ></paper-input>
      `,
    )
  }

  return html`
    ${until(elementRendered)}
  `
})
