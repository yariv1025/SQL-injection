import {describe} from "mocha";

const expect = require('chai').expect


describe('Array [unit]', function () {

    describe('#sort', function () {
        it('retrieve a sort array for number array', () => {
            const stub = [6, 5, 4, 3, 2, 1]

            expect(stub.sort()).to.be.eql([1, 2, 3, 4, 5, 6])
        })

        it('retrieve a sort array for letter array', () => {
            const stub = ['d', 'c', 'b', 'a']

            expect(stub.sort()).to.be.eql(['a', 'b', 'c', 'd'])
        })
    })
})