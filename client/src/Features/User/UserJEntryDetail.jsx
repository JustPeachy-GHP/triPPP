export default function UserJEntry ({entry}) {
    console.log(entry)
    return (
    <>
    <div>
        <p>
            { entry.title ? entry.title : entry.timestamp }            
        </p>
    </div>
    </> 
    )
}