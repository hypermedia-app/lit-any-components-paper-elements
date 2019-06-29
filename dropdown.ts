import dropdown, { DropdownItem } from '@lit-any/forms/lib/components/dropdown'
import { html } from 'lit-html'
import { repeat } from 'lit-html/directives/repeat'
import { until } from 'lit-html/directives/until'

export default dropdown(({ items = [] }) => (f, id, v, set) => {
  const loadElements = Promise.all([
    import('@polymer/paper-listbox/paper-listbox'),
    import('@polymer/paper-dropdown-menu/paper-dropdown-menu'),
    import('@polymer/paper-item/paper-item'),
  ])

  function setValue(e: Event & any) {
    e.target.validate()
    return set(e.target.querySelector('paper-listbox').selected)
  }

  const optionsToRender = Promise.resolve().then(() => {
    if (typeof items === 'function') {
      return items(f)
    }

    return items
  })

  function renderItem(option: DropdownItem) {
    return html`
      <paper-item .value="${option.value}">${option.label}</paper-item>
    `
  }

  const paperItems = optionsToRender.then(
    resolved =>
      html`
        ${repeat(resolved, renderItem)}
      `,
  )

  const dropdownReady = loadElements.then(
    () => html`
      <paper-dropdown-menu
        label="${f.title}"
        ?no-animations="${!('KeyframeEffect' in window)}"
        @value-changed="${setValue}"
        ?required="${f.required}"
      >
        <paper-listbox slot="dropdown-content" attr-for-selected="value" .selected="${v}">
          ${until(paperItems, '')}
        </paper-listbox>
      </paper-dropdown-menu>
    `,
  )

  return html`
    ${until(dropdownReady)}
  `
})
