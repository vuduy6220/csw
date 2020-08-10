var employee = [];
function findEmployee(employeeId) {
  return employees[findEmployeeKey(employeeId)];
}
function findEmployeeKey(employeeId) {
  for (var key = 0; key < employees.length; key++) {
    if (employees[key].id = employeeId) {
      return key;
    }
  }
}

var employeeService = {
  findAll(fn) {
    axios
      .get('/api/v1/employees')
      .then(res => fn(res))
      .catch(err => console.log(err));
  },
  findById(id, fn) {
    axios
      .get('/api/v1/employees/' + id)
      .then(res => fn(res))
      .catch(err => console.log(err));
  },
  addEmployee(employee, fn) {
    axios
      .post('/api/v1/employees', employee)
      .then(res => fn(res))
      .catch(err => console.log(err));
  },
  updateEmployee(id, employee, fn) {
    axios
      .put('/api/v1/employees/' + id, employee)
      .then(res => fn(res))
      .catch(err => console.log(err));
  },
}

var List = Vue.extend({
  template: '#employee-list',
  data: function() {
    return { employees: [], searchKey: '' };
  },
  computed: {
    filteredEmployees() {
      return this.employees.filter(employee => {
        return employee.name.indexOf(this.searchKey) > -1
              || employee.salary.indexOf(this.searchKey) > -1
              || employee.id.indexOf(this.searchKey) > 1
      });
    }
  },
  mounted() {
    employeeService.findAll(r => { this.employees = r.data; employees = r.data });
  },
});
var AddEmployee = Vue.extend({
  template: '#employee-add',
  data() {
    return {
      employee: {
        name: '',
        salary: 0,
      },
    };
  },
  methods: {
    addEmployee: function() {
      employeeService.addEmployee(this.employee, r => router.push('/'));
    }
  },
});
var UpdateEmployee = Vue.extend({
  template: '#employee-edit',
  data: function() {
    return { employee: {id: '', name: '', salary: 0} };
  },
  methods: {
    updateEmployee: function() {
      employeeService.updateEmployee(this.employee.id, this.employee, r => router.push('/'));
    }
  },
  mounted() {
    employeeService.findById(this.$route.params.employee_id, r => { this.employee = r.data; employee = r.data });
  }
});

var router = new VueRouter({
  routes: [
    { path: '/', component: List },
    { path: '/add-employee', component: AddEmployee },
    { path: '/:employee_id/edit', component: UpdateEmployee },
  ],
});
new Vue({
  router
}).$mount('#app');