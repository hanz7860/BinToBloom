import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const RegisterForm = dynamic(() => import('./RegisterForm'), {
  ssr: false, // 🛡️ disables SSR for this component
})

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterForm />
    </Suspense>
  )
}
