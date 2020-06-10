
// import * as authKey from './authKey';

const modules = [
  {
    name: 'CNPROJECTNAME',
    path: '/stock',
    module: 'stock',
  },
];

const projectMenus = [
  {
    title: 'CNPROJECTNAME',
    icon: 'ios-briefcase',
    name: 'stockManagement',
    // authorite: 'stock',
    // submenu: [{
    //   title: 'CNPROJECTNAME',
    //   name: 'stock',
    //   link: '/list',
    //   authorite: 'view',
    //   view: authKey.STOCKLIST_VIEW,
    // }],
  },
];

export {
  modules,
  projectMenus,
};
