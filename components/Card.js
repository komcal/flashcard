import { useState } from "react"
import { useSavedWords } from '../lib/customUseState'
import CardInner from './CardInner'

export default function Card(props) {
    const { saveWord, removeWord } = useSavedWords({ toggleSaveWord: props.toggleSaveWord })
    return (
        <div className={`${props.translate ? 'flip-card' : ''} h-80 w-54 sm:w-72 xs:px-0 word-break mx-auto flex flex-col cursor-pointer`}
        >
            { !props.loading ?
                    <div className="bg-white rounded-xl shadow-xl h-full flex justify-center items-center">
                        <p className="text-3xl xs:text-4xl">...</p>
                    </div>
                    :
                    (
                        props.translate ?
                            <CardInner
                                side = 'back'
                                translate = {props.translate}
                                setTranslate = {props.setTranslate}
                                addtoMyList = {props.word.saved}
                                onSave={() => !props.word.saved ? saveWord(props.word) : removeWord(props.word)}
                                word = {props.word.th}
                            />
                            :
                            <CardInner
                                side = 'front'
                                translate = {props.translate}
                                setTranslate = {props.setTranslate}
                                addtoMyList = {props.word.saved}
                                onSave={() => !props.word.saved ? saveWord(props.word) : removeWord(props.word)}
                                word = {props.word.en}
                            />
                    )
                }
        </div>
    )
}
