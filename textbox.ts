import textbox from '@lit-any/forms/lib/components/textbox'
import { html } from 'lit-html'

export default textbox(({ type }) => (f, id, v, set) => {
    if (type === 'multi line') {
        import('@polymer/paper-input/paper-textarea')
        return html`<paper-textarea 
                            label="${f.title}"
                            .value="${v || ''}"
                            ?required="${f.required}"
                            auto-validate
                            @value-changed="${(e: Event & any) => set(e.target.value)}" ></paper-textarea>`
    }

    import('@polymer/paper-input/paper-input')
    return html`<paper-input 
                        label="${f.title}"
                        type="text"
                        .value="${v || ''}"
                        ?required="${f.required}"
                        auto-validate
                        @value-changed="${(e: Event & any) => set(e.target.value)}" ></paper-input>`
})
