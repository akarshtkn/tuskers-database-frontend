import { useCallback, useState } from "react";
import Heading from "../../components/heading/Heading";
import InputBox from "../../components/inputbox/InputBox";
import Select from "../../components/select/Select";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";
import Alert from "../../components/alert/Alert";
import { useDebounce } from "../../hooks/useDebounce";
import PlayerService from "../../service/PlayerService";
import { ApiEndPoints } from "../../api/ApiEndpoints";
import { Districts } from "../../types/Districts";
import { PlusIcon } from "@heroicons/react/20/solid";
import { PlayerRequest, ApiError, SelectFieldType } from "../../types/Types";
import InputFieldWrapper from "../../components/wrapper/DisplayWrapper";

const initialValue: PlayerRequest = {
    username: '',
    gameId: '',
    district: '', 
};

const defaultSelectValue: SelectFieldType = {
    id:0,
    value:'',
}

const AddPlayer = () => {
    const [player, setPlayer] = useState<PlayerRequest>(initialValue);
    const [selected, setSelected] = useState<SelectFieldType>(defaultSelectValue);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string> | null>(null);

    const usernameDebounce = useDebounce(ApiEndPoints.duplicateUsername, player.username.trim(), 2000);
    const gameIdDebounce = useDebounce(ApiEndPoints.duplicateGameId, player.gameId.trim(), 2000);

    const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>, property:keyof PlayerRequest) => {
        setPlayer({...player, [property]:e.target.value}),[];
    }, [player.username, player.gameId, player.district]);

    const handleDistrictChange = useCallback((district:SelectFieldType) => {
        setSelected(district);
        setPlayer({ ...player, district: district.value });
    }, [player.username, player.gameId, player.district]);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);
        setValidationErrors(null);

        let{ data, error, validationError } = await PlayerService.addPlayer(player);
        if(validationError) {
            setValidationErrors(validationError);
            setLoading(false);
            return;
        };

        if(data) {
            setSuccess(true);
            setLoading(false);
            setTimeout(() => {
                setSuccess(false);
                setPlayer(initialValue);
                setSelected(defaultSelectValue);
            }, 2000);
        };
        if(error) {
            setError(error);
            setLoading(false);
            setTimeout(() => {
                setError(null);
            }, 3500)
        }
    }

    return(
        <div className="flex flex-col justify-start gap-y-4">
            <Heading title="Add Player" />
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="flex justify-between">
                    <InputFieldWrapper>
                        <InputBox label="Username" 
                            type="text" 
                            value={player.username} 
                            placeholder="username" 
                            debounce={usernameDebounce} 
                            onChange={(e) => handleChange(e,"username")} 
                            error={validationErrors?.username}/>
                        <InputBox label="Game Id" 
                            type="text" 
                            value={player.gameId} 
                            placeholder="AAA-670-443" 
                            debounce={gameIdDebounce} 
                            onChange={(e) => handleChange(e, "gameId")} 
                            error={validationErrors?.gameId}/>
                    </InputFieldWrapper>
                    <InputFieldWrapper>
                        <Select options={Districts} 
                            field={"District"} 
                            selectValue={selected} 
                            selectfn={handleDistrictChange} 
                            error={validationErrors?.district}/>
                    </InputFieldWrapper>
                </div>
                <div className="flex mt-4 gap-4">
                    <div className="w-96 h-12">
                        <Button type="submit" 
                            label="Add Player" 
                            Icon={PlusIcon} 
                            disabled={usernameDebounce || gameIdDebounce}/>
                    </div>
                    {loading && <Loader />}
                </div>
            </form>
            <div className="w-96">
                {success && <Alert isSuccess={true} message="Player added to database" />}
                {error && <Alert isFailure={true} message={error.message} />}
            </div>
        </div>
    )
}

export default AddPlayer;