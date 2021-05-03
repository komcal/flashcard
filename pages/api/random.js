import { listWords } from '../../words'
import random from 'random'

export default function handler(req, res) {
  const len = listWords.length
  const index = random.int(0, len - 1)
  const word = listWords[index]
  res.status(200).json({ en: word.en, th: word.th })
}
