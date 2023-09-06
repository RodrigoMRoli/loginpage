import Card from "../Card";

export default function Layout(props: ParentNodeProps) {
    return (
        <div className="container-md h-100 d-flex align-items-center justify-content-center">
            {props.showForm !== false ? (
                <form>
                    <Card>
                        {props.children}
                    </Card>
                </form>
            ) : (
                <Card>
                    {props.children}
                </Card>
            )}
        </div>
    )
}