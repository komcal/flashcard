import { useEffect, useState } from 'react';

function useSavedWords ({ toggleSaveWord }) {
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
    toggleSaveWord(newWord)
  }
  const removeWord = (word) => {
    const newWords = savedWords.filter((w) => w.en !== word.en)
    setSavedWord(newWords)
    toggleSaveWord(word)
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

function useListWords() {
  const [words, setWords] = useState([])
  function toggleSaveWord(word) {
    const index = words.findIndex((w) => w.en === word.en)
    if (index !== -1) {
      words[index].saved = words[index].saved ? false : true
    }
  }
  function setListWord(word) {
    setWords([
      ...words,
      word
    ])
  }
  return {
    listWord: words,
    setListWord,
    toggleSaveWord
  }
}


function useFetchWord({ setListWord, listWord }) {
  const [ currentWord, setCurrentWord ] = useState({})
  const [ loading, setLoading ] = useState(true)
  useEffect(() => {
    fetchWord()
    .then((result) => {
      setCurrentWord(result)
      setListWord(result)
    })
  }, [])
  function onNextWord() {
    if (!currentWord || loading) {
      return
    }
    const index = listWord.findIndex((w) => w.en === currentWord.en)
    if (index === (listWord.length - 1)) {
      setLoading(true)
      fetchWord()
      .then((result) => {
        setCurrentWord(result)
        setListWord(result)
      })
    } else {
      setCurrentWord(listWord[index + 1])
    }
  }
  function onPrevWord() {
    if (!currentWord || loading) {
      return
    }
    const index = listWord.findIndex((w) => w.en == currentWord.en)
    if (index > 0) {
      setCurrentWord(listWord[index - 1])
    }
  }
  useEffect(() => {
    if (currentWord) {
      setLoading(false)
    }
  }, [currentWord])
  return { currentWord, loading, onPrevWord, onNextWord }
}

module.exports = {
  useSavedWords,
  useFetchWord,
  useListWords
}
