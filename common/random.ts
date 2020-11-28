import MersenneTwister from 'mersenne-twister'
import {
  CoinflipResult, 
} from '../@types'

export const coinflip = (seed: number = Math.random()): CoinflipResult => {
  const generator = new MersenneTwister(seed)

  return {
    seed,
    headsOrTails: ["heads", "tails"][Math.round(generator.random())] as "heads" | "tails",
  } 
}


export interface chooseResult {
  choices: Array<unknown> | Record<string, unknown>
  seed: number
  choice: unknown
  key?: string
}

export const choose = (
  choices: Array<unknown> | Record<string, unknown>,
  seed: number = Math.random(),
): chooseResult => {
  const generator = new MersenneTwister(seed)

  if (Array.isArray(choices)) {
    const choice = choices[Math.floor(generator.random() * choices.length)]

    return {
      choices,
      seed,
      choice,
    }
  } else if (typeof choices === 'object') {
    const keys = Object.keys(choices)

    const key = keys[Math.floor(generator.random() * keys.length)]

    const choice = choices[key]
    
    return {
      choices,
      seed,
      choice,
      key,
    }
  }
}
