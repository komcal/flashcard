import { useEffect, useState } from 'react';

function useSavedWords () {
  const initialSavedWords = () => {
    const savedWordsFromStorage = JSON.parse(window.localStorage.getItem('savedWords') || '[]')
    return savedWordsFromStorage
  }
  const [ savedWords, setSavedWord ] = useState(initialSavedWords)
  useEffect(() => {
    localStorage.setItem('savedWords', JSON.stringify(savedWords))
  }, [savedWords])
  const saveWord = (newWord) => {
    setSavedWord([
      ...savedWords,
      newWord
    ])
  }
  const removeWord = (word) => {
    const newWords = savedWords.filter((w) => w.en !== word.en)
    setSavedWord(newWords)
  }
  return {
    savedWords,
    saveWord,
    removeWord
  }
}

function fetchWord() {
  return fetch('/api/random')
  .then((result) => result.json())
  .then((result) => {
    return result
  })
}


function useFetchWord(wordIndex) {
  const [listWord, setListWord] = useState([])
  const [ currentWord, setCurrentWord ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  useEffect(() => {
    if ((wordIndex === 0 && listWord.length === 0) || wordIndex >= listWord.length) {
      setLoading(true)
      fetchWord()
      .then((result) => {
        setCurrentWord(result)
        setLoading(false)
        setListWord([
          ...listWord,
          result
        ])
      })
    } else {
      setCurrentWord(listWord[wordIndex])
    }
  }, [wordIndex])
  useEffect(() => {
    setLoading(false)
  }, [currentWord])
  return { currentWord, loading, listWord }
}

module.exports = {
  useSavedWords,
  useFetchWord
}
