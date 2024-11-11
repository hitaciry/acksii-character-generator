import { useCharacterStore } from '../stores/characterStore' // Import the store

export function rollDice(input) {
  const regex = /^(\d*)?([dkдк])((2|3|4|6|8|10|12|20|100))$/
  const match = input.trim().match(regex)

  if (!match) {
    throw new Error("Invalid input. Please use the format 'NdX'.")
  }

  const numDice = parseInt(match[1]) || 1 // Number of dice (e.g., 1 or 2)
  const sides = parseInt(match[3]) // Specific sides

  if (sides < 1) {
    throw new Error('The number of sides must be greater than zero.')
  }

  const rolls = Array.from(
    { length: numDice },
    () => Math.floor(Math.random() * sides) + 1,
  )
  const total = rolls.reduce((acc, roll) => acc + roll, 0)
  const characterStore = useCharacterStore()
  characterStore.addRollToHistory(
    `Rolled: ${input} - Rolls: ${rolls.join(', ')} (Total: ${total})`,
  )

  return { rolls, total }
}

export function rollAttribute(rolledCount) {
  switch (rolledCount) {
    case 0:
      return rollDiceWithSkip('5d6', 2, 13)
    case 1:
    case 2:
      return rollDiceWithSkip('4d6', 1, 9)
    default:
      return rollDiceWithSkip('3d6', 0, 0)
  }
}

export function rollDiceWithSkip(input, skipLowest = 0, minValue = 0) {
  return Math.max(
    minValue,
    rollDice(input)
      .rolls.sort((a, b) => a - b)
      .slice(skipLowest) // Drop the lowest two dice
      .reduce((a, b) => a + b, 0),
  )
}

export function rollTheRange(daces, rollRange){
  const{total} = rollDice(daces);
  rollRange.forEach((element, index) => {
    const regex = /^(\d*)?-(\d*)$/
    const match = element.trim().match(regex)

    if (!match) {
      throw new Error("Invalid input. Please use the format 'NdX'.")
    }
    if (total >= match[0] && total <= match[1] )
      return index
  });
}
