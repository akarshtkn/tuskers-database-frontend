export type Props = {
    isSuccess?: boolean;
    isFailure?: boolean;
    message: string;
}

const Alert = ({isSuccess = false, isFailure = false, message}:Props) => {
    return(
        <>
            {isSuccess && 
                <div className="bg-green-100 rounded-lg border-green-500 text-green-700 px-4 py-2" role="alert">
                    <p>{message}</p>
                </div>
            }
            {isFailure &&
                <div className="bg-red-100 rounded-lg border-red-500 text-red-700 px-4 py-2" role="alert">
                <p>{message}</p>
            </div>
            }
        </>
    )
}

export default Alert;