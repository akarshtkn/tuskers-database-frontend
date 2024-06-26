export type Props = {
    type:"Success" | "Error";
    response:{
        value:boolean;
        message:string;
    };
}

const Alert = ({type, response}:Props) => {
    return(
        response.value ? (
            type === "Success" ? (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-2" role="alert">
                    <p className="font-bold">Success</p>
                    <p>{response.message}</p>
                </div>
            ) : (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2" role="alert">
                    <p className="font-bold">Failure</p>
                    <p>{response.message}</p>
                </div>
            )
        ) : null
    )
}

export default Alert;