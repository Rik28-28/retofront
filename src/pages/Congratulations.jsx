import React from 'react'
import {useQuestionsSubmitContext } from '../context/QuestionsContext'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


const Congratulations = () => {
    const {questionSubmit,setQuestionSubmit} = useQuestionsSubmitContext()
  return (
    <div style={{display: "grid", justifyItems: "center", height: "100vh"}}>
        {console.log(JSON.stringify(questionSubmit))}
        <h1 style={{color: "#388e3c"}}> ¡Felicitaciones, sus respuestas fueron enviados!</h1>
        <h2> Puedes ver el archivo enviado en consola</h2>
        <Link to='/'>
            <Button
                style={{width:"150px", height: "50px", marginTop:"10px"}} 
                variant="contained" >
                Regresar
            </Button>
        </Link>

    </div>
  )
}

export default Congratulations