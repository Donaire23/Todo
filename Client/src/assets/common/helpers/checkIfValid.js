
import { useSelector } from "react-redux";

export const checkIfValid = (state) => {
    const errorRegister = useSelector((state) => state.register.errorRegister);
    const rejected = useSelector((state) => state.login.rejected);

    if (errorRegister) {
        return errorRegister;
    } 
    if (rejected) {
        return rejected;
    }
    
    return null; 
}
