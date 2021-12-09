import api from '../config/api'

export const getCars = async () => {
    return await api.get('api/CarEntities');
}

export const postCars = async (data) => { 
    return await api.post('api/CarEntities', data)
}

export const deleteCar = async (id) => {
    return await api.delete(`api/CarEntities/${id}`);
}
