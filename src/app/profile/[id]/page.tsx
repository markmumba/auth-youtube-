
export default function userPage({params}: {params: {id: string}}) {
    return (
        <div>
            <h1>User Page</h1>
            <p>id: {params.id}</p>
        </div>
    )
}