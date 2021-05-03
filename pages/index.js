import { useEffect, useState } from 'react';
import Card from '../component/Card';


function useFetchWord(wordIndex) {
  const [listWord, setListWord] = useState([])
  const [ currentWord, setCurrentWord ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  useEffect(() => {
    if ((wordIndex === 0 && listWord.length === 0) || wordIndex >= listWord.length) {
      setLoading(true)
      fetch('/api/random')
      .then((result) => result.json())
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

const Index = () => {
  const [wordIndex, setWordIndex] = useState(0)
  const { currentWord } = useFetchWord(wordIndex)
  return (
    <div className="min-h-screen flex flex-col  max-w-screen-sm mx-auto">
      <header className="p-8 flex justify-between text-lg">
        <a className="link link-active">Flashcard</a>
        <a className="link">My Lists</a>
      </header>
      <div className="w-full flex flex-1 items-center min-h-full">
        <div className="arrow" onClick={() => wordIndex > 0 && setWordIndex(wordIndex - 1)}>
          <svg width="32" height="78" viewBox="0 0 32 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29 3L3 39L29 75" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div className="flex-1">
            <Card word={currentWord} />
        </div>
        <div className="arrow" onClick={() => setWordIndex(wordIndex + 1)}>
          <svg width="32" height="78" viewBox="0 0 32 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 75L29 39L3 3" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <footer className="flex flex-wrap p-8 items-center justify-between">
        <div>
            <a className="text-white">Oxford 3000 word list</a>
        </div>
        <div className="flex items-center">
          <a className="social"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 16.0893C0 24.044 5.77733 30.6587 13.3333 32V20.444H9.33333V16H13.3333V12.444C13.3333 8.444 15.9107 6.22267 19.556 6.22267C20.7107 6.22267 21.956 6.4 23.1107 6.57733V10.6667H21.0667C19.1107 10.6667 18.6667 11.644 18.6667 12.8893V16H22.9333L22.2227 20.444H18.6667V32C26.2227 30.6587 32 24.0453 32 16.0893C32 7.24 24.8 0 16 0C7.2 0 0 7.24 0 16.0893Z" fill="white"/>
            </svg></a>
          <a className="social"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM18.1556 7.31429V11.6406C16.3047 11.5586 12.4738 11.7485 9.82848 14.4325C7.55279 16.7396 7.31428 19.7864 7.31428 22.7222C7.31428 22.7222 10.1271 18.0101 18.1556 18.6238V22.8571L22.7287 18.9917L26.5143 15.7919L22.7947 12.0194L18.1556 7.31429Z" fill="white"/>
            </svg></a>
        </div>
      </footer>
    </div>
  )
};
export default Index;
