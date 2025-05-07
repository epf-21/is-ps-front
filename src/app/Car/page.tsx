'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/api/axios';
import { toast } from 'sonner';

export default function Page() {
  const [form, setForm] = useState({
    anio: 2010,
    marca: '',
    modelo: '',
    precio: 0,
    disponible_desde: '',
    disponible_hasta: '',
    latitud: 0,
    longitud: 0,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        ...form,
        disponible_desde: new Date(form.disponible_desde).toISOString(),
        disponible_hasta: new Date(form.disponible_hasta).toISOString(),
      };
      const res = await axiosInstance.post('/api/cars/new-Car', payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Coche añadido correctamente');
      setForm({
        anio: 2010,
        marca: '',
        modelo: '',
        precio: 0,
        disponible_desde: '',
        disponible_hasta: '',
        latitud: 0,
        longitud: 0,
      });
    },
    onError: () => toast.error('Error al añadir el coche'),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['anio', 'precio', 'latitud', 'longitud'].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Añadir un coche</h1>
      <p>Los coches estan disponibles desde el 2025-07-14 hasta el 2025-07-28 ese es el filtro si se pone en otro rango de fechas no se mostrar en el mapa el carro añadido</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label>Marca</label>
        <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} className="w-full p-2 border rounded" required />
        <label>Modelo</label>
        <input name="modelo" placeholder="Modelo" value={form.modelo} onChange={handleChange} className="w-full p-2 border rounded" required />
        <label>Año del carro</label>
        <input name="anio" type="number" placeholder="Año" value={form.anio} onChange={handleChange} className="w-full p-2 border rounded" required />
        <label>Precio del carro</label>
        <input name="precio" type="number" placeholder="Precio por día" value={form.precio} onChange={handleChange} className="w-full p-2 border rounded" required />
        <label>Fecha de disponibilidad del carro</label>
        <input name="disponible_desde" type="date" value={form.disponible_desde} onChange={handleChange} className="w-full p-2 border rounded" required />
        <label>Hasta cuando estara disponible</label>
        <input name="disponible_hasta" type="date" value={form.disponible_hasta} onChange={handleChange} className="w-full p-2 border rounded" required />
        <label>Latidud</label>
        <input name="latitud" type="number" step="any" placeholder="Latitud" value={form.latitud} onChange={handleChange} className="w-full p-2 border rounded" required />
        <label>Longitud</label>
        <input name="longitud" type="number" step="any" placeholder="Longitud" value={form.longitud} onChange={handleChange} className="w-full p-2 border rounded" required />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={isPending}
        >
          {isPending ? 'Enviando...' : 'Añadir coche'}
        </button>
      </form>
    </div>
  );
}
