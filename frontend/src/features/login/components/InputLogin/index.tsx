export default function InputLogin(props: Properties) {

    let inputType = 'text';
    let inputId = 'auth_email';

    if (props.type === 'password') {
        inputType = 'password';
        inputId = 'auth_pass';
    }

    return (
        <input
            className="form-control"
            type={ inputType }
            id={ inputId }
            placeholder= { props.type !== 'password' ? "example@email.com" : "********"}
        />
    );
}