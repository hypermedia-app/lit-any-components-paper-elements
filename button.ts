import button from '@lit-any/forms/lib/components/button'
import { html } from 'lit-html'
import { until } from 'lit-html/directives/until'

export default button(({ label, onClick }) => {
    const buttonImport = import('@polymer/paper-button/paper-button')
        .then(() => html`<paper-button @tap="${onClick}">${label}</paper-button>`)

    return html`${until(buttonImport, '')}`
})
