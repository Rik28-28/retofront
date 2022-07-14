import React,{useState,useContext} from "react"

const QuestionsSubmit = React.createContext([])


export function ProviderQuestionsSubmit ({children}) {
    const [questionSubmit,setQuestionSubmit] = useState([])
    const valor = {questionSubmit,setQuestionSubmit}
    return (
        <QuestionsSubmit.Provider value={valor}>
            {children}
        </QuestionsSubmit.Provider>
    );
}


export function useQuestionsSubmitContext(){
    const context = useContext(QuestionsSubmit)
    if(!context){
        throw new Error('useQuestionsSubmit must be used within a ProviderPreviusPagContext')
    }
    return context
}

