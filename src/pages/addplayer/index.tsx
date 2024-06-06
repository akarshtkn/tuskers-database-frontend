import { useState } from "react";
import Heading from "../../components/heading";
import InputBox from "../../components/inputbox";
import { Player } from "../../types/player";
import Select from "../../components/select";
import { Districts } from "../../types/district";
import Button from "../../components/button";
import useDebounce from "../../hooks/helper";

const initialValue:Player = {
    username:"",
    gameId:"",
    district:Districts.THIRUVANANTHAPURAM,
}
const districts = Object.values(Districts);

const AddPlayer:React.FC = () => {
    const [player, setPlayer] = useState(initialValue);
    const debounce = useDebounce("http://localhost:8080/api/v1/player/check?username=",player.username.trim(), 2000);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, property:keyof Player) => {
        setPlayer({...player, [property]:e.target.value});
    }

    const handleDistrictChange = (district:Districts) => {
        setPlayer({ ...player, district: district });
    }

    const handleButtonClick = () => {
        console.log(player);
    }

    return(
        <div className="flex flex-col justify-start gap-x-16 gap-y-4">
            <Heading title="Add Player" />
            <div className="flex gap-12">
                <div className="rounded-xl bg-zinc-800 w-96 h-max px-4 py-6 text-center flex flex-col gap-8">
                    <div>
                        <InputBox label="Username" placeholder="username" onChange={(e) => handleChange(e,"username")} />
                        {debounce && <div className=" flex justift-start pl-2 mt-2 text-xs italic text-amber-500">*Username already exist</div>}
                    </div>
                    <InputBox label="Game Id" placeholder="AAA-670-443" onChange={(e) => handleChange(e, "gameId")} />
                </div>
                <div className="rounded-xl bg-zinc-800 w-96 h-max px-4 py-6 text-center flex flex-col gap-2">
                    <div className=" flex text-zinc-50 text-xl">District</div>
                    <Select options={districts} selectedfn={handleDistrictChange} selectField={"District"}/>
                </div>
            </div>
            <div className="w-96 h-max text-center flex justify-center">
                <Button onClick={handleButtonClick} />
            </div>
        </div>
    )
}

export default AddPlayer;