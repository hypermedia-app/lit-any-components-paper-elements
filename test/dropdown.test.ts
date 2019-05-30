import { expect } from '@open-wc/testing'
import '@polymer/paper-dropdown-menu/paper-dropdown-menu'
import * as sinon from 'sinon'
import dropdown from '../dropdown'
import { pEvent } from './async-tests'
import render from './helper/render'

describe('paper-elements', () => {
    let opts

    describe('dropdown', () => {
        beforeEach(() => {
            opts = {
            }
        })

        it('should be required if field is required', async () => {
            // given
            const field = {
                title: 'user name',
                required: true,
            }

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
            }
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
            }
            opts.items = [{}, {}, {}]

            // when
            const renderFunc = dropdown(opts)
            const el = await render(renderFunc, field)

            // wait for the promise
            await new Promise((resolve) => {
                setTimeout(resolve, 1)
            })

            // then
            expect(el.querySelectorAll('paper-item').length).to.be.equal(3)
        })

        it('should accept items as function returning array', async () => {
            // given
            const field = {
                title: 'abc',
            }
            opts.items = f => f.title.split('').map(l => ({ label: l, value: l }))

            // when
            const renderFunc = dropdown(opts)
            const el = await render(renderFunc, field)

            // wait for the promise
            await new Promise((resolve) => {
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
            }
            opts.items = f => Promise.resolve(f.title.split('').map(l => ({ label: l, value: l })))

            // when
            const renderFunc = dropdown(opts)
            const el = await render(renderFunc, field)

            // wait for the promise
            await new Promise((resolve) => {
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
