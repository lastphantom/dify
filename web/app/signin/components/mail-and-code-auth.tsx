import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter, useSearchParams } from 'next/navigation'
import Input from '@/app/components/base/input'
import Button from '@/app/components/base/button'
import { emailRegex } from '@/config'
import Toast from '@/app/components/base/toast'
import { sendEMailLoginCode } from '@/service/common'

type MailAndCodeAuthProps = {
  isInvite: boolean
}

export default function MailAndCodeAuth({ isInvite }: MailAndCodeAuthProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailFromLink = searchParams.get('email') as string
  const [email, setEmail] = useState(isInvite ? emailFromLink : '')
  const [loading, setIsLoading] = useState(false)

  const handleGetEMailVerificationCode = async () => {
    try {
      if (!email) {
        Toast.notify({ type: 'error', message: t('login.error.emailEmpty') })
        return
      }

      if (!emailRegex.test(email)) {
        Toast.notify({
          type: 'error',
          message: t('login.error.emailInValid'),
        })
        return
      }
      setIsLoading(true)
      const ret = await sendEMailLoginCode(email)
      if (ret.result === 'success') {
        localStorage.setItem('leftTime', '59000')
        router.push(`/signin/check-code?token=${encodeURIComponent(ret.data)}&email=${encodeURIComponent(email)}`)
      }
    }
    catch (error) {
      console.error(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (<form onSubmit={() => { }}>
    <div className='mb-2'>
      <label htmlFor="email" className='my-2 block text-sm font-medium text-text-secondary'>{t('login.email')}</label>
      <div className='mt-1'>
        <Input id='email' type="email" disabled={isInvite} value={email} placeholder={t('login.emailPlaceholder') as string} onChange={e => setEmail(e.target.value)} className="px-3 h-9" />
      </div>
      <div className='mt-3'>
        <Button loading={loading} disabled={loading} variant='primary' className='w-full' onClick={handleGetEMailVerificationCode}>{t('login.continueWithCode')}</Button>
      </div>
    </div>
  </form>
  )
}