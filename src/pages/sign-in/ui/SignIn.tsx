import AuthFormLayout from "../../../shared/auth-form-layout/AuthFormLayout"
import AuthForm from "../../../shared/auth-form/AuthForm"

const SignIn = () => {
  return (
    <AuthFormLayout>
      <AuthForm isSignIn={true}/>
    </AuthFormLayout>
  )
}

export default SignIn
