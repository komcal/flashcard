import { useState } from 'react';
import Card from '../components/Card';
import { useFetchWord } from '../lib/customUseState'

const Index = () => {
  const [wordIndex, setWordIndex] = useState(0)
  const { currentWord, loading } = useFetchWord(wordIndex)
  const [ translate , setTranslate ] = useState()

  return (
    <div className="min-h-screen flex flex-col  max-w-screen-sm mx-auto">
      <header className="py-8 sm:p-8 px-2 flex justify-between text-xl">
        <a className="link link-active">Flashcard</a>
        <a className="link">My Lists</a>
      </header>
      <div className="w-full flex-1 flex items-center min-h-full px-1 xs:px-2">
        <div className="arrow" onClick={() => wordIndex > 0 && (setWordIndex(wordIndex - 1),
                                                                setTranslate(false))}>
          <svg width="32" height="78" viewBox="0 0 32 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M29 3L3 39L29 75" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="w-4/6">
            <Card word={currentWord} loading={loading} 
              translate = {translate}
              setTranslate = {setTranslate}
            />
        </div>
        <div className="arrow flex justify-end" onClick={() => {
          if (!loading) {
            setWordIndex(wordIndex + 1)
            setTranslate(false)
          }}}>
          <svg width="32" height="78" viewBox="0 0 32 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 75L29 39L3 3" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <footer className="flex flex-wrap py-8 px-2 sm:p-8 items-center justify-between">
        <div>
            <a className="text-white cursor-pointer">Oxford 3000 word list</a>
        </div>
        <div className="flex items-center">
          <a className="social"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 16.0893C0 24.044 5.77733 30.6587 13.3333 32V20.444H9.33333V16H13.3333V12.444C13.3333 8.444 15.9107 6.22267 19.556 6.22267C20.7107 6.22267 21.956 6.4 23.1107 6.57733V10.6667H21.0667C19.1107 10.6667 18.6667 11.644 18.6667 12.8893V16H22.9333L22.2227 20.444H18.6667V32C26.2227 30.6587 32 24.0453 32 16.0893C32 7.24 24.8 0 16 0C7.2 0 0 7.24 0 16.0893Z" fill="white"/>
            </svg></a>
          <a className="social"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM18.1556 7.31429V11.6406C16.3047 11.5586 12.4738 11.7485 9.82848 14.4325C7.55279 16.7396 7.31428 19.7864 7.31428 22.7222C7.31428 22.7222 10.1271 18.0101 18.1556 18.6238V22.8571L22.7287 18.9917L26.5143 15.7919L22.7947 12.0194L18.1556 7.31429Z" fill="white"/>
            </svg></a>
        </div>
      </footer>
    </div>
  )
};
export default Index;
