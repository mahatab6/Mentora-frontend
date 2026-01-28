import { SignupTutorForm } from "@/components/authComponents/signup-tutor-form";


export default function SignUpTutor() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
       <SignupTutorForm/>
      </div>
    </div>
  )
}
