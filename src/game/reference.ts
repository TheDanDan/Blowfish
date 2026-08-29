import { ranks, tags } from './cards'

export const chartRows: [string, string][] = [
  ['Hard 8', 'H H H H H H H H H H'],
  ['Hard 9', 'H D D D D H H H H H'],
  ['Hard 10', 'D D D D D D D D D H'],
  ['Hard 11', 'D D D D D D D D D D'],
  ['Hard 12', 'H H S S S H H H H H'],
  ['Hard 13–16', 'S S S S S H H H H H'],
  ['Hard 17+', 'S S S S S S S S S S'],
  ['Soft 13–14', 'H H H D D H H H H H'],
  ['Soft 15–16', 'H H D D D H H H H H'],
  ['Soft 17', 'H D D D D H H H H H'],
  ['Soft 18', 'S D D D D S S H H H'],
  ['Soft 19+', 'S S S S S S S S S S'],
  ['A,A · 8,8', 'P P P P P P P P P P'],
  ['2,2 · 3,3', 'P P P P P P H H H H'],
  ['4,4', 'H H H P P H H H H H'],
  ['5,5', 'D D D D D D D D D H'],
  ['6,6', 'P P P P P H H H H H'],
  ['7,7', 'P P P P P P H H H H'],
  ['9,9', 'P P P P P S P P S S'],
  ['10,10', 'S S S S S S S S S S'],
]

export const dealerUpcards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'] as const

export const betRamp = 'TC ≤ 1: 1u · +2: 2u · +3: 4u · +4: 8u · +5+: 12u'

export const deviations = [
  { situation: 'Insurance', hilo: 'TC +3', zen: 'TC +4' },
  { situation: '16 vs 10', hilo: 'Stand at 0+', zen: 'Stand at 0+' },
  { situation: '15 vs 10', hilo: 'Stand at +4', zen: 'Stand at +5' },
  { situation: '12 vs 3', hilo: 'Stand at +2', zen: 'Stand at +3' },
  { situation: '10 vs 10', hilo: 'Double at +4', zen: 'Double at +4' },
] as const

export { ranks, tags }
