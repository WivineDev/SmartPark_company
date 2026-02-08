import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Point to backend
    withCredentials: true, // Send cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to handle response data
const handleResponse = (response) => {
    if (response.data.success) {
        return response.data.data || response.data; // Return data payload or full response if no data field
    }
    throw new Error(response.data.message || 'API Error');
};

// Add interceptor for 401 Unauthorized
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const api = {
    // Auth
    login: async (username, password) => {
        try {
            const response = await apiClient.post('/auth/login', { username, password });
            return response.data.data; // Expected { userId, username }
        } catch (error) {
            console.error("Login failed:", error);
            throw error; // Let the component handle the error
        }
    },

    logout: async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    },

    checkAuth: async () => {
        try {
            const response = await apiClient.get('/auth/check');
            return response.data.data;
        } catch (error) {
            return null; // Not authenticated
        }
    },

    // Employees
    getEmployees: async () => {
        const response = await apiClient.get('/employees');
        return response.data.data || [];
    },

    addEmployee: async (employee) => {
        const response = await apiClient.post('/employees', employee);
        return response.data.data || employee;
    },

    updateEmployee: async (id, employee) => {
        const response = await apiClient.put(`/employees/${id}`, employee);
        return response.data.data || employee;
    },

    deleteEmployee: async (id) => {
        const response = await apiClient.delete(`/employees/${id}`);
        return response.data;
    },

    // Departments
    getDepartments: async () => {
        const response = await apiClient.get('/departments');
        return response.data.data || [];
    },

    addDepartment: async (department) => {
        const response = await apiClient.post('/departments', department);
        return response.data.data || department;
    },

    updateDepartment: async (code, department) => {
        const response = await apiClient.put(`/departments/${code}`, department);
        return response.data.data || department;
    },

    deleteDepartment: async (code) => {
        const response = await apiClient.delete(`/departments/${code}`);
        return response.data;
    },

    // Salaries
    getSalaries: async () => {
        const response = await apiClient.get('/salaries');
        return response.data.data || [];
    },

    addSalary: async (salary) => {
        const response = await apiClient.post('/salaries', salary);
        return response.data.data || salary;
    },

    updateSalary: async (updatedSalary) => {
        const response = await apiClient.put(`/salaries/${updatedSalary.id}`, updatedSalary);
        return response.data.data || updatedSalary;
    },

    deleteSalary: async (id) => {
        const response = await apiClient.delete(`/salaries/${id}`);
        return response.data;
    }
};
