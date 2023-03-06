import Axios from 'axios';

//http://localhost:5000/ - for local testing
///http://pricetrackerappakshar-env.eba-6pkfk34n.ap-south-1.elasticbeanstalk.com - for production
const axiosBaseURL = Axios.create({
    baseURL: 'http://pricetrackerappakshar-env.eba-6pkfk34n.ap-south-1.elasticbeanstalk.com/'
});

export default axiosBaseURL