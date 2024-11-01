import axios from 'axios';

const API_KEY=import.meta.env.VITE_STRAPI_API_KEY

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api/',
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
})

const createNewResume = async (data) => {
    try {
        const response = await axiosClient.post('/user-resumes', data);
        console.log('Response:', response);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
};

const getUserResumes =(userEmail) =>axiosClient.get('/user-resumes/' + userEmail)

const updateResumeDetail =(id, data) =>{
    console.log("id data in globalAPI", data)
    return axiosClient.put('/user-resumes/' + id, data)
}

const addSkills = (id, data)=>{
    return axiosClient.post('/skills/' + id, data)
}

const getResumeData = (userid) =>axiosClient.get('/resume/data/' + userid)

const updateExperience = async(id, data)=>{
    console.log("id data in line 35", id, data)
    try{
        const res = await axiosClient.post('/experiences/' + id, data)
    }catch(error){
        console.error('Error line 39:', error.response || error.message);
    }
}

const addEducation = async(id, data)=>{
    console.log("id, data in line 39 global API", id, data)
    try{
        const res = await axiosClient.put('/education/' + id, data)
        console.log("res in globalAPI line 42", res)
    }catch(error){

    }
}


export default {
    createNewResume, 
    getUserResumes, 
    updateResumeDetail,
    updateExperience,
    addEducation,
    getResumeData,
    addSkills
}