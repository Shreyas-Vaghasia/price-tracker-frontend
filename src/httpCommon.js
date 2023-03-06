import Axios from 'axios';

const axiosBaseURL = Axios.create({
    baseURL: 'http://pricetrackerappakshar-env.eba-6pkfk34n.ap-south-1.elasticbeanstalk.com/'
});

export default axiosBaseURL