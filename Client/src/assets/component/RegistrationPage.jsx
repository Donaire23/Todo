import WebTemplate from "../common/template/Webtemplate";
import image from '../image/client-img.png';
import { Texts, accountText } from '../Text/titles/Module';
import { btnColor } from '../Text/titles/Color';
import { connect, useDispatch  } from 'react-redux';
import { setName, setEmailAddress, setPassword, setRepeatPass, RegistrationApi } from "../action/Registration";
import CustomSpinner from '../common/Spinner/Spinner';
import { useState } from "react";
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = (props) => {

    const navigation = useNavigate();

    const {name, emailAddress, password, repeatPassword, setName, setEmailAddress, setPassword, setRepeatPass} = props
    const [showSpinner, setShowSpinner] = useState(false)
    const dispatch = useDispatch();

    const handleRegister = async() => {
      setShowSpinner(true);
      try {
          await dispatch(RegistrationApi({ name, emailAddress, password, repeatPassword }));
      } catch(error) {
          throw error
      } finally {
          setTimeout(() => {
              setShowSpinner(false);
          }, 1000); 
      }
    }

    const cookie = Cookies.get("token")

      useEffect(() => {
        if(cookie) {
            navigation('/welcome')
        }
    }, [cookie])


    return (
      <>

        {!cookie ? 

        <>

          <CustomSpinner spin={showSpinner}/>
            <WebTemplate
              hasImage={image}
              hasTitle={Texts.frontText}
              isRegisterPage={true}
              regText={accountText.register}
              bgColor={btnColor.frontpageBtn}
              haveAcc={accountText.alreadyHaveAnAcc}
              name={name}
              email={emailAddress}
              password={password}
              repeatPassword={repeatPassword}
              setName={setName} 
              setEmailAddress={setEmailAddress}
              setPassword={setPassword} 
              setRepeatPass={setRepeatPass}
              disp={handleRegister}
          />

        </>
        
        : null}
        
      </>

    )
}

const mapStateToProps = (state) => ({
  name: state.register.name,
  emailAddress: state.register.emailAddress,
  password: state.register.password,
  repeatPassword: state.register.repeatPassword
});

const mapDispatchToProps = {
  setName,
  setEmailAddress,
  setPassword,
  setRepeatPass
};


export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);