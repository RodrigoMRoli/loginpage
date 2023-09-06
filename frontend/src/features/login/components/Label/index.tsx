export default function Label(props: LabelProperties) {

    const label = props.type === "email" ? "Email" : "Password"

    return (
        <label>{ label }</label>
    )
}