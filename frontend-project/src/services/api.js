import axios from 'axios';

// Mock data initialization
const INITIAL_EMPLOYEES = [
    { id: 1, firstName: 'John', lastName: 'Doe', position: 'Software Engineer', department: 'IT', salary: 5000 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', position: 'HR Manager', department: 'HR', salary: 4500 },
];

const INITIAL_DEPARTMENTS = [
    { code: 'IT', name: 'Information Technology' },
    { code: 'HR', name: 'Human Resources' },
];

const INITIAL_SALARIES = [
    { id: 1, employeeId: 1, month: '2023-10', gross: 5500, deduction: 500, net: 5000 },
];

// load from local storage or use initial data
const loadData = (key, initial) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : initial;
};

const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Mock API functions
export const api = {
    login: async (username, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username && password) {
                    resolve({ token: 'mock-token', user: { username } });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 500);
        });
    },

    getEmployees: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(loadData('employees', INITIAL_EMPLOYEES));
            }, 300);
        });
    },

    addEmployee: async (employee) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const employees = loadData('employees', INITIAL_EMPLOYEES);
                const newEmployee = { ...employee, id: Date.now() };
                employees.push(newEmployee);
                saveData('employees', employees);
                resolve(newEmployee);
            }, 300);
        });
    },

    getDepartments: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(loadData('departments', INITIAL_DEPARTMENTS));
            }, 300);
        });
    },

    addDepartment: async (department) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const departments = loadData('departments', INITIAL_DEPARTMENTS);
                departments.push(department);
                saveData('departments', departments);
                resolve(department);
            }, 300);
        });
    },

    getSalaries: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(loadData('salaries', INITIAL_SALARIES));
            }, 300);
        });
    },

    addSalary: async (salary) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const salaries = loadData('salaries', INITIAL_SALARIES);
                const newSalary = { ...salary, id: Date.now() };
                salaries.push(newSalary);
                saveData('salaries', salaries);
                resolve(newSalary);
            }, 300);
        });
    },

    updateSalary: async (updatedSalary) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let salaries = loadData('salaries', INITIAL_SALARIES);
                salaries = salaries.map(s => s.id === updatedSalary.id ? updatedSalary : s);
                saveData('salaries', salaries);
                resolve(updatedSalary);
            }, 300);
        });
    },

    deleteSalary: async (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                let salaries = loadData('salaries', INITIAL_SALARIES);
                salaries = salaries.filter(s => s.id !== id);
                saveData('salaries', salaries);
                resolve({ success: true });
            }, 300);
        });
    }
};
