import WebTemplate from '../common/template/Webtemplate';
import image from '../image/client-img.png'
import  { Texts, accountText, btnText } from '../Text/titles/Module';
import {btnColor} from '../Text/titles/Color'


const FrontPage = () => {   
        
    return (
        <WebTemplate
         isFrontPage={true}
         hasImage={image}
         hasLoginPage={true}
         hasTitle={Texts.frontText}
         frontTitle={Texts.frontSecText}
         frontDescription={Texts.frontDescription}
         getStrtBtn={btnText.getStarted}
         bgColor={btnColor.frontpageBtn}
         haveAcc={accountText.alreadyHaveAnAcc}
        />

    )

}

export default FrontPage