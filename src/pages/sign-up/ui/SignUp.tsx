import AuthFormLayout from "../../../shared/ui/auth-form-layout/AuthFormLayout"
import { AuthForm } from "../../../widgets/auth-form"

const SignUp = () => {
  return (
    <AuthFormLayout>
      <AuthForm isSignIn={false}/>
    </AuthFormLayout>
  )
}

export default SignUp
