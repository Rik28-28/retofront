import React, { useState, useEffect, useRef } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import {useQuestionsSubmitContext } from '../context/QuestionsContext'


const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";
const videoConstraints = {
  facingMode: FACING_MODE_USER
};

const styleBtnVideo = {
    display: 'flex',
    justifyContent: "center",
    gap: "50px",
    height: "30px",
    margin: "10px",
}

export default function Video(props) {
  const {questionSubmit,setQuestionSubmit} = useQuestionsSubmitContext()

  const webcamRef = useRef(null);
  const [showData, setShowData] = useState(false);

  const [startBtn, setStartBtn] = useState(false)
  const [pauseBtn, setPauseBtn] = useState(false)
  const [stopBtn, setStoptBtn] = useState(false)

  const [deviceNo, setDeviceNo] = useState(0);
  const [deviceId, setDeviceId] = useState("");
  const [devices, setDevices] = useState([]);

  const handleDevices = React.useCallback(
    (mediaDevices) => setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),[setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  useEffect(() => {
    if (devices.length > 0) {
      setDeviceId(devices[deviceNo].deviceId);
    }
  }, [deviceNo]);

  const [facingMode, setFacingMode] = useState(FACING_MODE_ENVIRONMENT);
  const handleClick = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  const FinishQuestion = (id) => {
    const UpdatequestionSubmit = questionSubmit.map( question =>{
      if (question.id === id){question.answered = true;question.video = 'grabado'}
      return question
    })
    setQuestionSubmit(UpdatequestionSubmit)
    localStorage.setItem("questionsSubmit",JSON.stringify(questionSubmit))
  }

  return (
    <div style={{position:"absolute", margin: "0px 0px", background: "black"}}>
        <ReactMediaRecorder
          video
          render={({status,startRecording,stopRecording,mediaBlobUrl,pauseRecording,}) => (
            <div style={{paddingTop: "15px"}}>
              <div>
                {showData 
                ? null 
                : (
                  <Webcam
                  style={{background: 'black' }}
                    height={250}
                    width={600}
                    audio={false}
                    ref={webcamRef}
                    videoConstraints={{...videoConstraints,facingMode}}/>
                )}
              </div>
              {showData 
              ? (<video height={250}
                width={600} src={mediaBlobUrl}  controls/>) 
              : null}
              <div style={{textAlign:'center', color: '#4fc3f7',fontWeight: '700'}}>
                ¡ {status.toUpperCase()}  !
              </div>
              <div style={styleBtnVideo}>
                <Button
                  color="success"
                  variant="contained"
                  onClick={()=>{startRecording();setStartBtn(!startBtn)}}>
                  Start
                </Button>
                
                <Button
                  color="warning"
                  variant="contained"
                  onClick={pauseRecording}>
                   Pause
                </Button>
  
                <Button
                  disabled = {startBtn? false:true}
                  color="error"
                  variant="contained"
                  onClick={() => {setShowData(true);stopRecording();FinishQuestion(props.id)}}>
                  Stop
                </Button>
              </div>
            </div>
          )}
        />
    </div>
  )
}
