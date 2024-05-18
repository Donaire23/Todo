import React, { useState } from 'react';
import WebTemplate from "../common/template/Webtemplate";
import image from '../image/client-img.png';
import { Texts, accountText } from '../Text/titles/Module';
import { btnColor } from '../Text/titles/Color';
import { connect, useDispatch } from 'react-redux';
import { setEmailAddress, setPassword } from '../action/loginAction';
import { LoginBtn } from '../action/loginAction';
import CustomSpinner from '../common/Spinner/Spinner';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {

    const dispatch = useDispatch();
    const navigation = useNavigate();
    const cookie = Cookies.get('token')
    const { email, password, setEmailAddress, setPassword } = props;
    const [showSpinner, setShowSpinner] = useState(false)

        const handleLogin = async () => { 
            setShowSpinner(true);
            try {
                await dispatch(LoginBtn({ email, password }));
            } catch(error) {
                throw error
            } finally {
                setTimeout(() => {
                    setShowSpinner(false);
                }, 1000); 
            }
        };


        useEffect(() => {
            if(cookie) {
                navigation('/register')
            }
        }, [cookie])


  
    return (

        <>
            {!cookie ? 
                <>
                    <CustomSpinner spin={showSpinner}/>
                    <WebTemplate
                        isLoginPage={true}
                        hasImage={image}
                        hasTitle={Texts.frontText}
                        signInText={accountText.signIn}
                        loginBtn={accountText.signIn}
                        bgColor={btnColor.frontpageBtn}
                        dontHaveAnAcc={accountText.dontHaveAnAcc}
                        email={email}
                        password={password}
                        setEmailAddress={setEmailAddress} 
                        setPassword={setPassword} 
                        disp={handleLogin}
                    />
                </>
            
            : null}
           
        </>

       

    );
}

const mapStateToProps = (state) => ({
    email: state.login.emailAddress,
    password: state.login.password
});

const mapDispatchToProps = {
    setEmailAddress,
    setPassword
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
