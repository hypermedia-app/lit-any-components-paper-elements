// @ts-ignore
import { expect } from '@open-wc/testing'
import '@polymer/paper-dropdown-menu/paper-dropdown-menu'
import * as sinon from 'sinon'
import { DropdownOptions } from '@lit-any/forms/lib/components'
import dropdown from '../dropdown'
import { pEvent } from './async-tests'
import render from './helper/render'

describe('paper-elements', () => {
  let opts: DropdownOptions

  describe('dropdown', () => {
    beforeEach(() => {
      opts = {
        items: [],
      }
    })

    it('should be required if field is required', async () => {
      // given
      const field = {
        title: 'user name',
        required: true,
      } as any

      // when
      const renderFunc = dropdown(opts)
      const el = await render(renderFunc, field)

      // then
      expect(el.required).to.be.true
    })

    it('should fire validation when value is set', async () => {
      // given
      const field = {
        title: 'user name',
      } as any
      const renderFunc = dropdown(opts)
      const el = await render(renderFunc, field)
      el.validate = sinon.spy()
      const valueChangedToHappen = pEvent(el, 'value-changed')

      // when
      el.value = 'hello'

      // then
      await valueChangedToHappen
      expect(el.validate.called).to.be.true
    })

    it('should accept items array', async () => {
      // given
      const field = {
        title: 'user name',
      } as any
      opts.items = [{}, {}, {}] as any

      // when
      const renderFunc = dropdown(opts)
      const el = await render(renderFunc, field)

      // wait for the promise
      await new Promise(resolve => {
        setTimeout(resolve, 1)
      })

      // then
      expect(el.querySelectorAll('paper-item').length).to.be.equal(3)
    })

    it('should accept items as function returning array', async () => {
      // given
      const field = {
        title: 'abc',
      } as any
      opts.items = f => f.title.split('').map(l => ({ label: l, value: l }))

      // when
      const renderFunc = dropdown(opts)
      const el = await render(renderFunc, field)

      // wait for the promise
      await new Promise(resolve => {
        setTimeout(resolve, 1)
      })

      // then
      const itemElements = el.querySelectorAll('paper-item')
      expect(itemElements[0].value).to.be.equal('a')
      expect(itemElements[1].value).to.be.equal('b')
      expect(itemElements[2].value).to.be.equal('c')
    })

    it('should accept items as function returning promise', async () => {
      // given
      const field = {
        title: 'abc',
      } as any
      opts.items = f => Promise.resolve(f.title.split('').map(l => ({ label: l, value: l })))

      // when
      const renderFunc = dropdown(opts)
      const el = await render(renderFunc, field)

      // wait for the promise
      await new Promise(resolve => {
        setTimeout(resolve, 1)
      })

      // then
      const itemElements = el.querySelectorAll('paper-item')
      expect(itemElements[0].value).to.be.equal('a')
      expect(itemElements[1].value).to.be.equal('b')
      expect(itemElements[2].value).to.be.equal('c')
    })
  })
})
