import { setErrors } from "../../store/store";

const getErrorArray = (errors:any) => {
    let arr = []
    arr.push(errors)
    // setErrors(arr)

    console.log(errors)

};

export default getErrorArray;
