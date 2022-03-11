import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'Translate',
  pure: false,
})
export class Translate implements PipeTransform {
  dic: Map<string, string> = new Map();
  constructor() {
    this.setTranslations();
  }
  transform(value: unknown, ...args: unknown[]): unknown {
    let lang = localStorage.getItem('lang') === 'en';
    return lang ? value : this.dic.get(value + '');
  }
  private setTranslations() {
    this.dic.set('Dashboard', 'داشبورد');
    this.dic.set('User Management', 'مدیریت کاربران');
    this.dic.set('Username', 'نام کاربری');
    this.dic.set('Password', 'رمز عبور');
    this.dic.set('User Type', 'نوعیت کاربر');
    this.dic.set('Is Locked', 'آیا قفل است؟');
    this.dic.set('Roles', 'نقش‌ها');
    this.dic.set('Employee', 'کارمند');
    this.dic.set('Doctor', 'داکتر');
    this.dic.set('Save', 'ثبت کردن');
    this.dic.set('Cancel', 'انصراف');
    this.dic.set('Role Management', 'مدیریت نقش‌ها');
    this.dic.set('Role Name', 'نام نقش');
    this.dic.set('All', 'همه');
    this.dic.set('Add', 'اضافه کردن');
    this.dic.set('Edit', 'تغییر دادن');
    this.dic.set('Get', 'دیدن');
    this.dic.set('Delete', 'حذف کردن');
    this.dic.set('Doctors', 'داکترها');
    this.dic.set('Employees', 'کارمندان');
    this.dic.set('Visits', 'جلسات');
    this.dic.set('Roles', 'نقش‌ها');
    this.dic.set('Expenses', 'مصارف');
    this.dic.set('Patients', 'مریض‌ها');
    this.dic.set('Users', 'کاربران');
    this.dic.set('Doctor Management', 'مدیریت داکتران');
    this.dic.set('Firstname', 'نام');
    this.dic.set('Lastname', 'تخلص');
    this.dic.set('Male', 'زن');
    this.dic.set('Female', 'مرد');
    this.dic.set('Date of Birth', 'تاریخ تولد');
    this.dic.set('Mobile', 'موبایل');
    this.dic.set('Email', 'ایمیل');
    this.dic.set('Address', 'آدرس');
    this.dic.set('Patient Management', 'مدیریت مریض‌ها');
    this.dic.set('Age', 'سن');
    this.dic.set('Doctor Name', 'نام داکتر');
    this.dic.set('Patient Name', 'نام مریض');
    this.dic.set('Patient Mobile', 'شماره تماس مریض');
    this.dic.set('Room', 'اطاق');
    this.dic.set('Patient', 'مریض');
    this.dic.set('Pre-operation Fee', 'پیش پرداخت');
    this.dic.set('Post-operation Fee', 'پرداخت');
    this.dic.set('Schedule Date', 'تاریخ تعین شده');
    this.dic.set('Done Date', 'تاریخ انجام شده');
    this.dic.set('Operation Type', 'نوع جلسه');
    this.dic.set('Priority Level', 'اولویت');
    this.dic.set('Description', 'توضیحات');
    this.dic.set('Visit Management', 'مدیریت جلسات');
    this.dic.set('TakeOut', 'کشیدن');
    this.dic.set('Fill', 'پرکردن');
    this.dic.set('Orthodontics', 'ارتودنسی');
    this.dic.set('Cleaning', 'پاک‌ کاری');
    this.dic.set('Cover', 'لایه گیری');
    this.dic.set('None', 'هیچ');
    this.dic.set('Low', 'کم');
    this.dic.set('Medium', 'متوسط');
    this.dic.set('High', 'بالا');
    this.dic.set('Employee Management', 'مدیریت کارمندان');
    this.dic.set('Urgent', 'عاجل');
    this.dic.set('Item Name', 'اسم جنس');
    this.dic.set('Expense Management', 'مدیریت مصارف');
    this.dic.set('Start Date', 'تاریخ شروع');
    this.dic.set('End Date', 'تاریخ ختم');
    this.dic.set('Count', 'تعداد');
    this.dic.set('Price Per Item', 'قیمت فی دانه');
    this.dic.set('Date', 'تاریخ');
    this.dic.set('Cannot Access Requested Page', 'به صفحه مورد نظر دسترسی ندارید');
    this.dic.set('Login Page', 'ورود به سیستم');
    this.dic.set('Login', 'ورود');
    this.dic.set('Logout', 'خروج');
    this.dic.set('Dashboard', 'داشبورد');
    this.dic.set('Dental Clinic', 'کلینیک دندان');
    this.dic.set('Profile', 'پروفایل');
    this.dic.set('English', 'انگلیسی');
    this.dic.set('Dari', 'دری');
    this.dic.set('Reports', 'راپورها');
    this.dic.set('Live', 'زنده');
    this.dic.set('Photo', 'عکس');
  }
}
