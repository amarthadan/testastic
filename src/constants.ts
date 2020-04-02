export type ExerciseType = {
  id: string
  title: string
}

export const exerciseTypes: Array<ExerciseType> = [
  {
    id: 'free-text',
    title: 'Free Text',
  },
  {
    id: 'word-order',
    title: 'Word Order',
  },
]

export const defaultExerciseType = exerciseTypes[0]
