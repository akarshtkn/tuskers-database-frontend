import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import Heading from "../../components/heading/Heading";
import { AllDistricts } from "../../types/Districts";
import Select from "../../components/select/Select";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { ApiError, DeletePlayer, PlayerData, SelectFieldType } from "../../types/Types";
import useFetchData from "../../hooks/useFetchData";
import PlayerService from "../../service/PlayerService";
import Loader from "../../components/loader/Loader";
import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import Alert from "../../components/alert/Alert";

const Districts = Object.values(AllDistricts);

const PlayerDetails:React.FC = () => {
    const [districtFilter, setDistrictFilter] = useState<SelectFieldType>(Districts[0]);
    const [usernameFilter, setUsernameFilter] = useState<string>("");
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [deletePlayer, setDeletePlayer] = useState<DeletePlayer>({ id: 0, username: ""});
    const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<ApiError | null>(null);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    const filters = useMemo(() => ({
        username: usernameFilter,
        district: districtFilter.value,
        pageNo: pageIndex.toString(),
    }), [usernameFilter, districtFilter, pageIndex, deleteSuccess]);

    useEffect(() => {
        setPageIndex(0);
    }, [usernameFilter, districtFilter])

    const { data, error, loading } = useFetchData<PlayerData>(PlayerService.getPlayerList, filters);

    const handleDistrictFilter = (district:SelectFieldType) => {
        setDistrictFilter(district);
    }

    const handleSetDeletePlayer = (id: number, username: string) => {
        setDeletePlayer({ id: id, username:username });
        setDeleteModalOpen(true);
    }

    const handleDeletePlayer = async () => {
        setDeleteError(null);
        setDeleteLoading(true);
        setDeleteSuccess(false);
        const { error } = await PlayerService.deletePlayer(deletePlayer.id);
        setDeleteLoading(false);
        if(error) {
            setDeleteError(error);
        } else {
            setDeleteSuccess(true);
        }
        setTimeout(() => {
            setDeleteModalOpen(false);
            setDeleteSuccess(false);
            setDeleteError(null);
        }, 1000)
        
    }

    return(
        <div>
            <div className="flex justify-between">
                <Heading title="Player Details" />
                <Heading title={`Total Players : ${data ? data.totalPlayers : 0}`} />
            </div>
            
            <div className="rounded-lg bg-zinc-800 flex flex-col gap-4 w-full h-full p-4">
                <div className="flex justify-between">
                    <div>
                    <input className="rounded-lg shadow-sm bg-zinc-700 focus:outline-none focus:ring-inset focus:ring-1 focus:ring-amber-500 text-zinc-100 placeholder:text-zinc-500 px-4 h-9 w-64 placeholder:italic"
                        placeholder="Search by username..." 
                        onChange={(e) => setUsernameFilter(e.target.value)}/>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <h1 className="text-zinc-100">Filter by district</h1>
                        <div className="w-52">
                            <Select options={Districts} 
                                selectfn={handleDistrictFilter} 
                                selectValue={districtFilter} />
                        </div>
                    </div>
                </div>

                {!loading && data && data.players.length > 0 && 
                <>
                <table className="table-fixed w-full rtl:text-right">
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
                        {data.players.map((option, index) => (
                            <React.Fragment key={option.id}>
                            <tr className={`text-zinc-100 flex flex-row ${index < 7 && option.id != data.players[data.players.length - 1].id ? "border-solid border-b-2 border-zinc-700 pb-3" : "border-none"}`}>
                                <td className="basis-2/6">{option.username}</td>
                                <td className="basis-1/6">{option.gameId}</td>
                                <td className="basis-2/6">{option.district}</td>
                                <td className="basis-1/12 flex justify-center" >
                                    <button>
                                        <PencilIcon className="hover:text-amber-500 transition ease-in-out delay-100 hover:scale-125 w-5 h-5"/>
                                    </button>
                                </td>
                                <td className="basis-1/12 flex justify-center" onClick={() => handleSetDeletePlayer(option.id, option.username)}>
                                    <button>
                                        <TrashIcon className="hover:text-amber-500 transition ease-in-out delay-100 hover:scale-125 w-5 h-5"/>
                                    </button>
                                </td>
                            </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-end px-4 text-md">
                    <button onClick={() => setPageIndex(prevIndex => prevIndex - 1)} disabled={pageIndex === 0}
                        className="flex justify-center items-center text-amber-500 font-bold px-1 mx-1 disabled:text-zinc-700">
                        {"<"}
                    </button>
                    <span className="text-zinc-100">
                        {pageIndex + 1}
                    </span>
                    <button onClick={() => setPageIndex(prevIndex => prevIndex + 1)} disabled={data ? pageIndex === data?.totalPages -1 : false}
                        className="flex justify-center items-center text-amber-500 font-bold px-1 mx-1 disabled:text-zinc-700">
                        {">"}
                    </button>
                </div>
                </>}
                {loading && <div><Loader /></div>}
                {error && <div className="text-lg text-amber-500">Error loading the data. Try refreshing the page.</div>}
                {!loading && !error && data && data.totalPlayers === 0 && <div className="text-amber-500">No data</div>}
            </div>
            <div>
                <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                    <p className="text-xl text-amber-500 font-bold mb-5">Delete Player</p>
                    <div className="w-full px-4 py-2 text-zinc-50">
                        Are you sure you want to delete player with username :
                        <span className="font-medium text-amber-500"> {deletePlayer.username} </span>
                        ?
                    </div>
                    <div className="flex justify-end px-4 py-2">
                        <button onClick={() => setDeleteModalOpen(false)} className="text-amber-500 px-2 py-1 rounded-md">Cancel</button>
                        <div className="w-16 h-4">
                            <Button type="button" label="Yes" onClick={handleDeletePlayer}/>
                        </div>
                    </div>
                    {deleteLoading && <div><Loader /></div>}
                    {deleteSuccess && <Alert isSuccess={true}  message="Player deleted successfully" />}
                    {deleteError && <Alert isFailure={true} message={deleteError.message} />}
                </Modal>
            </div>
        </div>
    )
}

export default PlayerDetails;