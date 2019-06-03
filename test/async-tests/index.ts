import LitForm from '@lit-any/forms/lib/lit-form'

export function pEvent(element: HTMLElement, event: string) {
    return new Promise((resolve) => {
        element.addEventListener(event, resolve)
    })
}

export function forSubmit(litForm: LitForm) {
    return pEvent(litForm, 'submit')
}
