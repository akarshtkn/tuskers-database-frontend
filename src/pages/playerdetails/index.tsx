import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import Heading from "../../components/heading";
import { Districts } from "../../types/district";
import { Player } from "../../types/player";
import Select from "../../components/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const options:Player[] = [
    {id:1, username:"Akarsh", gameId:"AAA-567-834", district:Districts.KANNUR},
    {id:2, username:"Ausaf Ahamed", gameId:"AAA-889-456", district:Districts.KOZHIKODE},
    {id:3, username:"Mohammed Unais", gameId:"AAA-667-234", district:Districts.MALAPPURAM},
    {id:4, username:"Akarsh", gameId:"AAA-567-834", district:Districts.KANNUR},
    {id:5, username:"Ausaf Ahamed", gameId:"AAA-889-456", district:Districts.KOZHIKODE},
    {id:6, username:"Mohammed Unais", gameId:"AAA-667-234", district:Districts.MALAPPURAM},
    {id:7, username:"Akarsh", gameId:"AAA-567-834", district:Districts.KANNUR},
    {id:8, username:"Ausaf Ahamed", gameId:"AAA-889-456", district:Districts.KOZHIKODE},
]

const districts = Object.values(Districts);

const PlayerDetails:React.FC = () => {
    const [districtFilter, setDistrictFilter] = useState<Districts>();
    const navigate = useNavigate();

    const handleDistrictFilter = (district:Districts) => {
        setDistrictFilter(district);
    }

    return(
        <div>
            <div className="flex justify-between">
            <Heading title="Player Details" />
            <Heading title="Total Players : 50" />
            </div>
            
            <div className="rounded-lg bg-zinc-800 flex flex-col gap-8 w-full h-full p-4">
                <div className="flex justify-between">
                    <div>
                    <input className="rounded-lg shadow-sm bg-zinc-700 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-amber-500 text-zinc-100 placeholder:text-zinc-500 px-4 h-9 w-64 placeholder:italic"
                        placeholder="Search by username..." />
                    </div>
                    <div className="flex items-center gap-x-4">
                        <h1 className="text-zinc-100">Filter by district</h1>
                        <div className="w-52">
                            <Select options={districts} selectedfn={handleDistrictFilter} />
                        </div>
                    </div>
                </div>
                <table className="table-fixed">
                    <thead className="">
                    <tr className="text-amber-500 flex flex-row">
                        <th className="basis-2/6 text-start">Username</th>
                        <th className="basis-1/6 text-start">Game Id</th>
                        <th className="basis-2/6 text-start">District</th>
                        <th className="basis-1/12">Edit</th>
                        <th className="basis-1/12">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <div className="flex flex-col gap-2.5 pt-2">
                        {options.map((option) => (
                            <>
                            <tr key={option.id} className="text-zinc-100 flex flex-row">
                                <td className="basis-2/6">{option.username}</td>
                                <td className="basis-1/6">{option.gameId}</td>
                                <td className="basis-2/6">{option.district}</td>
                                <td className="basis-1/12 flex justify-center"><PencilIcon className="w-5 h-5"/></td>
                                <td className="basis-1/12 flex justify-center"><TrashIcon className="w-5 h-5"/></td>
                            </tr>
                            {option.id && option.id % 8 != 0 ? <hr className="border-zinc-700"/>:null}
                            </>
                        ))}
                    </div>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PlayerDetails;