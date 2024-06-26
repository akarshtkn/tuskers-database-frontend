import { useEffect, useState } from "react";
import Heading from "../../components/heading/Heading";
import InputBox from "../../components/inputbox/InputBox";
import Select from "../../components/select/Select";
import Button from "../../components/button/Button";
import { useDebounce } from "../../hooks/useDebounce";
import { Districts } from "../../types/Districts";
import { SelectFieldType } from "../../types/NewTypes";
import { PlusIcon } from "@heroicons/react/20/solid";
import Alert from "../../components/alert/Alert";
import * as Yup from "yup";
import PlayerService from "../../service/PlayerService";
import { ErrorType, PlayerRequest } from "../../types/NewTypes";
import { Loader } from "../../components/loader/Loader";
import { ApiEndPoints } from "../../api/ApiEndpoints";

const initialValue: PlayerRequest = {
    username: "",
    gameId: "",
    district: "", 
};

const defaultSelectValue: SelectFieldType = {
    id:0,
    value:""
}

let PlayerSchema = Yup.object().shape({
    username: Yup.string().required('Username is required').max(25, 'Username must not exceed 40 characters'),
    gameId: Yup.string().required('Game ID is required').min(9, 'Game ID must be atleast 9 characters').max(10, 'Game ID must not exceed 10 characters'),
    district: Yup.string().required('District is required'),
})

const AddPlayer:React.FC = () => {
    const [player, setPlayer] = useState<PlayerRequest>(initialValue);
    const [selected, setSelected] = useState<SelectFieldType>(defaultSelectValue);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<ErrorType>({ value: false, message: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const usernameDebounce = useDebounce(ApiEndPoints.duplicateUsername, player.username.trim(), 2000);
    const gameIdDebounce = useDebounce(ApiEndPoints.duplicateGameId, player.gameId.trim(), 2000);

    useEffect(() => {
        setSuccess(false);
        setError({ value: false, message: '' });
    }, [player.username, player.gameId, player.district]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, property:keyof PlayerRequest) => {
        setPlayer({...player, [property]:e.target.value});
    }

    const handleDistrictChange = (district:SelectFieldType) => {
        setSelected(district);
        setPlayer({ ...player, district: district.value });
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setValidationErrors({});

        try{
            await PlayerSchema.validate(player, { abortEarly:false });

            let{ success, message } = await PlayerService.addPlayer(player);
            if(success) {
                setSuccess(true);
                setLoading(false);
                setTimeout(() => {
                    setSuccess(false);
                    setPlayer(initialValue);
                    setSelected(defaultSelectValue);
                }, 5000);
            } else {
                setError({ value: true, message: message });
                setLoading(false);
                setTimeout(() => {
                    setError({ value: false, message: '' });
                }, 5000)
            }
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors: Record<string, string> = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        errors[error.path] = error.message;
                    }
                });
                setValidationErrors(errors);
            }
            setLoading(false);  
        };
    }

    return(
        <div className="flex flex-col justify-start gap-y-20">
            <div className="flex flex-col justify-start gap-x-16 gap-y-4">
                <Heading title="Add Player" />

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <div className="flex flex-col rounded-lg bg-zinc-800 w-96 h-fit p-6 gap-10">
                                <InputBox label="Username" type="text" value={player.username} placeholder="username" debounce={usernameDebounce} onChange={(e) => handleChange(e,"username")} error={validationErrors.username}/>
                                <InputBox label="Game Id" type="text" value={player.gameId} placeholder="AAA-670-443" debounce={gameIdDebounce} onChange={(e) => handleChange(e, "gameId")} error={validationErrors.gameId}/>
                            </div>
                            <div className="flex flex-col rounded-lg bg-zinc-800 w-96 h-fit p-6 gap-1.5">
                                <Select options={Districts} field={"District"} selectValue={selected} selectfn={handleDistrictChange} error={validationErrors.district}/>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-96 h-12">
                                <Button type="submit" label="Add Player" Icon={PlusIcon} disabled={usernameDebounce || gameIdDebounce}/>
                            </div>
                            {loading && <Loader />}
                        </div>
                    </div>
                </form>
            </div>
            {success && <Alert type="Success" response={{ value:true, message:"Player added to database" }}/>}
            {error.value && <Alert type="Error" response={{ value:true, message:error.message }}/>}
        </div>
    )
}

export default AddPlayer;