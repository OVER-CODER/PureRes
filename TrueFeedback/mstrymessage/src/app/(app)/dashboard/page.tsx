import { useToast } from '@/components/ui/use-toast'
import { Message } from '@/model/user.model'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React, { useCallback } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
const dashboard = () => {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const {toast} = useToast()

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id ! == messageId))
  }

  const {data: session} = useSession()

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })

  const{
    register,
    watch,
    setValue
  } = form;
  const acceptMessages = watch('acceptMessages')
  const fetcAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      
    } catch (error) {
      
    }
  },[setValue])


  return (
    <div>dashboard</div>
  )
}

export default dashboard