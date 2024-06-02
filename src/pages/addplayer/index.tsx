import { useState } from "react";
import Heading from "../../components/heading";
import InputBox from "../../components/inputbox";
import { Player } from "../../types/player";
import Select from "../../components/select";
import { Districts } from "../../types/district";
import Button from "../../components/button";

const initialValue:Player = {
    username:"",
    gameId:"",
    district:Districts.THIRUVANANTHAPURAM,
}
const districts = Object.values(Districts);

const AddPlayer:React.FC = () => {
    const [player, setPlayer] = useState(initialValue);

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
                    <InputBox label="Username" placeholder="akarsh" onChange={(e) => handleChange(e,"username")} />
                    <InputBox label="Game Id" placeholder="AAA-670-443" onChange={(e) => handleChange(e, "gameId")} />
                </div>
                <div className="rounded-xl bg-zinc-800 w-96 h-max px-4 py-6 text-center flex flex-col gap-2">
                    <div className=" flex text-zinc-50 text-xl">District</div>
                    <Select options={districts} selectedfn={handleDistrictChange}/>
                </div>
            </div>
            <div className="w-96 h-max text-center flex justify-center">
                <Button onClick={handleButtonClick} />
            </div>
        </div>
    )
}

export default AddPlayer;