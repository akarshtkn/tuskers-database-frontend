const Heading:React.FC<{title:string}> = ({title}) => {
    return(
        <div className="text-zinc-50 font-medium text-2xl mb-10">{title}</div>
    )
}

export default Heading;