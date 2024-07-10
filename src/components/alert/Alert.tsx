export type Props = {
    isSuccess: boolean;
    isFailure: boolean;
    message: string;
}

const Alert = ({isSuccess, isFailure, message}:Props) => {
    return(
        <>
            {isSuccess && 
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-2" role="alert">
                    <p className="font-bold">Success</p>
                    <p>{message}</p>
                </div>
            }
            {isFailure &&
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2" role="alert">
                <p className="font-bold">Failure</p>
                <p>{message}</p>
            </div>
            }
        </>
    )
}

export default Alert;