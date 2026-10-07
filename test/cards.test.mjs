import assert from 'node:assert/strict'
import test from 'node:test'
import { recommend, shoeFor, total } from '../src/game/cards.ts'

test('a single deck has the expected card ranks', () => {
  const shoe = shoeFor(1)
  assert.equal(shoe.length, 52)
  for (const rank of ['A', '2', '3', '4', '5', '6', '7', '8', '9']) {
    assert.equal(shoe.filter((card) => card === rank).length, 4)
  }
  assert.equal(shoe.filter((card) => card === '10').length, 16)
})

test('aces adjust to a usable total', () => {
  assert.equal(total(['A', 'A', '7']), 19)
  assert.equal(total(['A', '9', '5']), 15)
})

test('recommendations cover hard, soft, pair, and post-hit decisions', () => {
  const cases = [
    [['9', '2'], '6', 'Double'],
    [['9', '2'], 'A', 'Double'],
    [['10', '2'], '4', 'Stand'],
    [['A', '2'], '4', 'Hit'],
    [['A', '2'], '5', 'Double'],
    [['A', '7'], '9', 'Hit'],
    [['A', '7'], '3', 'Double'],
    [['A', 'A', '7'], '6', 'Stand'],
    [['8', '8'], '10', 'Split'],
    [['9', '9'], '7', 'Stand'],
    [['2', '2'], '7', 'Split'],
    [['5', '5'], '6', 'Double'],
    [['5', '6', '2'], '6', 'Stand'],
  ]
  for (const [hand, dealer, expected] of cases) {
    assert.equal(recommend(hand, dealer), expected, `${hand.join(',')} vs ${dealer}`)
  }
})
