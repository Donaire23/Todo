import "../commonStyle/Common.css"
import { Link } from 'react-router-dom';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { checkIfValid } from "../helpers/checkIfValid";
import { useState, useRef, useEffect } from "react";
import EditDateEPicker from "../commonStyle/dateEdit";


  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
            '& .MuiInputLabel-root': {
              color: 'black', 
            },
            '& .MuiOutlinedInput-root': {
              borderColor: 'red'
            },
          },
        },
      },
    },
  });


const WebTemplate = (props) => {

  const error = checkIfValid();

    const [key, setKey] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)
    const taskRef = useRef(null);
    const keyId = useRef()

    useEffect(() => {
      if(key) {
        taskRef.current.focus(); 
      }
    }, [key])

    return (
      <div className="wrapper d-flex">
        
        {props.hasImage ? 
            <div 
                className="d-flex  flex-column" 
                style={{height: '100vh', width: "50vw", backgroundColor: 'black', color: 'whitesmoke'}}
            >

              {props.hasTitle ? 
                <h2 
                  className="mt-2 ms-2" 
                  style={{width: "5px"}}
                >
                  {props.hasTitle}
                </h2> : null}

              {props.hasImage ? 

                <img 
                  src={props.hasImage} 
                  className="loginImage"
                  style={{height: '550px', width: "700px", alignSelf: 'center'}}
                /> 

                : null} 

           </div>  
      
        : null}

        {props.isFrontPage && props.isFrontPage ? 
      
            <div 
              className="d-flex align-items-center justify-content-center" 
              style={{height: '100vh', width: "50vw"}}
            >

              <div 
                className="ps-5 pe-5"
              >

              {props.frontTitle ? 
                <h1>{props.frontTitle}</h1> 
              : null}

                {props.frontDescription ? 
                  <p>
                    {props.frontDescription}
                  </p> : null}

              <div className="d-flex justify-content-center"> 

                {props.getStrtBtn ? 

                    <Link 
                      to='#' 
                      className="col-lg-12"
                    >

                      <button 

                          style={{backgroundColor: `${props.bgColor}`, borderRadius: '5px', border: 'none', fontWeight: '600'}} 
                          className="col-lg-12 pt-2 pb-2">
                          {props.getStrtBtn}

                      </button>

                    </Link>

               : null}

              </div>

              <div 
                className="d-flex justify-content-center pt-4"
              >

                {props.haveAcc ? 

                  <Link 
                    to='/login'>

                      <button 
                       style={{border: 'none', backgroundColor: 'white'}}
                      >
                        {props.haveAcc}
                    </button> 
                  </Link>
                  : null}
              </div>
              </div>
            </div>
        : null}

        

        {/* Login Page */}
        {props.isLoginPage && props.isLoginPage ? 

          <div 
            className="d-flex align-items-center justify-content-center" 
            style={{height: '100vh', width: "50vw"}}
          >

              <div 
                className="col-lg-10"
              >
                
                {props.signInText ? 

                    <h2 className="fw-bold">{props.signInText}</h2> 
                    

                  : null}

                  <form 
                    className="d-flex flex-column mt-2 col-lg-12"
                    onSubmit={(e) => {
                      e.preventDefault(); 
                      props.disp(); 
                    }}
                  >  
                      <TextField  
                        value={props.email}  
                        onChange={(e) => props.setEmailAddress(e.target.value)} 
                        label='Email Address' 
                        className="register-input mt-1 mb-1 pt-2 pb-2 col-lg-12"
                      />
                      {error && (error === "Email not found" || error === "Please type your email") ? <span className="error-message mt-2 mb-4">*{error}</span> : null}
                      <TextField  
                        type="password"
                          value={props.password}
                          onChange={(e) => props.setPassword(e.target.value)}
                          label='Password' 
                        className="register-input mt-1 mb-1 pt-2 pb-2 col-lg-12"
                      />
                      {error && (error === 'Incorrect password' || error === "Please type your password") ? <span className="error-message mt-1 mb-1">*{error}</span> : null}
                      
                      {props.loginBtn ? 
                          <button  
                            type="submit"
                            className="col-lg-12 pt-2 pb-2 mt-4" 
                            style={{backgroundColor: `${props.bgColor}`, border: 'none', borderRadius: '5px', fontWeight: '600'}}
                          >
                            {props.loginBtn}
                          </button> 
                            : null}
                  </form>

                  {props.dontHaveAnAcc ? 
                    <Link to='/register' className="text-center mt-3">
                        <button 
                        style={{border: 'none', backgroundColor: 'white'}}
                        className="text-center col-lg-12 mt-2"
                        >
                          {props.dontHaveAnAcc}
                      </button> 
                    </Link>
                : null}
              </div>

          </div>

          : null}

        {props.isRegisterPage && props.isRegisterPage ? 

          <div className="d-flex align-items-center flex-column justify-content-center" style={{height: '100vh', width: "50vw"}}>
            
            <div className="d-flex flex-column justify-content-center col-lg-8">
              <div className="d-flex flex-column">
              <ThemeProvider theme={theme}>
                <TextField value={props.name}   
                   onChange={(e) => props.setName(e.target.value)} 
                   label='Name'  
                   className="register-input mt-1 mb-1 pt-2 pb-2"
                  />
                   {error && (error === "Please type your name") ? <span className="error-message mt-1 mb-1">*{error}</span> : null}
                <TextField value={props.email}  
                    onChange={(e) => props.setEmailAddress(e.target.value)}   
                    label='Email Address' variant='outlined' 
                    className="register-input mt-1 mb-1 pt-2 pb-2"
                  />
                  {error && error === "Invalid email address" ? <span className="error-message mt-1  mb-2">{error}</span> : null}
                <TextField value={props.password}  
                    onChange={(e) => props.setPassword(e.target.value)} 
                    label='Password' variant='outlined' 
                    className="register-input mt-1 mb-1 pt-2 pb-2"
                />
                {error && error === "Invalid password" ? <span className="error-message mt-1  mb-3">{error}</span> : null}
                <TextField  value={props.repeatPassword}  onChange={(e) => props.setRepeatPass(e.target.value)}  label='Repeat Password' variant='outlined' className="register-input mt-1 mb-1 pt-2 pb-2"/>
                {error && error === "Password does not match" ? <span className="error-message mt-1  mb-2">{error}</span> : null}
                </ThemeProvider>
              </div>
              <button 
                 className="col-lg-12 pt-2 pb-2" 
                 style={{backgroundColor: `${props.bgColor}`, border: 'none', borderRadius: '5px', fontWeight: '600'}}
                 onClick={() => props.disp()}
                >
                  {props.regText}
                </button>

                {props.haveAcc ? 
                  <Link to='/login' className="text-center mt-2">
                      <button 
                       style={{border: 'none', backgroundColor: 'white'}}
                       className="text-center"
                      >
                        {props.haveAcc}
                     </button> 
                  </Link>
                  : null}
            </div>
     
          </div>
              
        : null}


        {props.showPage === 'Today Tasks' || props.showPage === 'Delay Tasks' || props.showPage === 'Upcomming Tasks' ?

          <div 
            className="col-lg-12">
            <h1>
              {props.showPage}
                <span 
                  className="ms-4 ps-3 pe-3 border" 
                  style={{ borderRadius: '5px' }}
                >
                  {props.itemSources && props.itemSources.length > 0 ? (
                    <>{props.itemSources.length}</>
                  ) : (
                    <>0</>
                  )}
                </span>
            </h1> 

            <div 
              className="border col-lg-12 pt-2 pb-2 mt-5" 
              style={{borderRadius: '5px'}}
            >
              <button 
                  className="ms-3 ps-4 pe-5 pt-1 pb-1 fs-6" 
                  style={{border: 'none', backgroundColor: 'white', fontWeight: '600', color: 'rgba(0,0,0,0.6)'}}
                  onClick={() => props.showModal()}
              >
                  <span className="me-3 fs-5">
                  +
                  </span>
                  {props.addTask}
              </button>
            </div>

            <div>

             {props.itemSources && props.itemSources.map((val) => {
              
              return (
                <div 
                 className="mt-3 mb-3 pt-3 pb-3 d-flex align-items-center justify-content-between col-lg-12" 
                 style={{borderBottom: '1px solid rgba(0,0,0,0.2)'}}
                 id={val._id}
                 key={val._id}
                >

                  <div>

                    <div>

                      <input 
                      type="checkbox" 
                      className="ms-3 me-2 checkBox"
                      />

                      <input 
                      defaultValue={val.task_name}
                      onChange={(e) => props.setEditTask(e.target.value)}
                      style={{border: 'none', width: '500px'}} 
                      className="input-task col"
                      disabled={val._id === key ? !isDisabled : isDisabled}
                      ref={key === val._id ? taskRef : null}
                      />  

                    </div>

                    <input 
                     defaultValue={val.task_description}
                     onChange={(e) => props.setEditDescription(e.target.value || val.task_description)}
                     style={{border: 'none', width: '500px', marginLeft: '36px'}} 
                     className="input-task col"
                     disabled={val._id === key ? !isDisabled : isDisabled}
                    />  

                   <EditDateEPicker
                    taskVal={val.task_date}
                    newDate={props.editDateVal}
                    setEditDate={props.setEditDate}
                    disabled={val._id === key ? !isDisabled : isDisabled}
                    ref={val._id === key ? taskRef : null}
                   />

                  </div>

                  <div 
                   className="col-lg-1 d-flex"
                  >

      
                    {key === val._id ? 

                      <button
                        onClick={() => {
                          setKey('')
                          props.handleEditedTask(val._id)
                        }}
                        style={
                          {border: 'none', 
                          backgroundColor: 'white', 
                          marginLeft: '5px', 
                          marginRight: '20px'}
                          }
                      >
                        <i 
                          class="fa-solid fa-check"
                        >
                        </i>
                      </button> 
                      
                      : 


                        <button 
                          onClick={() =>{
                                setKey(val._id)
                            }}
                            style={
                              {border: 'none', 
                              backgroundColor: 'white', 
                              marginLeft: '5px', 
                              marginRight: '20px'
                            }
                          }
                          >
                          <i 
                            class="fa-solid fa-pen"
                          >                   
                          </i>
                        </button>                    
                      }

                      <button 
                       onClick={() => props.handleDeleteTask(val._id)} 
                       style={{border: 'none', backgroundColor: 'white'}}
                      >
                        <i 
                         class="fa-solid fa-trash-can"
                        >
                        </i> 
                      </button>

                  </div> 
                </div>
              )
             })}
            </div>
          </div>
        : null}
      </div>

    )
}

export default WebTemplate