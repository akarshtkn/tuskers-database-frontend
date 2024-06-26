import { useEffect, useState } from "react";
import Heading from "../../components/heading";
import InputBox from "../../components/inputbox";
import Select from "../../components/select";
import Button from "../../components/button";
import { useDebounce } from "../../hooks/helper";
import { Districts } from "../../types/type";
import { SelectFieldType } from "../../types/props";
import { PlusIcon } from "@heroicons/react/20/solid";
import Alert from "../../components/alert";
import * as Yup from "yup";
import PlayerService from "../../service/PlayerService";
import { Player, PlayerRequest } from "../../types/NewTypes";
import { Loader } from "../../components/loader";
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
})

const AddPlayer:React.FC = () => {
    const [player, setPlayer] = useState<PlayerRequest>(initialValue);
    const [selected, setSelected] = useState<SelectFieldType>(defaultSelectValue);

    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Player>({} as Player);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const usernameDebounce = useDebounce(ApiEndPoints.duplicateUsername + player.username.trim(), 2000);
    const gameIdDebounce = useDebounce(ApiEndPoints.duplicateGameId + player.gameId.trim(), 2000);

    useEffect(() => {
        setSuccess(false);
        setError(false);
        setErrorMessage('');
        setData({} as Player);
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

            let{ data, success, error } = await PlayerService.addPlayer(player);
            if(success) {
                setSuccess(true);
                setData(data);
                setLoading(false);
                setTimeout(() => {
                    setSuccess(false);
                    setPlayer(initialValue);
                    setSelected(defaultSelectValue);
                }, 5000);
            } else {
                setError(true);
                setErrorMessage(error);
                setLoading(false);
                setTimeout(() => {
                    setError(false);
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
                            <div className="flex flex-col rounded-lg bg-zinc-800 w-96 h-64 p-6 gap-14">
                                <InputBox label="Username" type="text" value={player.username} placeholder="username" debounce={usernameDebounce} onChange={(e) => handleChange(e,"username")} error={validationErrors.username}/>
                                <InputBox label="Game Id" type="text" value={player.gameId} placeholder="AAA-670-443" debounce={gameIdDebounce} onChange={(e) => handleChange(e, "gameId")} error={validationErrors.gameId}/>
                            </div>
                            <div className="flex flex-col rounded-lg bg-zinc-800 w-96 h-32 p-6 gap-1.5">
                                <Select options={Districts} field={"District"} selectValue={selected} selectfn={handleDistrictChange}/>
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
            {success && <Alert type="Success" response={{value:true, message:`Player added with username : ${data.username}`}}/>}
            {error && <Alert type="Error" response={{value:true, message:errorMessage}}/>}
        </div>
    )
}

export default AddPlayer;