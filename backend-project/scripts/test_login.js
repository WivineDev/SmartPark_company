
const axios = require('axios');

const testLogin = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            username: 'admin',
            password: 'password123'
        });
        console.log('Login successful:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Login failed:', error.response.data);
        } else {
            console.error('Login error:', error.message);
        }
    }
};

testLogin();
