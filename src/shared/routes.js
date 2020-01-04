export const LANDING = '/';
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const SIGN_OUT = '/signout';
export const HOME = '/';
export const ACCOUNT = '/account';
export const ADMIN = '/admin';
export const ADMIN_USER_DETAILS = '/admin/userdetails';
export const ADMIN_CREATE_USER = '/admin/create-user';
export const PASSWORD_FORGET = '/pw-forget';

export const SHOW_DETAILS = '/show/details';
export const BLOCK_DETAILS = '/block/details';
export const PART_DETAILS = '/part/details';
export const SCENE_DETAILS = '/scene/details';

export const MONITOR = '/monitor';
export const SHOWS = '/shows';
export const MOBILE = '/mobile';

export const TEST = '/test';

export const pageTitle = (route) => {
  switch (route) {
      case LANDING: return 'Schedule';
      case SIGN_UP: return 'Sign Up';
      case SIGN_OUT: return 'Logged Out';
      case HOME: return 'Home';
      case ACCOUNT: return 'My Account';
      case ADMIN: return 'Admin';
      case ADMIN_USER_DETAILS: return 'User Details (admin)';
      case ADMIN_CREATE_USER: return 'Create new User (admin)';
      case PASSWORD_FORGET: return 'Forgot Password';
      case SHOW_DETAILS: return 'Show Details';
      case BLOCK_DETAILS: return 'Block Details';
      case PART_DETAILS: return 'Part Details';
      case SCENE_DETAILS: return 'Scene Details';
      case MONITOR: return 'Monitor';
      case SHOWS: return 'Shows';
      case MOBILE: return 'Mobile view';
      case TEST: return 'Test';
      default: return 'home'
  }
};
