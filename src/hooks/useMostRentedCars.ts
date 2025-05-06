import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";
import { Car } from "@/types/apitypes";

export function useMostRentedCars() {
  return useQuery<Car[]>({
    queryKey: ['most-rented-cars'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/cars/most-rented');
      console.log('Most rented cars:', response.data);
      return response.data;
    },
    staleTime: 7000,
  })
}


