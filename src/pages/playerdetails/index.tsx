import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import Heading from "../../components/heading";
import { AllDistricts } from "../../types/type";
import { Player } from "../../types/player";
import Select from "../../components/select";
import { useMemo, useState } from "react";
import { useData } from "../../hooks/data";
import React from "react";

const districts = Object.values(AllDistricts);

const PlayerDetails:React.FC = () => {
    const [districtFilter, setDistrictFilter] = useState<AllDistricts>(AllDistricts.ALL);
    const [usernameFilter, setUsernameFilter] = useState<string>("");
    const [pageIndex, setPageIndex] = useState<number>(0);

    const { data, numberOfPlayers } = 
        useData(`http://localhost:8080/api/v1/player/get?filter=${usernameFilter}&district=${districtFilter}`);

    const players:Player[] = useMemo(() => {
        return data.slice(pageIndex * 8, (pageIndex * 8) + 8);
    },[data, pageIndex])

    const pages = useMemo(() => {
        return Math.ceil(data.length / 8)
    }, [data])

    const handleDistrictFilter = (district:AllDistricts) => {
        setDistrictFilter(district);
    }

    return(
        <div>
            <div className="flex justify-between">
                <Heading title="Player Details" />
                <Heading title={`Total Players : ${numberOfPlayers}`} />
            </div>
            
            <div className="rounded-lg bg-zinc-800 flex flex-col gap-4 w-full h-full p-4">
                <div className="flex justify-between">
                    <div>
                    <input className="rounded-lg shadow-sm bg-zinc-700 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-amber-500 text-zinc-100 placeholder:text-zinc-500 px-4 h-9 w-64 placeholder:italic"
                        placeholder="Search by username..." 
                        onChange={e => setUsernameFilter(e.target.value)}/>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <h1 className="text-zinc-100">Filter by district</h1>
                        <div className="w-52">
                            <Select options={districts} selectedfn={handleDistrictFilter} selectField={"District"}/>
                        </div>
                    </div>
                </div>
                <table className="table-fixed w-full">
                    <thead className="">
                    <tr className="text-amber-500 flex flex-row">
                        <th className="basis-2/6 text-start">Username</th>
                        <th className="basis-1/6 text-start">Game Id</th>
                        <th className="basis-2/6 text-start">District</th>
                        <th className="basis-1/12">Edit</th>
                        <th className="basis-1/12">Delete</th>
                    </tr>
                    </thead>
                    <tbody className="flex flex-col gap-2.5 pt-2">
                        {players.map((option, index) => (
                            <React.Fragment key={option.id}>
                            <tr className="text-zinc-100 flex flex-row">
                                <td className="basis-2/6">{option.username}</td>
                                <td className="basis-1/6">{option.gameId}</td>
                                <td className="basis-2/6">{option.district}</td>
                                <td className="basis-1/12 flex justify-center"><PencilIcon className="w-5 h-5"/></td>
                                <td className="basis-1/12 flex justify-center"><TrashIcon className="w-5 h-5"/></td>
                            </tr>
                            {(index < 7 && option.id != data[data.length - 1].id) && (
                                <tr>
                                    <hr className="border-zinc-700"/>
                                </tr>
                            )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end px-4 text-md">
                    <button onClick={() => setPageIndex(prevIndex => prevIndex - 1)} disabled={pageIndex === 0}
                        className="flex justify-center items-center text-amber-500 font-bold px-1 mx-1 disabled:text-zinc-700">{"<"}</button>
                    <span className="text-zinc-100">{pageIndex + 1}</span>
                    <button onClick={() => setPageIndex(prevIndex => prevIndex + 1)} disabled={pageIndex === pages-1}
                        className="flex justify-center items-center text-amber-500 font-bold px-1 mx-1 disabled:text-zinc-700">{">"}</button>
                </div>
            </div>
        </div>
    )
}

export default PlayerDetails;