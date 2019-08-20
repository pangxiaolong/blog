'use strict';
module.exports = {
  formatDate(str) {
    const a = new Date(str);
    const t1 = a.getFullYear();
    const t2 = a.getMonth() + 1;
    const t3 = a.getDate();
    return t1 + '-' + t2 + '-' + t3;
  },
};
