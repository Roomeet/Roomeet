import Swal from 'sweetalert2';

type Icon = 'error' | 'success' | 'warning' | 'info' | 'question' | undefined;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const makeToast = (type: Icon, msg: string) => {
  Toast.fire({
    icon: type,
    title: msg,
  });
};

export default makeToast;
