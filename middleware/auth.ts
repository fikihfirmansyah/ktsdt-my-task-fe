export default function authMiddleware({ store, redirect }: any) {
  if (process.client) {
    const token = localStorage.getItem('token');

    if (!token) {
      return navigateTo('/login');
    } 
  }
}


// const auth = {
//   isLoggedIn() {
//       // Get from local storage
//       return !!localStorage.getItem('token');
//   }
// };

// export default defineNuxtRouteMiddleware((to, from) => {
//   if (!auth.isLoggedIn()) {
//     return navigateTo('/login');
//   }
// });