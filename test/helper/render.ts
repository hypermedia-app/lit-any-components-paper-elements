import { render } from 'lit-html'
// @ts-ignore
import { fixture } from '@open-wc/testing'
import { RenderFunc } from '@lit-any/forms/lib'
import { FieldContract } from '@lit-any/forms/lib/formContract'

export default async function r(
  componentFactory: RenderFunc,
  field: FieldContract,
  id = 'id',
  value = '',
  setter = () => {},
) {
  const container = await fixture('<div></div>')

  const forElementToRender = new Promise(resolve => {
    const observer = new MutationObserver(mutationsList => {
      mutationsList.forEach(mutation => {
        if (Array.from(mutation.addedNodes).find(node => node instanceof Element)) {
          observer.disconnect()
          resolve()
        }
      })
    })
    observer.observe(container, { childList: true })
  })

  render(await componentFactory(field, id, value, setter), container)
  await forElementToRender

  return container.children[0]
}
