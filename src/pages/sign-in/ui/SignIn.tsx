import AuthFormLayout from "../../../shared/ui/auth-form-layout/AuthFormLayout"
import { AuthForm } from "../../../widgets/auth-form"

const SignIn = () => {
  return (
    <AuthFormLayout>
      <AuthForm isSignIn={true}/>
    </AuthFormLayout>
  )
}

export default SignIn
