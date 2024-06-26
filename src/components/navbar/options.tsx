import { HomeIcon, UserPlusIcon, UserGroupIcon, ChartBarIcon } from "@heroicons/react/20/solid";

interface NavbarOptions{
    id:number;
    field:string;
    icon:React.ReactNode;
    route:string;
}

export const options:NavbarOptions[] = [
    {
        id:1,
        field:"Home",
        icon:<HomeIcon />,
        route:"/"
    },
    {
        id:2,
        field:"Add Player",
        icon:<UserPlusIcon />,
        route:"/player-add"
    },
    {
        id:3,
        field:"Player Details",
        icon:<UserGroupIcon />,
        route:"/player-details"
    },
    {
        id:4,
        field:"Players Statistics",
        icon:<ChartBarIcon />,
        route:"/list"
    }
];