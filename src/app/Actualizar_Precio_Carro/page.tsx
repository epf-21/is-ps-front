'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '@/api/axios';

export default function Page() {
  const [price, setPrice] = useState(80)

  const mutation = useMutation({
    mutationFn: (newPrice: number) =>
      axiosInstance.patch('/api/cars/update-price/2', { price: newPrice }),
    onSuccess: () => {
      alert('Precio actualizado correctamente')
    },
    onError: (error) => {
      alert('Error al actualizar precio')
      console.error("Da este errro:", error)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(price)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <label className="block">
        Nuevo precio:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border rounded p-2 ml-2"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={mutation.isPending}
      >
        {mutation.isPending ? 'Actualizando...' : 'Actualizar precio'}
      </button>
    </form>
  )
}
