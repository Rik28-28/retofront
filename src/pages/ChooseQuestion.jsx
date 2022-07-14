import React, { useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useQuestionsSubmitContext } from '../context/QuestionsContext'
import { Link } from 'react-router-dom';


const styleP = {
    textAlign: "start",
    fontWeight: "700",
    fontSize: "18px"
}

const styleSection = {
    width: "500px",
    margin: "auto",
    background: "#e3f2fd",
    padding:"20px",
}


const ChooseQuestion = () => {

    localStorage.clear();

    const {questionSubmit,setQuestionSubmit} = useQuestionsSubmitContext()

    const optionQuestion1 = "¿Cuál fue tu video juego favorito durante tu infancia?"
    const optionQuestion2 = "¿Cuéntanos, cuáles son tus sueños?"
    const optionQuestion3 = "¿En qué empresas trabajaste?"
    const optionQuestion4 = "¿Qué tecnologías dominas?"

    const [questionsSubmit,setQuestionsSubmit] = useState([])
    const [questionCustom,setQuestionCustom] = useState("")

    
    const handleOnChange = (e) => {
        const state = e.target.checked
        const question = e.target.value
        state ? AddQuestion(question) : RemoveQuestion(question)
    }


    const handleSubmitCustomQuestions = (e) => {
        e.preventDefault()
        if(questionCustom){
            AddQuestion(questionCustom)
        }
        setQuestionCustom("")
    }

    const AddQuestion = (question) => {
        const updateQuestions = [
            ...questionsSubmit,
            {
                id:questionsSubmit.length + 1,
                question: question,
                answered: false,
                modalActive: false,
                video: ''
            }
        ]
        setQuestionsSubmit(updateQuestions);
    }
    
    const RemoveQuestion= (question) => {
        const updateQuestions = questionsSubmit.filter((item) => item.question !== question);
        setQuestionsSubmit(updateQuestions);
    }

    const QuestionsSubmit = () => {
        setQuestionSubmit(questionsSubmit)
        localStorage.setItem('questionsSubmit',JSON.stringify(questionsSubmit));
    }
   

  return (
    <Stack 
        style={{padding: "50px"}} 
        direction="row" >
        <section style={styleSection}>
            <p style={styleP}>
                Marque las preguntas que necesita
            </p>
            <FormGroup>
                <FormControlLabel control={<Checkbox onChange={handleOnChange} value={optionQuestion1}/>} label={optionQuestion1}/>
                <FormControlLabel control={<Checkbox onChange={handleOnChange} value={optionQuestion2}/>} label={optionQuestion2}/>
                <FormControlLabel control={<Checkbox onChange={handleOnChange} value={optionQuestion3}/>} label={optionQuestion3}/>
                <FormControlLabel control={<Checkbox onChange={handleOnChange} value={optionQuestion4}/>} label={optionQuestion4}/>
            </FormGroup>
            <p style={styleP}>
                Si desea agregue más preguntas
            </p>
            <form 
                style={{display: "flex", gap: "15px"}} 
                onSubmit={handleSubmitCustomQuestions}>
                <TextField
                    style={{width:"350px"}} 
                    id="outlined-basic"
                    onChange={(e)=>setQuestionCustom(e.target.value)}
                    margin='dense'
                    value={questionCustom} 
                    label="Ingrese otra pregunta" 
                    variant="outlined"/>
                <Button
                    style={{width:"150px", height: "50px", marginTop:"10px"}} 
                    variant="contained"
                    type="submit">
                        Agregar
                </Button>
            </form>
            <Link to="questions">
                <Button
                    style={{width:"250px", height: "50px", marginTop:"25px", background:"#388e3c"}}
                    variant="contained"
                    onClick={()=>QuestionsSubmit()}>
                    Siguiente página
                </Button>
            </Link>
            <h2 style={{color: "#d32f2f"}}>Preguntas Agregadas</h2>
            <section>
            {
                questionsSubmit.length !== 0 &&
                questionsSubmit.map( ({question},index) =>
                    <p 
                        style={{color: "black", fontWeight: "700",fontSize: "12px"}} 
                        key={index}>
                        {question}
                    </p>
                )
            }
            </section>
        </section>
    </Stack>
  )
}

export default ChooseQuestion