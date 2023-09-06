import Button from "../Button";
import FormGroup from "../FormGroup";
import InputLogin from "../InputLogin";
import Label from "../Label";

export default function FormGroupRow(props: Properties) {
    return (
        <FormGroup>
            {
                props.type !== "button" ?
                <>
                    <InputLogin type={ props.type } value={ props.type } />
                    <Label type={ props.type } />
                </> :
                <>
                    <Button type={ props.type } value={"submit"}></Button>
                </>
            }
        </FormGroup>
    )
}