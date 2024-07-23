import { HomeIcon, UserPlusIcon, UserGroupIcon, ChartBarIcon } from "@heroicons/react/20/solid";

interface NavbarOptions{
    id:number;
    field:string;
    icon:React.ReactNode;
    route:string;
}

const options:NavbarOptions[] = [
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
        route:"/addPlayer"
    },
    {
        id:3,
        field:"Player Details",
        icon:<UserGroupIcon />,
        route:"/playerDetails"
    },
    {
        id:4,
        field:"Players Statistics",
        icon:<ChartBarIcon />,
        route:"/list"
    }
];

export { options as Options };