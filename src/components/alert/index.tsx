import { AlertProps } from "../../types/props"

const Alert = ({type, response}:AlertProps) => {
    return(
        response.value ? (
            type === "Success" ? (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 w-96 px-4 py-2" role="alert">
                    <p className="font-bold">Success</p>
                    <p>Player user added to database.</p>
                </div>
            ) : (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 w-96 px-4 py-2" role="alert">
                    <p className="font-bold">Failure</p>
                    <p>Please try again.</p>
                </div>
            )
        ) : null
    )
}

export default Alert;