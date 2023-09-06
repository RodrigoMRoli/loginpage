export default function Card(props: ParentNodeProps) {
    return (
        <div className="card py-4">
            <h5 className="card-title text-center">Login</h5>
            <div className="card-body d-flex flex-column row-gap-2">
                {props.children}
            </div>
        </div>
    )
}