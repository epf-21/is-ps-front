"use client";
import {
  Card,
  CardContent,  
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
export default function Page() {
  const router = useRouter();
  return (
    <div className="flex h-screen bg-gray-200">
      <Card className="w-md m-auto gap-4">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Error.. Vehículo No Disponible</CardTitle>          
        </CardHeader>
        <CardContent className="px-4 text-center">
          <svg className="w-20 h-20 text-red-600 my-2 mx-auto" fill="none" stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <p className="text-xl font-normal text-gray-600 mb-4">Ups... lo sentimos, el automóvil que ha solicitado ya ha sido reservado/tomado.</p>
          <hr />
        </CardContent>
        <CardFooter  className="flex justify-end mt-1">
            <Button className="me-2" variant="outline" onClick={() => router.back()}>Volver Atrás</Button>
            <Button variant="default" onClick={() => router.push('/homeBuscador_Recode')}>
              Elegir otro auto
            </Button>          
        </CardFooter>
      </Card>      
    </div>
  );
}