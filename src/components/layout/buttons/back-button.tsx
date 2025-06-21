
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function BackButton() {
  return (
    <Link href="/" className=''>
      <Button variant="ghost">
        <ArrowLeftIcon />
        <span>Voltar ao Catálogo</span>
      </Button>
    </Link>
  )
}
