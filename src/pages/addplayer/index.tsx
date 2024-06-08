import { useState } from "react";
import Heading from "../../components/heading";
import InputBox from "../../components/inputbox";
import Select from "../../components/select";
import Button from "../../components/button";
import { useDebounce } from "../../hooks/helper";
import { PlayerRequest, Player, Districts } from "../../types/type";
import { ApiResponse, SelectFieldType } from "../../types/props";
import { PostRequest } from "../../hooks/data";
import { PlusIcon } from "@heroicons/react/20/solid";
import Alert from "../../components/alert";
import * as Yup from "yup";

const initialValue: PlayerRequest = {
    username: "",
    gameId: "",
    district: "", 
};

const defaultSelectValue: SelectFieldType = {
    id:0,
    value:""
}

const defaultApiResponse:ApiResponse = {
    value:false,
    message:"",
}

const AddPlayer:React.FC = () => {
    const [player, setPlayer] = useState<PlayerRequest>(initialValue);
    const [selected, setSelected] = useState<SelectFieldType>(defaultSelectValue);
    // const [success, setSuccess] = useState<ApiResponse>(defaultApiResponse);
    // const [error, setError] = useState<ApiResponse>(defaultApiResponse);
    const [alertType, setAlertType] = useState<"Success" | "Error" | null>(null);
    const [response,setResponse] = useState<ApiResponse>(defaultApiResponse);

    const usernameDebounce = useDebounce("http://localhost:8080/api/v1/player/check?username=" + player.username.trim(), 2000);
    const gameIdDebounce = useDebounce("http://localhost:8080/api/v1/player/check?gameId=" + player.gameId.trim(), 2000);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, property:keyof Player) => {
        setPlayer({...player, [property]:e.target.value});
    }

    const handleDistrictChange = (district:SelectFieldType) => {
        setSelected(district);
        setPlayer({ ...player, district: district.value });
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        PostRequest("http://localhost:8080/api/v1/player/add", player)
            .then((response) => {
                setAlertType("Success");
                setResponse({value:true, message:response.data.username});
                setTimeout(() => {
                    setResponse(defaultApiResponse);
                    setAlertType(null);
                }, 5000);
                setPlayer(initialValue);
                setSelected(defaultSelectValue);
            })
            .catch((error) => {
                setAlertType("Error")
                setResponse({value:true, message:error});
                setTimeout(() => {
                    setResponse(defaultApiResponse);
                    setAlertType(null)
                }, 5000)
            });
    }

    return(
        <div className="flex flex-col justify-start gap-y-20">
            <div className="flex flex-col justify-start gap-x-16 gap-y-4">
                <Heading title="Add Player" />

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <div className="flex flex-col rounded-lg bg-zinc-800 w-96 h-64 p-6 gap-14">
                                <InputBox label="Username" value={player.username} placeholder="username" debounce={usernameDebounce} onChange={(e) => handleChange(e,"username")} />
                                <InputBox label="Game Id" value={player.gameId} placeholder="AAA-670-443" debounce={gameIdDebounce} onChange={(e) => handleChange(e, "gameId")} />
                            </div>
                            <div className="flex flex-col rounded-lg bg-zinc-800 w-96 h-32 p-6 gap-1.5">
                                <Select options={Districts} field={"District"} selectValue={selected} selectfn={handleDistrictChange}/>
                            </div>
                        </div>
                        <Button type={"submit"} width={96} Icon={PlusIcon} />
                    </div>
                </form>
            </div>
            <Alert type={alertType} response={response}/>
        </div>
    )
}

export default AddPlayer;