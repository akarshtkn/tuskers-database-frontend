import Heading from "../../components/heading";

const PlayerDetails:React.FC = () => {
    return(
        <div>
            <Heading title="Player Details" />
            <div className="rounded-xl bg-zinc-800 flex flex-col gap-8 w-full h-full px-4 py-6">
                <div className="rounded-xl bg-amber-500 flex flex-col gap-8 w-full h-7 px-4">
                <table className="w-full align-middle border-neutral-200">
                    <thead className="align-bottom">
                    <tr className="font-normal text-sm text-zinc-100">
                        <th className="pb-3 text-start min-w-[30px]">No.</th>
                        <th className="pb-3 text-start min-w-[125px]">Username</th>
                        <th className="pb-3 text-end min-w-[100px]">Game Id</th>
                        <th className="pb-3 text-end min-w-[100px]">District</th>
                    </tr>
                    </thead>
                </table>
                </div>
            </div>
        </div>
    )
}

export default PlayerDetails;