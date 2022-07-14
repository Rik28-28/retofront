import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useQuestionsSubmitContext } from '../context/QuestionsContext'
import Video from '../components/Video'
import { Link } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 500,
  borderRadius: 10,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pb: 3,
};

const styleBtnGroup = {
  width: "600px",
  margin: "70px 20px",
  position: "absolute",
  bottom: "-50px"
};


export default function ModalQuestion(props) {
  const {questionSubmit,setQuestionSubmit} = useQuestionsSubmitContext()
  var IdModals = localStorage.getItem('IdModals')
  if(IdModals === null){ IdModals = []}
  else{IdModals = JSON.parse(IdModals)} 

  const NextModals = (id) => {
    var nextId = ''
    for (var i = 0; i < questionSubmit.length; i++) {
      if(!questionSubmit[i].answered){
        if(questionSubmit[i].id !== id){
          nextId = questionSubmit[i].id
          break
        }
      }
    }
    exitCurrentModals(id)
    openModal(nextId)
    IdModals.push(id)
    localStorage.setItem("IdModals",JSON.stringify(IdModals))
  }

  const PrevModals = (id) => {
    exitCurrentModals(id)
    const lastIdModal = IdModals.pop()
    localStorage.setItem("IdModals",JSON.stringify(IdModals.splice(IdModals.length - 1)))
    openModal(lastIdModal) 
  }

  const exitCurrentModals = (id) => {
    const UpdatequestionSubmit = questionSubmit.map( question =>{
      if (question.id === id){question.modalActive = false}
      return question
    })
    setQuestionSubmit(UpdatequestionSubmit)
  }

  const openModal = (id) => {
    const UpdatequestionSubmit = questionSubmit.map( question =>{
      if (question.id === id){question.modalActive = true}
      return question
    })
    setQuestionSubmit(UpdatequestionSubmit)
  }


  const styleBtnState = {
    position: "absolute", 
    right: "10px", 
    background: props.answered? '#388e3c':'#d32f2f',
    fontSize: '18px',
    border: 'none',
  }

  
  return (
    <div>
      <Modal
        open={props.modalActive}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description">
        <Box sx={{ ...style, width: 600 }}>
          <Card
            sx={{ maxWidth: 600, height:515, paddingTop:"15px", position:"relative"}}>
              <Button
                onClick={()=>exitCurrentModals(props.id)}
                color="secondary"
                variant="outlined"
                style={{margin: '2px 20px',}} >
                Menú principal
              </Button>
              <Button 
                style={styleBtnState}
                variant="contained" >
                { props.answered? 'Hecho': 'Falta Hacer'}
              </Button>
            <div
              style={{background: "green", margin: "15px 0",height: "300px", position: "relative"}}>
              <Video id={props.id} />
            </div>
            <CardContent>
                <Typography
                    style={{textAlign: "center", fontSize: "18px", marginTop:"25px"}} 
                    variant="body2" 
                    color="text.secondary">
                    {props.question}
                </Typography>
            </CardContent>
            <ButtonGroup 
              sx={{...styleBtnGroup}}
              variant="" 
              aria-label="outlined primary button group">
              <Button
                disabled={IdModals.length === 0 ? true : false}
                onClick={()=>PrevModals(props.id)}
                variant='outlined'>
                Atrás
              </Button>
              { IdModals.length+1 !== questionSubmit.length && !questionSubmit.answered
               ?  <Button
                    onClick={()=>NextModals(props.id)}
                    variant='contained'
                    disabled = {props.answered? false:true}
                    style={{position: "absolute",right: "30px"}}>
                    Siguiente
                  </Button>
                : <Link to="/congratulations">
                    <Button
                      disabled = {props.answered? false:true}
                      variant='contained'
                      color = 'success'
                      style={{position: "absolute",right: "30px"}}>
                      Enviar Respuestas
                    </Button>
                  </Link>
              }
            </ButtonGroup>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
