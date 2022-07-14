import React from 'react'
import Question from '../components/Question'
import {useQuestionsSubmitContext } from '../context/QuestionsContext'
import ModalQuestion from '../components/ModalQuestion'


const styleDiv = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 300px)",
  justifyContent: "center",	
  gap: "50px",
  margin: "100px 100px"
}

const styleH1 = {
  fontSize: "50px",
  color: "red"
}


const Questions = () => {
  const {questionSubmit,setQuestionSubmit} = useQuestionsSubmitContext()

  const handleOpenModal = (index) => {
    const UpdatequestionSubmit = questionSubmit.map( question =>
      question.id === index 
      ? {
          id:question.id,
          question: question.question,
          answered: question.answered,
          modalActive: true
        }
      : question
    )
    console.log(UpdatequestionSubmit)
    setQuestionSubmit(UpdatequestionSubmit)
  }
  

  return (
    <section >
        <h1 style={styleH1}>Responda todas las preguntas</h1>
        <div style={styleDiv}>
          {questionSubmit.map( (question,index) =>
          <div key={"question"+index}>
            <div   onClick={()=>handleOpenModal(question.id)}>
              <Question {...question}/>
            </div>
            <ModalQuestion   {...question}/>
          </div> 
          )}
        </div>
    </section>
  )
}

export default Questions