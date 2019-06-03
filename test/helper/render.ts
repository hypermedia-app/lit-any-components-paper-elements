import { render } from 'lit-html'
// @ts-ignore
import { fixture } from '@open-wc/testing'
import { RenderFunc } from '@lit-any/forms/lib'
import { FieldContract } from '@lit-any/forms/lib/formContract'

export default async function (componentFactory: RenderFunc, field: FieldContract, id = 'id', value = '', setter = () => {}) {
    const container = await fixture('<div></div>')

    render(await componentFactory(field, id, value, setter), container)

    return container.children[0]
}
