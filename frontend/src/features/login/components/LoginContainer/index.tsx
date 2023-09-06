import FormGroupRow from "../FormGroupRow";
import Layout from "../Layout";

export default function LoginContainer() {
    return (
        <Layout>
            {/* logo */}
            <FormGroupRow type={"email"} value={"email"} />
            <FormGroupRow type={"password"} value={"password"} />
            <FormGroupRow type={"button"} value={"login"} />
        </Layout>
    )
}