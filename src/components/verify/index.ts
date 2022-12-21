
export const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const putToArray = (object: string, setObject:any, setError: any) => {

    // const newGift = {
    //     gift,
    //     isItFree: true,
    //     isItShare: false,
    // }
    if (validateEmail(object)){
        setObject((prev: []) => {return [...prev, object]})
        setError(null)
    }else{
        setError('Please add a correct email')
    }
}
