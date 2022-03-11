export class Menu {
  DariMenu = [
    {
      label: "داشبورد",
      faIcon: 'fa fa-dashboard',
      link: '/Dashboard'
    },
    {
      label: "کاربران",
      faIcon: 'fa fa-user',
      items: [
        {label: 'لیست کاربران', link:'/Dashboard/AppUser', faIcon: 'fa fa-list'},
        {label: 'ثبت کاربر', link:'/Dashboard/AppUser/AddAppUser', faIcon: 'fa fa-user-plus'}
      ]
    },
    {
      label: "نقش‌ها",
      faIcon: 'fa fa-lock',
      items: [
        {label: 'لیست نقش‌ها', link:'/Dashboard/Role', faIcon: 'fa fa-list'},
        {label: 'ثبت نقش', link:'/Dashboard/Role/AddRole', faIcon: 'fa fa-plus'}
      ]
    },
    {
      label: "داکترها",
      faIcon: 'fa fa-user-md',
      items: [
        {label: 'لیست داکترها', link:'/Dashboard/Doctor', faIcon: 'fa fa-list'},
        {label: 'ثبت داکتر', link:'/Dashboard/Doctor/AddDoctor', faIcon: 'fa fa-user-plus'}
      ]
    },
    {
      label: "مریض‌ها",
      faIcon: 'fa fa-medkit',
      items: [
        {label: 'لیست مریض‌ها', link:'/Dashboard/Patient', faIcon: 'fa fa-list'},
        {label: 'ثبت مریض‌', link:'/Dashboard/Patient/AddPatient', faIcon: 'fa fa-user-plus'}
      ]
    },
    {
      label: "جلسات",
      faIcon: 'fa fa-stethoscope',
      items: [
        {label: 'لیست جلسات', link:'/Dashboard/Visit', faIcon: 'fa fa-list'},
        {label: 'ثبت جلسه', link:'/Dashboard/Visit/AddVisit', faIcon: 'fa fa-plus'},
        {label: 'وضعیت بلادرنگ جلسات', link:'/Dashboard/Visit/LiveVisit', faIcon: 'fa fa-eye'}
      ]
    },
    {
      label: "کارمندان",
      faIcon: 'fa fa-users',
      items: [
        {label: 'لیست کارمندان', link:'/Dashboard/Employee', faIcon: 'fa fa-list'},
        {label: 'ثبت کارمند', link:'/Dashboard/Employee/AddEmployee', faIcon: 'fa fa-user-plus'}      ]
    },
    {
      label: "مصارف",
      faIcon: 'fa fa-money',
      items: [
        {label: 'لیست مصارف', link:'/Dashboard/Expense', faIcon: 'fa fa-list'},
        {label: 'ثبت مصارف', link:'/Dashboard/Expense/AddExpense', faIcon: 'fa fa-plus'}
      ]
    },
    {
      label: "راپورها",
      faIcon: 'fa fa-pie-chart',
      items: [
        {label: 'مصارف', link:'/Dashboard/Report/Expenses', faIcon: 'fa fa-money'},
        {label: 'جلسات', link:'/Dashboard/Report/Visits', faIcon: 'fa fa-stethoscope'}
      ]
    }
  ];
  EnglishMenu =  [
    {
      label: "Dashboard ",
      faIcon: 'fa fa-dashboard',
      link: '/Dashboard'
    },
    {
      label: "Users",
      faIcon: 'fa fa-user',
      items: [
        {label: 'Users List', link:'/Dashboard/AppUser', faIcon: 'fa fa-list'},
        {label: 'Add User', link:'/Dashboard/AppUser/AddAppUser', faIcon: 'fa fa-user-plus'}
      ]
    },
    {
      label: "Roles",
      faIcon: 'fa fa-lock',
      items: [
        {label: 'Roles List', link:'/Dashboard/Role', faIcon: 'fa fa-list'},
        {label: 'Add Role', link:'/Dashboard/Role/AddRole', faIcon: 'fa fa-plus'}
      ]
    },
    {
      label: "Doctors",
      faIcon: 'fa fa-user-md',
      items: [
        {label: 'Doctors List', link:'/Dashboard/Doctor', faIcon: 'fa fa-list'},
        {label: 'Add Doctor', link:'/Dashboard/Doctor/AddDoctor', faIcon: 'fa fa-user-plus'}
      ]
    },
    {
      label: "Patients",
      faIcon: 'fa fa-medkit',
      items: [
        {label: 'Patients List', link:'/Dashboard/Patient', faIcon: 'fa fa-list'},
        {label: 'Add Patient', link:'/Dashboard/Patient/AddPatient', faIcon: 'fa fa-user-plus'}
      ]
    },
    {
      label: "Visits",
      faIcon: 'fa fa-stethoscope',
      items: [
        {label: 'Visits List', link:'/Dashboard/Visit', faIcon: 'fa fa-list'},
        {label: 'Add Visit', link:'/Dashboard/Visit/AddVisit', faIcon: 'fa fa-plus'},
        {label: 'Live Visit Board', link:'/Dashboard/Visit/LiveVisit', faIcon: 'fa fa-eye'}
      ]
    },
    {
      label: "Employees",
      faIcon: 'fa fa-users',
      items: [
        {label: 'Employees List', link:'/Dashboard/Employee', faIcon: 'fa fa-list'},
        {label: 'Add Employee', link:'/Dashboard/Employee/AddEmployee', faIcon: 'fa fa-user-plus'}      ]
    },
    {
      label: "Expenses",
      faIcon: 'fa fa-money',
      items: [
        {label: 'Expenses List', link:'/Dashboard/Expense', faIcon: 'fa fa-list'},
        {label: 'Add Expense', link:'/Dashboard/Expense/AddExpense', faIcon: 'fa fa-plus'}
      ]
    },
    {
      label: "Reports",
      faIcon: 'fa fa-pie-chart',
      items: [
        {label: 'Expenses', link:'/Dashboard/Report/Expenses', faIcon: 'fa fa-money'},
        {label: 'Visits', link:'/Dashboard/Report/Visits', faIcon: 'fa fa-stethoscope'}
      ]
    }
  ];
}
