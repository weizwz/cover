import React, { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CircleCheck, CircleX } from 'lucide-react'

const CenteredAlert: React.FC<CenteredAlertProps> = ({ type, title, message, onClose }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 2000)

    const closeTimer = setTimeout(() => {
      onClose()
    }, 2400) // 留一点时间给动画执行完

    return () => {
      clearTimeout(timer)
      clearTimeout(closeTimer)
    }
  }, [onClose])

  return (
    <Alert
      variant={type === 'error' ? 'destructive' : 'default'}
      className={`
        fixed top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto z-50 transition-all duration-500 ease-out shadow-xs
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
        ${type === 'error' ? 'border-red-500 text-red-600 shadow-red-500 bg-red-50' : 'border-green-500 text-green-600 shadow-green-500 bg-green-50'}
      `}>
      {type === 'error' ? <CircleX className='h-4 w-4' /> : <CircleCheck className='h-4 w-4' />}
      <AlertTitle>{title || '提示'}</AlertTitle>
      <AlertDescription>{message || '未知提示，请联系管理员'}</AlertDescription>
    </Alert>
  )
}

export default CenteredAlert
