import AuthFormLayout from "../../../shared/auth-form-layout/AuthFormLayout"
import AuthForm from "../../../shared/auth-form/AuthForm"

const SignUp = () => {
  return (
    <AuthFormLayout>
      <AuthForm isSignIn={false}/>
    </AuthFormLayout>
  )
}

export default SignUp
